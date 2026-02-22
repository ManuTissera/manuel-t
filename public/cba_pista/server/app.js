

import express from 'express';
import connection from './Router/connectionBBDD.js';
import routerRequest from './Router/routes.js';
import cors from 'cors';

const PORT = 8181;
const expressApp = express();

expressApp.use(express.json())
expressApp.use(express.text())
expressApp.use(cors())
expressApp.use('/',routerRequest);

expressApp.listen(PORT, () => {
   console.log('SERVER listen in PORT:',PORT)
});



