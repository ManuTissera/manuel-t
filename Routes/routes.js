

import express from "express";
import path from 'path';
import connection from "./connectionBBDD.js";

const routerRequest = express.Router();
const __dirname = path.resolve();

routerRequest.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'public','index.html'))
})


routerRequest.get('/sum_total_cajas', async (req,res)=>{

   try{
      const query = `SELECT TO_CHAR(SUM(venta_efectivo + venta_tarjeta + venta_cuenta_corriente), 'FM$999,999,999,999') AS total_cajas_formateado
FROM cajas;`;
      const results = await connection.query(query);
      res.send(results.rows);
   }catch(err){
      console.error('Erro en servidor petition "get" /sum_total_cajas ' + err)
      res.status(500).send('Error servidor /sum_tota_vetnas')
   }
})

routerRequest.get('/sum_total_compras', async (req,res)=>{

   try{
      const query = `SELECT TO_CHAR(SUM(monto), 'FM$999,999,999,999') AS total_compras
FROM compras;`;
      const results = await connection.query(query);
      res.send(results.rows);
   }catch(err){
      console.error('Erro en servidor petition "get" /sum_total_cajas ' + err)
      res.status(500).send('Error servidor /sum_tota_vetnas')
   }
})

routerRequest.get('/total_caja_eft', async (req,res)=>{

   try{
      const query = `SELECT TO_CHAR(SUM(venta_efectivo),'FM$999,999,999,999') 
      AS total_efectivo FROM cajas;`;
      const results = await connection.query(query);
      res.send(results.rows);
   }catch(err){
      console.error('Erro en servidor petition "get" /total_venta_eft ' + err)
      res.status(500).send('Error servidor /total_venta_eft')
   }
})

routerRequest.get('/total_caja_tar', async (req,res)=>{

   try{
      const query = `SELECT TO_CHAR(SUM(venta_tarjeta),'FM$999,999,999,999') 
      AS total_tarjeta FROM cajas;`;
      const results = await connection.query(query);
      res.send(results.rows);
   }catch(err){
      console.error('Erro en servidor petition "get" /total_venta_tar' + err)
      res.status(500).send('Error servidor /total_venta_tar')
   }
})



// ------- PROVEEDORES -----------

routerRequest.get('/view_proveedores', async (req,res)=>{

   try{
      const query = `SELECT * FROM proveedores ORDER BY id_prov DESC;`
      const result = await connection.query(query);
      res.send(result.rows)
   }catch(err){
      res.status(500).send('Error de BBDD /view_proveedores')
   }

})

routerRequest.post('/add_proveedor', async (req,res)=>{

   //const { objectData } = req.body;
   const { nombre_fantacia,razon_social,cuit,direccion,telefono,email } = req.body;

   try{
      let query = `INSERT INTO proveedores (nombre_fantacia,razon_social,cuit,direccion,telefono,email)
                  VALUES 
                  ('${nombre_fantacia}','${razon_social}','${cuit}','${direccion}','${telefono}','${email}');`
      const result = await connection.query(query);
      res.send(`Successfully loaded`)
   }catch(err){
      res.status(400).send('Error petition "post" /add_proveedor' + err);
   }
      // let keys = Object.keys(objectData)
      // let values = Object.values(objectData)
      // let setQuery = keys.map((_,index) => `'$${index + 1}'`).join(',')
      // let query = `INSERT INTO proveedores (nombre_fantacia,razon_social,cuit,direccion,telefono,email)
      //             VALUES (${setQuery});`
      // const result = connection.query(query,[...values]);
      //res.send(`Proveedor cargado con exito ${nombre_fantacia},${razon_social},${cuit},${direccion},${telefono},${email}`)
      


})

// ------- GASTOS -----------

routerRequest.get('/view_gastos', async (req,res)=>{

   try{
      const query = `SELECT * FROM gastos ORDER BY id_gasto DESC;;`;
      const result = await connection.query(query);
      res.send(result.rows);
   }catch(err){
      res.status(500).send('Error petition "get" /view_gastos' + err);
   }
})

routerRequest.post('/add_gasto', async (req,res)=>{

   const { date,category,subCategory,description,amount,method,proveedor } = req.body;
   
   // ('${date}','${category}','${subCategory}','${description}','${amount}','${method}','${proveedor}');

   try{
      const query = `
            INSERT INTO gastos (fecha, categoria, subcategoria, descripcion, monto, forma_pago, proveedor) 
            VALUES
            ('${date}','${category}','${subCategory}','${description}',${amount},'${method}','${proveedor}');
            `
      const result = await connection.query(query);
      res.send(`Successfully loaded`)
   }catch(err){
      console.error('Error petition /add_gasto '+err);
      res.status(500).send('Error petition "post" /add_gasato' + err);
   }

})
// ------- CAJAS -----------

routerRequest.get('/view_caja', async (req,res)=>{

   try{
      const query = `SELECT * FROM cajas ORDER BY id DESC`;
      const result = await connection.query(query);
      res.send(result.rows);
   }catch(err){
      res.status(400).send('Error petition "get" /view_caja');
   }

})

routerRequest.post('/add_caja', async (req,res)=>{

   const { date,turno,titular,comercio,efectivo,tarjeta,ctaCte } = req.body;


   try{
      const query = `
      INSERT INTO cajas 
      (fecha, personal, comercio, venta_efectivo, venta_tarjeta, venta_cuenta_corriente)
      VALUES
      ('${date}','${titular}','${comercio}',${efectivo},${tarjeta},${ctaCte});
      `;
      const result = await connection.query(query);
      res.send('Successfully loaded');
   }catch(err){
      res.status(400).send('Error petition "post" /add_caja ' + err);
   }

})

// ------- COMPRAS ------------

routerRequest.get('/view_compras', async (req,res)=>{

   try{
      const query = `SELECT * FROM compras ORDER BY id_compra DESC;`;
      const result = await connection.query(query);
      res.send(result.rows);
   }catch(err){
      console.error('Error servidor /vierw_compras' + err);
      res.status(500).send('Error servidor /view_compras ' + err);
   }
})
routerRequest.post('/add_compra', async (req,res)=>{

   const {fecha, proveedor, categoria, descripcion, monto, forma_pago, tipo_factura, numero_factura} = req.body;
   
   try{
      const query = `INSERT INTO  compras 
   (fecha, proveedor, categoria, descripcion, monto, forma_pago, tipo_factura, numero_factura)
   VALUES 
   ('${fecha}', '${proveedor}', '${categoria}', '${descripcion}', ${monto}, '${forma_pago}', '${tipo_factura}', '${numero_factura}');
      `
      const result = await connection.query(query);
      res.send(`Successfully loaded`)
   }catch(err){
      res.status(500).send('Error petitio "post" /add_personal' + err);
   }
})

// ------- PERSONAL -----------

routerRequest.get('/view_personal', async (req,res)=>{

   try{
      const query = `SELECT * FROM personal ORDER BY id_personal DESC;`;
      const result = await connection.query(query);
      res.send(result.rows);
   }catch(err){
      res.status(500).send('Error petitio "get" /view_personal');
   }
})

routerRequest.post('/add_personal', async (req,res)=>{
   
   const {date,namePersonal,surname,role,phone,direction} = req.body;

   try{
      const query = `
      INSERT INTO personal 
      (nombre, apellido, cargo, fecha_ingreso, telefono, direccion) VALUES
      ('${namePersonal}','${surname}','${role}','${date}','${phone}','${direction}');
      `
      const result = await connection.query(query);
      res.send(`Successfully loaded`)

   }catch(err){
      res.status(500).send('Error petitio "post" /add_personal' + err);
   }
})
// ------- COMERCIOS -----------

routerRequest.get('/view_comercios', async (req,res)=>{

   try{
      const query = `SELECT * FROM comercios;`;
      const result = await connection.query(query);
      res.send(result.rows)
   }catch(err){
      res.status(500).send('Error al realizar la peticiona PostgreSQL')
   }
   

})
// ------- CLIENTES -----------

routerRequest.get('/view_clientes', async(req,res)=>{  

   try{
      const query = `SELECT * FROM clientes ORDER BY id_cliente DESC`;
      const result = await connection.query(query);
      res.send(result.rows)
   }catch(err){
      res.status(500).send('Error al realizar la peticiona PostgreSQL')
   }
});

routerRequest.post('/add_cliente', async (req,res)=>{

   const { name,razon,cuit,regimen,direction,phone,email,dateIng} = req.body;


   try{
      const query = `INSERT INTO clientes 
            (nombre_fantacia_cl,razon_social_cl,cuit_cl,direccion_cl,telefono_cl,email_cl,fecha_ingreso_cl,facturacion)
            VALUES 
            ('${name}','${razon}','${cuit}','${direction}','${phone}','${email}','${dateIng}','${regimen}');`
      const result = await connection.query(query);
      res.send(`Successfully loaded`)
   }catch(err){
      res.status(500).send('Error petition "post" /add_cliente' + err);
   }
})

// ------- EDITAR -----------

routerRequest.post('/view_data_edit', async (req,res)=>{

      const { table,column,id } = req.body;

   try{
      const query = `SELECT * FROM ${table} WHERE ${column} = ${id}`;
      const results = await connection.query(query);
      res.send(results.rows);
   }catch(err){
      console.error('Error petition /view_data_edit '+ err);
      res.status(400).send('Error petition "get" /view_data_edit' + err);
   }
})

routerRequest.post('/view_data_edit_cliente', async (req,res)=>{


try{
   const query = `SELECT * FROM clientes WHERE id_cliente = 30`;
   const results = await connection.query(query);
   res.send(results.rows);
}catch(err){
   console.error('Error petition /view_data_edit '+ err);
   res.status(400).send('Error petition "get" /view_data_edit' + err);
}
})

routerRequest.patch('/edit_element', async (req,res)=>{

   const { table, dataChange , idColumn , id } = req.body;

   try{
      const query = `UPDATE ${table} SET ${dataChange} WHERE ${idColumn} = ${id};`
      const results = await connection.query(query);
      res.send('Elemento editado correctamente');
           
   }catch(err){
      console.error('Erros en la peition /edit_element');
      res.status(500).send('Error petition "patch" /edit_element', err);
   }

})

// ------- ELIMINAR ----------- 
routerRequest.delete('/delete_element', async (req,res)=>{

   const { idDelete,idColumn,tabla } = req.body;

   try{
      const query = `DELETE FROM ${tabla} WHERE ${idColumn} IN (${idDelete});`;
      //const query = `DELETE FROM proveedores WHERE id_prov = 40;`;
      const result = await connection.query(query);
      res.send('Cliente Eliminado con exito id: '+idDelete)
   }catch(err){
      res.send(500).send('Erro petition "delete" /del_cliente' + err);
   }
})




export default routerRequest;


