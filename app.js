console.clear();

import express from "express";
import routerRequest from "./Routes/routes.js";
import authRoutes from './Routes/auth.js';
import routerApp from "./Routes/routes-anthropometry.js";
import requestRouterData from "./Routes/routes-news-data.js";
import requestRouterCbaPista from "./Routes/routes-cba_pista.js";
import connection from "./Routes/connectionBBDD.js";
import cors from "cors";
import path from "path";
import fs from "fs";

const expressApp = express();
const PORT = process.env.PORT || 3210;

const __dirname = path.resolve();

/* =========================
MIDDLEWARE
========================= */

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(cors());

/* =========================
API ROUTES
========================= */

expressApp.use('/api/auth', authRoutes);
expressApp.use("/", requestRouterCbaPista);
expressApp.use("/", requestRouterData);
expressApp.use("/", routerRequest);
expressApp.use("/", routerApp);

/* =========================
   STATIC FILES (GENERAL PUBLIC)
========================= */

expressApp.use(express.static(path.join(__dirname, "public")));

/* =========================
   SERVE REACT BUILD (lawyer) - PRIMERO
========================= */

const lawyerBuildPath = path.join(__dirname, "public", "lawyer", "dist");
const lawyerIndexPath = path.join(lawyerBuildPath, "index.html");

if (fs.existsSync(lawyerIndexPath)) {
  // expressApp.use("/lawyer", express.static(lawyerBuildPath));
  expressApp.use("/", express.static(lawyerBuildPath));
  
  // expressApp.get("/lawyer*", (req, res) => {
  expressApp.get("*", (req, res) => {
    res.sendFile(lawyerIndexPath);
  });
}

/* =========================
   SERVE REACT BUILD (cba_pista) - DESPUÉS
========================= */

// const clientBuildPath = path.join(__dirname, "public", "cba_pista", "dist");
// const clientIndexPath = path.join(clientBuildPath, "index.html");

// if (fs.existsSync(clientIndexPath)) {
//   expressApp.use(express.static(clientBuildPath));
  
//   // Este fallback SOLO se ejecuta si no coincidió /lawyer*
//   expressApp.get("*", (req, res) => {
//     res.sendFile(clientIndexPath);
//   });
// }

/* =========================
   START SERVER
========================= */

expressApp.listen(PORT, () => {
  console.log("Listen in PORT= " + PORT);
});