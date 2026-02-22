
import express from 'express';
import connection from './connectionBBDD.js';

const routerRequest = express.Router();


routerRequest.get('/category', async (req,res) => {
   
   const query = `SELECT DISTINCT category FROM users_pista;`;
   const data = await connection.query(query)

   //console.log(data.rows)
   res.send(data.rows)
})

routerRequest.get('/users_pista', async (req,res) => {
   
   try{
      const query = `SELECT * FROM users_pista;`;
      const data = await connection.query(query)
      res.send(data.rows)
   }catch(err){
      console.error(err)
   }
})

routerRequest.get('/tires_registry', async (req, res) => {
  try {
    const { id_Pilot, id_Event, tire_param } = req.query;

    let query = `SELECT
      t.id,
      u.name AS pilot_name,
      u.surname,
      u.category,
      c.name_circuits,
      c.event,
      t.event_date,
      t.tire_n1,
      t.tire_n2,
      t.tire_n3,
      t.tire_n4,
      t.tire_n5,
      t.tire_n6
    FROM tires_registry t
    JOIN users_pista u
      ON u.id = t.id_pilot
    JOIN circuits_calendar c
      ON c.id_event = t.id_event
    `;

    const params = [];
    const hasTireParam =
      tire_param !== undefined &&
      tire_param !== null &&
      String(tire_param).trim() !== "";

    const hasIdPilot =
      id_Pilot !== undefined &&
      id_Pilot !== null &&
      String(id_Pilot).trim() !== "";

    const hasIdEvent =
      id_Event !== undefined &&
      id_Event !== null &&
      String(id_Event).trim() !== "";

    if (hasTireParam) {
      // 1) tire_param tiene prioridad y anula los demás
      query += `
        WHERE $1::int IN (t.tire_n1, t.tire_n2, t.tire_n3, t.tire_n4, t.tire_n5, t.tire_n6)
      `;
      params.push(Number(tire_param));
    } else if (hasIdPilot && hasIdEvent) {
      // 2) id_Pilot + id_Event
      query += ` WHERE t.id_pilot = $1 AND t.id_event = $2`;
      params.push(Number(id_Pilot), Number(id_Event));
    } else if (hasIdPilot) {
      // 3) solo id_Pilot
      query += ` WHERE t.id_pilot = $1`;
      params.push(Number(id_Pilot));
    } else if (hasIdEvent) {
      // 4) solo id_Event
      query += ` WHERE t.id_event = $1`;
      params.push(Number(id_Event));
    }

    const data = await connection.query(query, params);
    res.send(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

routerRequest.get('/number_pilot', async (req,res) => {
   console.log('/number_pilot  --> selected endpoint')

   const { category } = req.query;

   try{

      const query = `SELECT number_pilot FROM users_pista WHERE category = $1;`
      const data = await connection.query(query,[category]);

      res.send(data.rows)
   }catch(err){
      console.error(err);
   }
})

routerRequest.get('/view_num_pilots', async (req, res) => {

  console.log('/view_num_pilots  --> selected endpoint')

  try {
    const { category } = req.query;

    let query = 'SELECT * FROM users_pista';
    const params = [];

    if (category && category.trim() !== '') {
      query += ' WHERE category = $1';
      params.push(category.trim());
    }

    const data = await connection.query(query, params);
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

routerRequest.get('/info_pilot', async (req,res) => {

  console.log('/info_pilot  --> selected endpoint')

   const { category, num_pilot } = req.query;

//   res.status(200).send({ ok: 'ok'})

   if(!category || !num_pilot){
      return res.status(400).json({ error:'Categoria y numero son requridos'});
   }

   const numPilotInt = Number(num_pilot);
   if(Number.isNaN(numPilotInt)){
      return res.status(400).json({ error: 'num_pilot debe ser numerico'})
   }
   try{
      //console.log(typeof(numPilotInt),numPilotInt)
      //console.log(typeof(category),category)
      const query = `SELECT * FROM users_pista 
      WHERE category = $1 
      AND id = $2;`;
      const data = await connection.query(query,[category,numPilotInt]);
      
      res.send(data.rows);
   }catch(err){
      console.error(err);
   }
})

routerRequest.get('/circuits_calendar', async (req,res) => {

   try{
      const query = `SELECT * FROM circuits_calendar;`
      const data = await connection.query(query);
      res.send(data.rows);
   }catch(err){
      console.error(err);
   }

})

routerRequest.get('/view_pilots', async (req, res) => {

  console.log('/view_pilots  --> selected endpoint')

  try {
    const { category, id_pilot, name, surname } = req.query;

    let query = 'SELECT * FROM users_pista';
    const conditions = [];
    const params = [];
    let idx = 1;

    // Category
    if (category && category.trim() !== '') {
      conditions.push(`category = $${idx++}`);
      params.push(category.trim());
    }

    // Pilot ID (desde SelectPilots)
    if (id_pilot && String(id_pilot).trim() !== '') {
      conditions.push(`id = $${idx++}`);
      params.push(Number(id_pilot));
    }

    // Name (búsqueda parcial, case insensitive)
    // Free text search (name + surname)
    if (name && name.trim() !== '') {
    
      const words = name.trim().split(/\s+/);
    
      words.forEach(word => {
        conditions.push(`(name ILIKE $${idx} OR surname ILIKE $${idx})`);
        params.push(`%${word}%`);
        idx++;
      });
    }
    

    // Si hay filtros, agregamos WHERE
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    console.log(query)

    const data = await connection.query(query, params);
    res.json(data.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




// LOCK de módulo: serializa este endpoint (seguro si usás un único Client conectado)
let addRegisterLock = Promise.resolve();

routerRequest.post('/add_register_tire', async (req, res) => {
  addRegisterLock = addRegisterLock.then(async () => {
    const { id_pilot, id_event, dateInp, N1_tire, N2_tire, N3_tire, N4_tire, N5_tire, N6_tire } = req.body;

    const idPilot = Number(id_pilot);
    const idEvent = Number(id_event);

    const tiresArr = [N1_tire, N2_tire, N3_tire, N4_tire, N5_tire, N6_tire].map(Number);

    // Validación numérica
    if ([idPilot, idEvent, ...tiresArr].some(Number.isNaN) || !dateInp) {
      res.status(400).json({ error: 'Datos inválidos (numéricos o dateInp faltante)' });
      return;
    }

    // Validación: no repetidas dentro del mismo registro
    if (new Set(tiresArr).size !== tiresArr.length) {
      res.status(400).json({ error: 'No se pueden repetir cubiertas en el mismo registro' });
      return;
    }

    let registryId;

    try {
      await connection.query('BEGIN');

      // Insert principal
      const insertRegistry = await connection.query(
        `
        INSERT INTO tires_registry
        (id_pilot, id_event, event_date, tire_n1, tire_n2, tire_n3, tire_n4, tire_n5, tire_n6)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id
        `,
        [idPilot, idEvent, dateInp, ...tiresArr]
      );

      registryId = insertRegistry.rows[0].id;

      // Insert cubiertas globales (tabla nueva)
      await connection.query(
        `
        INSERT INTO tires_used (tire_number, registry_id, position)
        VALUES
          ($1,$7,'N1'),
          ($2,$7,'N2'),
          ($3,$7,'N3'),
          ($4,$7,'N4'),
          ($5,$7,'N5'),
          ($6,$7,'N6')
        `,
        [tiresArr[0], tiresArr[1], tiresArr[2], tiresArr[3], tiresArr[4], tiresArr[5], registryId]
      );

      await connection.query('COMMIT');
      res.status(201).json({ ok: true, registry_id: registryId });
    } catch (err) {
      try { await connection.query('ROLLBACK'); } catch (_) {}

      if (err.code === '23505') {
      
        // Piloto ya tiene registro ese día
        if (err.constraint === 'tires_registry_unique_pilot_day') {
          return res.status(409).json({
            error: 'Conflicto: el piloto ya tiene un registro para ese día'
          });
        }
      
        // Cubierta ya usada → identificar cuál/es
        if (err.constraint === 'tires_used_pkey') {
        
          const { rows } = await connection.query(
            `
            SELECT tire_number
            FROM tires_used
            WHERE tire_number = ANY($1::int[])
            `,
            [tiresArr]
          );
        
          const usedSet = new Set(rows.map(r => r.tire_number));
        
          const used = ['N1','N2','N3','N4','N5','N6']
            .map((pos, i) =>
              usedSet.has(tiresArr[i])
                ? { position: pos, tire: tiresArr[i] }
                : null
            )
            .filter(Boolean);
          
          return res.status(409).json({
            error: 'Conflicto: una o más cubiertas ya fueron usadas',
            err_code: '#23505',
            err_num: '81001',
            used
          });
        }
      
        return res.status(409).json({ 
          error: 'Conflicto: Duplicado - piloto con registro cargado para esta fecha',
          err_code: '#23505',
          err_num: '90091'
        });
      }
    
      console.error(err);
      return res.status(500).json({ error: 'Error insertando registro' });
    }

  });

  // Importante: evitar "UnhandledPromiseRejection" si algo raro pasa fuera
  addRegisterLock.catch(() => {});
});

routerRequest.post("/add_new_pilot", async (req, res) => {
  try {
    const { name, surname, car_model, category, number_pilot } = req.body;

    const numberPilot = Number(number_pilot);

    if (!name?.trim() || !surname?.trim() || !car_model?.trim() || !category?.trim() || Number.isNaN(numberPilot)) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    const query = `
      INSERT INTO users_pista (name, surname, car_model, category, number_pilot)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [name.trim(), surname.trim(), car_model.trim(), category.trim(), numberPilot];

    const data = await connection.query(query, values);

    return res.status(201).json('Cargado con exito');
    //return res.status(201).json(data.rows[0]);
    //return res.status(201);
    //return res.json(data);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Ya existe un piloto con ese número en esa categoría",
      });
    }

    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});



// DELETE REGISTRY
routerRequest.delete('/delete_register_tire', async (req, res) => {
  const { registry_ids } = req.body;
  console.log(registry_ids)

  if (!Array.isArray(registry_ids) || registry_ids.length === 0) {
    res.status(400).json({ error: 'registry_ids inválido' });
    return;
  }

  const ids = registry_ids.map(Number);
  if (ids.some(Number.isNaN)) {
    res.status(400).json({ error: 'IDs inválidos' });
    return;
  }

  try {
    await connection.query('BEGIN');

    // borrar dependientes
    await connection.query(
      `DELETE FROM tires_used WHERE registry_id = ANY($1)`,
      [ids]
    );

    // borrar principales
    const result = await connection.query(
      `DELETE FROM tires_registry WHERE id = ANY($1)`,
      [ids]
    );

    await connection.query('COMMIT');

    res.json({ ok: true, deleted: result.rowCount });
  } catch (err) {
    try { await connection.query('ROLLBACK'); } catch (_) {}
    console.error(err);
    res.status(500).json({ error: 'Error eliminando registros' });
  }
});

routerRequest.delete("/delete_pilot", async (req, res) => {
  try {
    const { id } = req.body;

    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const query = `
      DELETE FROM users_pista
      WHERE id = $1
      RETURNING *;
    `;

    const data = await connection.query(query, [idNum]);

    if (data.rowCount === 0) {
      return res.status(404).json({ error: "Piloto no encontrado" });
    }

    return res.status(200).json("Piloto eliminado correctamente");

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default routerRequest;






