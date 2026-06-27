

import express from "express";
import connection from "./connectionBBDD.js";
import { DateTime } from 'luxon';
import { authMiddleware } from '../Middleware/auth-middleware.js';
import { roleCheck } from '../middleware/roleCheck.js';


const requestRouterCbaPista = express.Router();



requestRouterCbaPista.get('/get_user_active', authMiddleware, async (req, res) => {

  const userId = req.usuario.id;

  try {
    const query = `
      SELECT id_admin, first_name, second_name, user_rol, email, users_name
      FROM users_admin
      WHERE id_admin = $1;
    `;
    const { rows } = await connection.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(rows[0]);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener el usuario' });
  }

});

requestRouterCbaPista.get('/get_category', async (req,res) => {
   
  //  const query =  `
  //        SELECT DISTINCT ct.category_name AS category
  //        FROM users_pista up
  //        JOIN category_table ct ON up.id_category = ct.id_category
  //        ORDER BY ct.category_name;
  //     `;;
    try{
      const query = `SELECT * FROM category_table;`
      const data = await connection.query(query)

      //console.log(data.rows)
      res.send(data.rows)
    }catch(err){
      console.log(err)
    }
})

requestRouterCbaPista.get('/users_pista', async (req,res) => {
   
   try{
      const query = `SELECT * FROM users_pista;`;
      const data = await connection.query(query)
      res.send(data.rows)
   }catch(err){
      console.error(err)
   }
})


requestRouterCbaPista.get('/tires_registry', async (req, res) => {
  try {
    const { id_Pilot, id_Event, tire_param } = req.query;

    let query = `SELECT
      t.id,
      u.name AS pilot_name,
      u.surname,
      ct.category_name AS category,  -- 👈 Trae el nombre desde category_table
      ct.rim_size,
      u.number_pilot,
      c.name_circuits,
      t.created_by as idAuditor,
      CONCAT(ua.first_name, ' ', ua.second_name) AS auditor_name,
      c.event,
      t.event_date,
      t.tire_n1,
      t.tire_n2,
      t.tire_n3,
      t.tire_n4,
      t.tire_n5,
      t.tire_n6
      FROM tires_registry t
      JOIN users_pista u ON u.id = t.id_pilot
      JOIN users_admin ua ON ua.id_admin = t.created_by
      JOIN category_table ct ON ct.id_category = u.id_category  -- 👈 JOIN con category_table
      JOIN circuits_calendar c ON c.id_event = t.id_event
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

    console.log(query)
    console.log(params)

    const data = await connection.query(query, params);
    res.send(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

requestRouterCbaPista.get('/run_status', async (req, res) => {

    try{
      const query = `SELECT * 
        FROM circuits_calendar 
        WHERE id_event IN (
            SELECT id_event 
            FROM race_status 
            WHERE is_locked = false
        );`;
      const data = await connection.query(query);
      res.send(data.rows);
    }catch(err){
      console.error(err);
    }

})

requestRouterCbaPista.get('/number_pilot', async (req,res) => {
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

requestRouterCbaPista.get('/view_num_pilots', async (req, res) => {

  const { category } = req.query;
  console.log('/view_num_pilots  --> selected endpoint',category)

  try {
    const { category } = req.query;

  console.log('/view_num_pilots  --> ','value:',category)


    let query = 'SELECT * FROM users_pista';
    const params = [];

    if (category && category.trim() !== '') {
      query += ' WHERE id_category = $1';
      params.push(category.trim());
    }

    const data = await connection.query(query, params);
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

requestRouterCbaPista.get('/info_pilot', async (req, res) => {
  
  const { category, num_pilot } = req.query;
  
  console.log('/info_pilot  --> selected endpoint',category,num_pilot);

   if (!category || !num_pilot) {
      return res.status(400).json({ error: 'Categoria y numero son requeridos' });
   }

   const numPilotInt = Number(num_pilot);
   if (Number.isNaN(numPilotInt)) {
      return res.status(400).json({ error: 'num_pilot debe ser numerico' });
   }

   try {
      // const query = `
      //    SELECT up.* 
      //    FROM users_pista up
      //    JOIN category_table ct ON up.id_category = ct.id_category
      //    WHERE ct.category_name = $1 
      //    AND up.id = $2;
      // `;
      const query = `SELECT * FROM users_pista WHERE id_category = $1 AND id = $2;`
      const data = await connection.query(query, [category, numPilotInt]);
      res.send(data.rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
   }
});

requestRouterCbaPista.get('/circuits_calendar', async (req,res) => {

  console.log('Circuit Calendar entro al back')
   try{
      const query = `SELECT * FROM circuits_calendar;`
      const data = await connection.query(query);
      res.send(data.rows);
   }catch(err){
      console.error(err);
   }

})

requestRouterCbaPista.get('/view_pilots', async (req, res) => {

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
let editRegisterLock = Promise.resolve();

// requestRouterCbaPista.post('/add_register_tire_old', authMiddleware, async (req, res) => {
//   console.log('add_register_tire_old ejecutado');

//   addRegisterLock = addRegisterLock
//     .then(async () => {
//       const {
//         id_pilot,
//         id_event,
//         dateInp,
//         N1_tire, N2_tire, N3_tire,
//         N4_tire, N5_tire, N6_tire
//       } = req.body;

//       const userId = req.usuario.id;

//       const idPilot = Number(id_pilot);
//       const idEvent  = Number(id_event);
//       const tiresArr = [N1_tire, N2_tire, N3_tire, N4_tire, N5_tire, N6_tire].map(Number);

//       // ── FIX #1: Validación numérica básica ──────────────────────────────
//       if ([idPilot, idEvent, ...tiresArr].some(Number.isNaN)) {
//         return res.status(400).json({ error: 'Datos inválidos: todos los campos numéricos son requeridos' });
//       }

//       // ── FIX #2: Cubiertas deben ser enteros positivos ────────────────────
//       if (tiresArr.some(n => !Number.isInteger(n) || n <= 0)) {
//         return res.status(400).json({ error: 'Las cubiertas deben ser números enteros positivos' });
//       }

//       // ── FIX #2b (opcional): Rango máximo de negocio ──────────────────────
//       const TIRE_MAX = 9999;
//       if (tiresArr.some(n => n > TIRE_MAX)) {
//         return res.status(400).json({ error: `El número de cubierta no puede superar ${TIRE_MAX}` });
//       }

//       // ── FIX #3: Validar dateInp como fecha real ──────────────────────────
//       if (!dateInp) {
//         return res.status(400).json({ error: 'La fecha es requerida' });
//       }
//       const parsedDate = new Date(dateInp);
//       if (isNaN(parsedDate.getTime())) {
//         return res.status(400).json({ error: 'La fecha ingresada no es válida' });
//       }

//       // ── Validación: no cubiertas repetidas en el mismo registro ──────────
//       if (new Set(tiresArr).size !== tiresArr.length) {
//         return res.status(400).json({ error: 'No se pueden repetir cubiertas en el mismo registro' });
//       }

//       let registryId;

//       try {
//         await connection.query('BEGIN');

//         const getCategory = await connection.query(`SELECT category FROM users_pista WHERE id = $1`,[id_pilot])

//         // Insert principal
//         const insertRegistry = await connection.query(
//           `
//           INSERT INTO tires_registry
//             (id_pilot, id_event, event_date, tire_n1, tire_n2, tire_n3, tire_n4, tire_n5, tire_n6, created_by)
//           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//           RETURNING id
//           `,
//           // ── FIX #6: userId incluido en el INSERT ─────────────────────────
//           [idPilot, idEvent, dateInp, ...tiresArr, userId]
//         );

//         registryId = insertRegistry.rows[0].id;

//         // ── FIX #4: query de tires_used con parámetros claros ───────────────
//         // registryId ahora es $2, los tires son $3..$8 → sin $7 hardcodeado
//         await connection.query(
//           `
//           INSERT INTO tires_used (registry_id, tire_number, position)
//           VALUES
//             ($1, $2, 'N1'),
//             ($1, $3, 'N2'),
//             ($1, $4, 'N3'),
//             ($1, $5, 'N4'),
//             ($1, $6, 'N5'),
//             ($1, $7, 'N6')
//           `,
//           [registryId, ...tiresArr]
//         );

//         await connection.query('COMMIT');
//         return res.status(201).json({ ok: true, registry_id: registryId });

//       } catch (err) {
//         try { await connection.query('ROLLBACK'); } catch (_) {}

//         if (err.code === '23505') {

//           // Piloto ya tiene registro ese día
//           if (err.constraint === 'tires_registry_unique_pilot_day') {
//             return res.status(409).json({
//               error: 'Conflicto: el piloto ya tiene un registro para ese día',
//               err_code: '23505',
//               err_num: '81020'
//             });
//           }

//           // Cubierta ya usada → identificar cuál/es
//           if (err.constraint === 'tires_used_pkey') {
//             const { rows } = await connection.query(
//               `
//               SELECT tire_number
//               FROM tires_used
//               WHERE tire_number = ANY($1::int[])
//               `,
//               [tiresArr]
//             );

//             const usedSet = new Set(rows.map(r => r.tire_number));

//             const used = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6']
//               .map((pos, i) =>
//                 usedSet.has(tiresArr[i])
//                   ? { position: pos, tire: tiresArr[i] }
//                   : null
//               )
//               .filter(Boolean);

//             return res.status(409).json({
//               error: 'Conflicto: una o más cubiertas ya fueron usadas',
//               err_code: '#23505',
//               err_num: '81001',
//               used
//             });
//           }

//           return res.status(409).json({
//             error: 'Conflicto: duplicado no identificado',
//             err_code: '#23505',
//             err_num: '90091'
//           });
//         }

//         console.error(err);
//         return res.status(500).json({ error: 'Error insertando registro' });
//       }
//     })
//     // ── FIX #5: .catch para que la promise chain no muera ante un error ────
//     .catch((err) => {
//       console.error('Error inesperado en addRegisterLock:', err);
//     });
// });

requestRouterCbaPista.post('/add_register_tire', authMiddleware, async (req, res) => {
  console.log('add_register_tire ejecutado');

  addRegisterLock = addRegisterLock
    .then(async () => {
      const {
        id_pilot,
        id_event,
        dateInp,
        N1_tire, N2_tire, N3_tire,
        N4_tire, N5_tire, N6_tire
      } = req.body;

      const userId = req.usuario.id;

      const idPilot  = Number(id_pilot);
      const idEvent  = Number(id_event);
      const tiresArr = [N1_tire, N2_tire, N3_tire, N4_tire, N5_tire, N6_tire].map(Number);

      // Validación numérica básica
      if ([idPilot, idEvent, ...tiresArr].some(Number.isNaN)) {
        return res.status(400).json({ error: 'Datos inválidos: todos los campos numéricos son requeridos' });
      }

      // Cubiertas deben ser enteros positivos
      if (tiresArr.some(n => !Number.isInteger(n) || n <= 0)) {
        return res.status(400).json({ error: 'Las cubiertas deben ser números enteros positivos' });
      }

      // Rango máximo
      const TIRE_MAX = 9999;
      if (tiresArr.some(n => n > TIRE_MAX)) {
        return res.status(400).json({ error: `El número de cubierta no puede superar ${TIRE_MAX}` });
      }

      // Validar fecha
      if (!dateInp) {
        return res.status(400).json({ error: 'La fecha es requerida' });
      }
      const parsedDate = new Date(dateInp);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'La fecha ingresada no es válida' });
      }

      // No cubiertas repetidas en el mismo registro
      if (new Set(tiresArr).size !== tiresArr.length) {
        return res.status(400).json({ error: 'No se pueden repetir cubiertas en el mismo registro' });
      }

      let registryId;

      try {
        await connection.query('BEGIN');

        // Buscar id_category del piloto
        const pilotRes = await connection.query(
          `SELECT id_category FROM users_pista WHERE id = $1`,
          [idPilot]
        );

        if (pilotRes.rows.length === 0) {
          await connection.query('ROLLBACK');
          return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        const idCategory = pilotRes.rows[0].id_category;

        // Buscar rim_size de la categoria
        const categoryRes = await connection.query(
          `SELECT rim_size FROM category_table WHERE id_category = $1`,
          [idCategory]
        );

        if (categoryRes.rows.length === 0) {
          await connection.query('ROLLBACK');
          return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        const rimSize = categoryRes.rows[0].rim_size;

        // Control preventivo: verificar si alguna cubierta ya está usada en este evento y rodado
        const checkTires = await connection.query(
          `
          SELECT tire_number
          FROM tires_used
          WHERE id_event = $1
            AND rim_size = $2
            AND tire_number = ANY($3::int[])
          `,
          [idEvent, rimSize, tiresArr]
        );

        if (checkTires.rows.length > 0) {
          await connection.query('ROLLBACK');
        
          const usedSet = new Set(checkTires.rows.map(r => r.tire_number));
        
          const used = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6']
            .map((pos, i) =>
              usedSet.has(tiresArr[i])
                ? { position: pos, tire: tiresArr[i] }
                : null
            )
            .filter(Boolean);
          
          return res.status(409).json({
            error: 'Conflicto: una o más cubiertas ya fueron usadas en este evento',
            err_code: '#23505',
            err_num: '81001',
            used
          });
        }


        // Insert principal
        const insertRegistry = await connection.query(
          `
          INSERT INTO tires_registry
            (id_pilot, id_event, event_date, tire_n1, tire_n2, tire_n3, tire_n4, tire_n5, tire_n6, created_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING id
          `,
          [idPilot, idEvent, dateInp, ...tiresArr, userId]
        );

        registryId = insertRegistry.rows[0].id;

        // Insert tires_used con rim_size e id_event
        console.log('Antes de la ejecucion ---=====-----')
        await connection.query(
          `
          INSERT INTO tires_used (registry_id, id_event, tire_number, rim_size, position)
          VALUES
            ($1, $2, $4, $3, 'N1'),
            ($1, $2, $5, $3, 'N2'),
            ($1, $2, $6, $3, 'N3'),
            ($1, $2, $7, $3, 'N4'),
            ($1, $2, $8, $3, 'N5'),
            ($1, $2, $9, $3, 'N6')
          `,
          [registryId, idEvent, rimSize, ...tiresArr]
        );
        

        await connection.query('COMMIT');
        return res.status(201).json({ ok: true, registry_id: registryId });

      } catch (err) {
        try { await connection.query('ROLLBACK'); } catch (_) {}

        if (err.code === '23505') {

          // Piloto ya tiene registro ese día
          if (err.constraint === 'tires_registry_unique_pilot_day') {
            return res.status(409).json({
              error: 'Conflicto: el piloto ya tiene un registro para ese día',
              err_code: '23505',
              err_num: '81020'
            });
          }

          // Cubierta ya usada en ese evento con ese rodado
          if (err.constraint === 'tires_used_unique_tire_event') {
            const { rows } = await connection.query(
              `
              SELECT tire_number
              FROM tires_used
              WHERE tire_number = ANY($1::int[])
                AND rim_size = $2
                AND id_event = $3
              `,
              [tiresArr, rimSize, idEvent]
            );

            const usedSet = new Set(rows.map(r => r.tire_number));

            const used = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6']
              .map((pos, i) =>
                usedSet.has(tiresArr[i])
                  ? { position: pos, tire: tiresArr[i] }
                  : null
              )
              .filter(Boolean);

            return res.status(409).json({
              error: 'Conflicto: una o más cubiertas ya fueron usadas en este evento',
              err_code: '#23505',
              err_num: '81001',
              used
            });
          }

          return res.status(409).json({
            error: 'Conflicto: duplicado no identificado',
            err_code: '#23505',
            err_num: '90091'
          });
        }

        console.error(err);
        return res.status(500).json({ error: 'Error insertando registro' });
      }
    })
    .catch((err) => {
      console.error('Error inesperado en addRegisterLock:', err);
    });
});

requestRouterCbaPista.post("/add_new_pilot", async (req, res) => {
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


// --------------- Editar ------------
//------------------------------------

requestRouterCbaPista.put('/edit_register_tire', authMiddleware, async (req, res) => {
  console.log('edit_register_tire ejecutado');



  editRegisterLock = editRegisterLock
    .then(async () => {
      const { id_registry, tires } = req.body;

      const userId = req.usuario.id;
      const idRegistry = Number(id_registry);

      // Validación básica del id
      if (Number.isNaN(idRegistry) || !Number.isInteger(idRegistry) || idRegistry <= 0) {
        return res.status(400).json({ error: 'id_registry inválido' });
      }

      // Validar que tires sea un array no vacío
      if (!Array.isArray(tires) || tires.length === 0) {
        return res.status(400).json({ error: 'Debe enviar al menos una cubierta para editar' });
      }

      const VALID_POSITIONS = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6'];
      const TIRE_MAX = 9999;

      // Validar cada item del array
      for (const item of tires) {
        if (!VALID_POSITIONS.includes(item.position)) {
          return res.status(400).json({ error: `Posición inválida: ${item.position}` });
        }
        const n = Number(item.tire_number);
        if (Number.isNaN(n) || !Number.isInteger(n) || n <= 0) {
          return res.status(400).json({ error: `Número de cubierta inválido en posición ${item.position}` });
        }
        if (n > TIRE_MAX) {
          return res.status(400).json({ error: `El número de cubierta no puede superar ${TIRE_MAX} (posición ${item.position})` });
        }
      }

      // No cubiertas nuevas repetidas entre sí en la misma petición
      const incomingTireNumbers = tires.map(t => Number(t.tire_number));
      if (new Set(incomingTireNumbers).size !== incomingTireNumbers.length) {
        return res.status(400).json({ error: 'No se pueden repetir cubiertas en la misma petición' });
      }

      try {
        await connection.query('BEGIN');

        // 1. Buscar el registro y verificar que el evento esté abierto
        const registryRes = await connection.query(
          `
          SELECT tr.id_event, tr.tire_n1, tr.tire_n2, tr.tire_n3,
                 tr.tire_n4, tr.tire_n5, tr.tire_n6,
                 rs.is_locked
          FROM tires_registry tr
          JOIN race_status rs ON rs.id_event = tr.id_event
          WHERE tr.id = $1
          `,
          [idRegistry]
        );

        if (registryRes.rows.length === 0) {
          await connection.query('ROLLBACK');
          return res.status(404).json({ error: 'Registro no encontrado' });
        }

        const registry = registryRes.rows[0];

        if (registry.is_locked) {
          await connection.query('ROLLBACK');
          return res.status(403).json({ error: 'No se puede editar un registro de un evento cerrado' });
        }
        // if (!registry.is_open) {
        //   await connection.query('ROLLBACK');
        //   return res.status(403).json({ error: 'No se puede editar un registro de un evento cerrado' });
        // }

        const idEvent = registry.id_event;

        // 2. Obtener rim_size desde tires_used
        const rimRes = await connection.query(
          `SELECT rim_size FROM tires_used WHERE registry_id = $1 LIMIT 1`,
          [idRegistry]
        );

        if (rimRes.rows.length === 0) {
          await connection.query('ROLLBACK');
          return res.status(404).json({ error: 'No se encontraron cubiertas asociadas al registro' });
        }

        const rimSize = rimRes.rows[0].rim_size;

        // Mapa de posición → número actual en el registro
        const currentTiresMap = {
          N1: registry.tire_n1,
          N2: registry.tire_n2,
          N3: registry.tire_n3,
          N4: registry.tire_n4,
          N5: registry.tire_n5,
          N6: registry.tire_n6,
        };

        // 3. Filtrar las que realmente cambian
        const toProcess = tires
          .map(t => ({ position: t.position, tire_number: Number(t.tire_number) }))
          .filter(t => t.tire_number !== currentTiresMap[t.position]);

        if (toProcess.length === 0) {
          await connection.query('ROLLBACK');
          return res.status(200).json({ ok: true, message: 'Sin cambios que aplicar', updated: [], failed: [] });
        }

        // 4. Verificar conflictos en el evento/rodado excluyendo el propio registro
        const newTireNumbers = toProcess.map(t => t.tire_number);

        const conflictRes = await connection.query(
          `
          SELECT tire_number
          FROM tires_used
          WHERE id_event = $1
            AND rim_size = $2
            AND tire_number = ANY($3::int[])
            AND registry_id <> $4
          `,
          [idEvent, rimSize, newTireNumbers, idRegistry]
        );

        const conflictSet = new Set(conflictRes.rows.map(r => r.tire_number));

        const toUpdate = toProcess.filter(t => !conflictSet.has(t.tire_number));
        const failed   = toProcess
          .filter(t => conflictSet.has(t.tire_number))
          .map(t => ({ position: t.position, tire: t.tire_number, reason: 'Cubiertas en uso!' }));

        const updated = [];

        // 5. Aplicar los UPDATE
        for (const item of toUpdate) {
          const colName = `tire_${item.position.toLowerCase()}`;

          await connection.query(
            `UPDATE tires_registry SET ${colName} = $1, updated_by = $2 WHERE id = $3`,
            [item.tire_number, userId, idRegistry]
          );

          await connection.query(
            `
            UPDATE tires_used
            SET tire_number = $1
            WHERE registry_id = $2 AND position = $3
            `,
            [item.tire_number, idRegistry, item.position]
          );

          updated.push({ position: item.position, tire: item.tire_number });
        }

        // 6. Registrar actividad si hubo al menos una edición exitosa
        if (updated.length > 0) {
          const detail = updated
            .map(u => `${u.position}: ${currentTiresMap[u.position]} → ${u.tire}`)
            .join(' | ');

          await connection.query(
            `
            INSERT INTO user_activity (id_user, activity, detail, id_event)
            VALUES ($1, 'Edit', $2, $3)
            `,
            [userId, `Edición cubiertas - registry_id: ${idRegistry} | ${detail}`, idEvent]
          );
        }

        await connection.query('COMMIT');

        const status = failed.length > 0 && updated.length === 0 ? 409
                     : failed.length > 0                         ? 207
                     : 200;

        return res.status(status).json({ ok: true, updated, failed });

      } catch (err) {
        try { await connection.query('ROLLBACK'); } catch (_) {}
        console.error(err);
        return res.status(500).json({ error: 'Error editando registro' });
      }
    })
    .catch((err) => {
      console.error('Error inesperado en editRegisterLock:', err);
    });
});



// --------------------------------------
// Validaciones
// --------------------------------------

requestRouterCbaPista.get('/check_load_status', async (req, res) => {
  try{
    const query = `SELECT * FROM race_status WHERE is_locked = false;`
    const data = await connection.query(query);
    res.send(data.rows);
  }catch(err){
    res.send(err);
  }
})


requestRouterCbaPista.post('/start_load_records', authMiddleware, async (req, res) => {
  const { event_selected } = req.body;
  const assignee = req.usuario.id;

  console.log('Back ==> ',assignee)

  try {
    // INICIAR TRANSACCIÓN
    await connection.query('BEGIN');

    // 1. VERIFICAR si hay una ronda abierta
    const checkQuery = `
      SELECT COUNT(*) as open_rounds 
      FROM race_status 
      WHERE is_locked = false
    `;
    const checkResult = await connection.query(checkQuery);
    
    if (parseInt(checkResult.rows[0].open_rounds) > 0) {
      await connection.query('ROLLBACK'); // ← DESHACER
      return res.status(409).json({ 
        error: 'Hay una ronda abierta. Debes cerrarla antes de iniciar una nueva.' 
      });
    }

    // 2. INSERTAR nueva ronda en race_status
    const insertRaceQuery = `
      INSERT INTO race_status (id_event, id_auditor)
      VALUES ($1, $2)
      RETURNING id_status
    `;
    const raceResult = await connection.query(insertRaceQuery, [
      event_selected,
      assignee
    ]);

    // 3. INSERTAR en user_activity
    const activityQuery = `
      INSERT INTO user_activity (id_user, activity, id_event, detail)
      VALUES ($1, $2, $3, $4)
    `;
    await connection.query(activityQuery, [
      assignee,
      'Start Run',
      event_selected,
      `Nueva ronda iniciada - status_id: ${raceResult.rows[0].id_status}`
    ]);

    // CONFIRMAR TRANSACCIÓN
    await connection.query('COMMIT');

    // 4. RESPUESTA exitosa
    res.status(201).json({
      ok: true,
      message: 'Ronda iniciada correctamente',
      status_id: raceResult.rows[0].id_status
    });

  } catch (err) {
    // DESHACER EN CASO DE ERROR
    try { await connection.query('ROLLBACK'); } catch (_) {}
    
    console.error('Error en start_load_records:', err);
    res.status(500).json({ 
      error: 'Error interno al iniciar la ronda' 
    });
  }
});

 

requestRouterCbaPista.post('/finish_load_records', authMiddleware, async (req, res) => {
  // Solo necesitamos el id del usuario que cierra la ronda
  const assignee = req.usuario.id;

  // Validación básica
  if (!assignee) {
    return res.status(400).json({ error: 'Falta el id del usuario (assignee)' });
  }

  try {
    await connection.query('BEGIN');

    // 1. Buscar la ronda abierta (is_locked = false) y obtener su id_status e id_event
    const checkQuery = `
      SELECT id_status, id_event
      FROM race_status
      WHERE is_locked = false
      ORDER BY id_status DESC
      LIMIT 1
    `;
    const checkResult = await connection.query(checkQuery);

    if (checkResult.rows.length === 0) {
      await connection.query('ROLLBACK');
      return res.status(409).json({
        error: 'No hay ninguna ronda abierta para cerrar.'
      });
    }

    const openRound = checkResult.rows[0];
    const statusId = openRound.id_status;
    const eventId = openRound.id_event;

    // 2. Actualizar el registro: bloquear y poner timestamp
    const updateQuery = `
      UPDATE race_status
      SET is_locked = true, locked_at = NOW()
      WHERE id_status = $1
      RETURNING id_status, locked_at
    `;
    const updateResult = await connection.query(updateQuery, [statusId]);

    // 3. Registrar la acción en user_activity
    const activityQuery = `
      INSERT INTO user_activity (id_user, activity, id_event, detail)
      VALUES ($1, $2, $3, $4)
    `;
    await connection.query(activityQuery, [
      assignee,
      'End Run',
      eventId,
      `Ronda finalizada - status_id: ${statusId}`
    ]);

    await connection.query('COMMIT');

    // 4. Respuesta exitosa
    res.status(200).json({
      ok: true,
      message: 'Ronda cerrada correctamente',
      status_id: statusId,
      event_id: eventId,
      locked_at: updateResult.rows[0].locked_at
    });

  } catch (err) {
    try { await connection.query('ROLLBACK'); } catch (_) {}
    console.error('Error en finish_load_records:', err);
    res.status(500).json({
      error: 'Error interno al cerrar la ronda'
    });
  }
});





// DELETE REGISTRY (Anulado por ahora en el param)
requestRouterCbaPista.delete('/delete_register_tire_', async (req, res) => {
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

  // ACA VERIFICAR CONDICION DEL REGISTRO

  try {
    await connection.query('BEGIN');

   // borrar dependientes
  await connection.query(
    `DELETE FROM tires_used WHERE registry_id = ANY($1::int[])`,
    [ids]
  );
  
  // borrar principales
  const result = await connection.query(
    `DELETE FROM tires_registry WHERE id = ANY($1::int[])`,
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

// DELETE REGISTRY WITH VERIFICATION
requestRouterCbaPista.delete('/delete_register_tire', async (req, res) => {
  console.log('Delete Registry ====>>');
  const { registry_ids } = req.body;

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
    // Verificar el último estado del evento para cada registro
    const lockCheck = await connection.query(
      `
      SELECT DISTINCT ON (tr.id_event) rs.is_locked
      FROM tires_registry tr
      INNER JOIN race_status rs ON tr.id_event = rs.id_event
      WHERE tr.id = ANY($1::int[])
      ORDER BY tr.id_event, rs.id_status DESC
      `,
      [ids]
    );

    const hasLocked = lockCheck.rows.some(row => row.is_locked);
    if (hasLocked) {
      res.status(403).json({ error: '- Registros de evento carrado!' });
      return;
    }

    await connection.query('BEGIN');

    const result = await connection.query(
      `DELETE FROM tires_registry WHERE id = ANY($1::int[])`,
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

requestRouterCbaPista.delete("/delete_pilot", async (req, res) => {
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


export default requestRouterCbaPista;






