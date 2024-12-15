import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './routes/connectBBDD.js';
import requestRouter from './routes/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expressApp = express();
const PORT = process.env.PORT || 3111;

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(cors());

expressApp.use('/', requestRouter);

// Sirviendo archivos estáticos
expressApp.use(express.static(path.join(__dirname, 'dist')));

// Redirigir todas las rutas del frontend a index.html
expressApp.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

expressApp.listen(PORT, () => {
   console.log('Servidor levantado en puerto: ', PORT);
});
