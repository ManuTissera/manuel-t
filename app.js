console.clear();

import express from "express";
import routerRequest from "./Routes/routes.js";
import requestRouterData from "./Routes/routes-news-data.js"
import connection from "./Routes/connectionBBDD.js";
import cors from "cors";
import path from 'path';

const expressApp = express();
const PORT = process.env.PORT || 3210;

const __dirname = path.resolve();
expressApp.use(express.static(path.join(__dirname, 'public')));

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(cors());

expressApp.use("/",requestRouterData);
expressApp.use("/",routerRequest);

expressApp.listen(PORT,()=>{
   console.log('Listen in PORT= '+ PORT)
   console.log('Prueba con path en routes.js')
})



