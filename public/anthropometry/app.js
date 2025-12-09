
console.clear();

import express from "express";
import connection from "./Routers/connectionBBDD.js"
import routerApp from "./Routers/routes.js";
import cors from "cors";

const expressApp = express()
const PORT = 3111;

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(cors());
expressApp.use(routerApp);




expressApp.listen(PORT, (e) => {
   console.log('Sever Listen port: ' + PORT);
})
