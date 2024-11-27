

import express from "express";
import connection from "./connectionBBDD.js";
import { DateTime } from 'luxon';

const requestRouterData = express.Router();


requestRouterData.get('/view_name_news', async (req,res)=>{

    try{
        let query = `SELECT * FROM news_name;`
        let result = await connection.query(query);
        res.send(result.rows);
    }catch(err){
        console.log('Error al obtener datos ',err);
        res.status(500).send('Error Servidor /view_name_news');
    }
});

requestRouterData.post('/add_new_news', async (req,res) =>{

    let { date,time,actual,expected,previous,id_new_name } = req.body;

    try{
        const query = `INSERT INTO economic_news_data 
                    (publication_date,publication_time,actual_value,expected_value,previous_value,id_new_name)
                    VALUES 
                    ('${date}','${time}',${actual},${expected},${previous},${id_new_name});`;
        let result = await connection.query(query);
        res.send('News agregada correctamente')
    }catch(err){
        console.error('Error al cargar los datos ',err);
        res.status(500).send('Error en el servidor')
    }
})

// -------------------------------------------------------------------------------------------------
// ------------------------        TABLES
// -------------------------------------------------------------------------------------------------

requestRouterData.get('/view_data_title/:guid', async (req,res) => {

        const { guid } = req.params;

    try{
        let query = `SELECT * FROM news_name WHERE id_new_name = ${guid};`
        let result = await connection.query(query);
        res.send(result.rows);
    }catch(err){
        console.error('Error  respuesta /view_data_title',err);
        res.status(500).send('Error en el servidor / view_data_title');
    }
})

requestRouterData.get('/view_news_table/:guid', async (req,res) => {

    let { guid } = req.params;

    try{
        const query = `SELECT * FROM economic_news_data WHERE id_new_name = ${guid} ORDER BY publication_date DESC;`
        const result = await connection.query(query);
        res.send(result.rows);
    }catch(err){
        console.error('Error al recibir los datos en view_news_table ',err);
        res.status(500).send('Error en el servidor /view_news_table')
    }
})

requestRouterData.post('/filter_data_titulos/:guid', async (req,res) => {

    const { guid } = req.params;
    const { whereData } = req.body;

    try{
        const query = ` SELECT * FROM economic_news_data 
                        WHERE id_new_name = ${guid}
                        ${whereData}
                        ORDER BY publication_date DESC;`;
        const results = await connection.query(query);
        res.send(results.rows);
    }catch(err){
        console.error('Error al realizar la consulta en /filter_data_titulos',err);
        res.status(500).send('Error en el servidor /filter_data_titulos');
    }
})

requestRouterData.delete('/delete_data_new',(req,res) => {

    let { idDelete } = req.body;

        try{
            const query = `DELETE FROM economic_news_data WHERE id_ec_data = ${idDelete};`
            const result = connection.query(query);
            res.send(result.rows);
        }catch(err){
            console.error('Error en la peticion /delete_data_new' + err);
            res.status(500).send('Error en el servidor /delete_data_new');
        }
})

requestRouterData.get('/download_news_data/:guid', async (req,res) => {

    const { guid } = req.params;

    try{
        const query = `SELECT * FROM economic_news_data WHERE id_new_name = ${guid} ORDER BY publication_date DESC;`
        const result = await connection.query(query);

        let sqlContent = '';
        result.rows.forEach(row =>{
            sqlContent += `INSERT INTO economic_news_data (id_ec_data, publication_date, publication_time, actual_value, expected_value, previous_value, id_new_name)
            VALUES (${row.id_ec_data}, '${row.publication_date}', '${row.publication_time}', ${row.actual_value}, ${row.expected_value}, ${row.previous_value}, ${row.id_new_name});\n`;
        });

        res.setHeader('Content-Type','application/octet-stream');
        res.setHeader('Content-Disposition',`attachment; filename="news_data_${guid}.sql"`);
        res.send(sqlContent);
    }catch(err){
        console.error('Error al generar el archivo SQL', err);
        res.status(500).send('Error en el servidor');
    }
})

// -------------------------------------------------------------------------------------------------
// ------------------------        ECONOMIC CALENDAR
// -------------------------------------------------------------------------------------------------

const adjustedDateFn = () =>{
    // const { whereData,timeZone } = req.body;

    // try{
    //     const query = ` SELECT nm.id_new_name,nm.new_name,nm.new_site,ec.publication_date,ec.id_new_name,
    //                             nm.new_value,ec.actual_value,ec.expected_value,ec.previous_value 
    //                     FROM economic_news_data ec
    //                     RIGHT JOIN news_name nm ON ec.id_new_name = nm.id_new_name
    //                     ${whereData}
    //                     ORDER BY ec.publication_date DESC;`
    //                     const result = await connection.query(query);
        
    //                     const adjustedRows = result.rows.map(row => ({
    //                         ...row,
    //                         publication_date: row.publication_date 
    //                             ? DateTime.fromISO(row.publication_date.toISOString(), { zone: timeZone }).toISO()
    //                             : null
    //                     }));
                
    //                     res.send(adjustedRows);
    //                 } catch (err) {
    //                     console.error('Error al obtener datos: ', err);
    //                     res.status(500).send('Error en el servidor');
    //                 }
                
}


requestRouterData.post('/view_news_calendar', async (req,res)=>{

    const { timeZone } = req.body;

    try{
        const query = `SELECT nm.id_new_name,nm.new_name,nm.new_site,ec.publication_date,ec.id_new_name,
                                nm.new_value,ec.actual_value,ec.expected_value,ec.previous_value 
                        FROM economic_news_data ec
                        LEFT JOIN news_name nm ON ec.id_new_name = nm.id_new_name
                        ORDER BY ec.publication_date DESC;`;
                        const result = await connection.query(query);

                        res.send(result.rows);
                    } catch (err) {
                        console.error('Error al obtener datos: ', err);
                        res.status(500).send('Error en el servidor');
                    }
                });

requestRouterData.post('/filter_news_calendar', async (req,res)=>{

    const { whereData,timeZone } = req.body;

    try{
        const query = ` SELECT nm.id_new_name,nm.new_name,nm.new_site,ec.publication_date,ec.id_new_name,
                                nm.new_value,ec.actual_value,ec.expected_value,ec.previous_value 
                        FROM economic_news_data ec
                        RIGHT JOIN news_name nm ON ec.id_new_name = nm.id_new_name
                        ${whereData}
                        ORDER BY ec.publication_date DESC;`
                        const result = await connection.query(query);

                        res.send(result.rows);
                    } catch (err) {
                        console.error('Error al obtener datos: ', err);
                        res.status(500).send('Error en el servidor');
                    }
                });

requestRouterData.get('/download_news_calendar', async (req,res)=>{

    
})



export default requestRouterData