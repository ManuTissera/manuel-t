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
   SERVE REACT BUILDS
========================= */

// 1. LAWYER (Abogados)
const lawyerBuildPath = path.join(__dirname, "public", "lawyer", "dist");
const lawyerIndexPath = path.join(lawyerBuildPath, "index.html");

if (fs.existsSync(lawyerIndexPath)) {
  expressApp.use("/lawyer", express.static(lawyerBuildPath));
}

// 2. CBA_PISTA (Tires Control)
const cbaPistaBuildPath = path.join(__dirname, "public", "cba_pista", "dist");
const cbaPistaIndexPath = path.join(cbaPistaBuildPath, "index.html");

if (fs.existsSync(cbaPistaIndexPath)) {
  expressApp.use("/cba_pista", express.static(cbaPistaBuildPath));
}

// 3. NEWS-DATA
const newsDataBuildPath = path.join(__dirname, "public", "news-data", "dist");
const newsDataIndexPath = path.join(newsDataBuildPath, "index.html");

if (fs.existsSync(newsDataIndexPath)) {
  expressApp.use("/news-data", express.static(newsDataBuildPath));
}

// 4. CONTROL-COMMERCE
const controlCommerceBuildPath = path.join(__dirname, "public", "control-commerce", "dist");
const controlCommerceIndexPath = path.join(controlCommerceBuildPath, "index.html");

if (fs.existsSync(controlCommerceIndexPath)) {
  expressApp.use("/control-commerce", express.static(controlCommerceBuildPath));
}

/* =========================
   SPA FALLBACK (para cba_pista como proyecto principal)
========================= */

// Si ninguna ruta coincide, redirige a cba_pista (proyecto principal)
expressApp.get("*", (req, res) => {
  if (fs.existsSync(cbaPistaIndexPath)) {
    res.sendFile(cbaPistaIndexPath);
  } else {
    res.status(404).send("Proyecto no encontrado");
  }
});

/* =========================
   START SERVER
========================= */

expressApp.listen(PORT, () => {
  console.log("Listen in PORT= " + PORT);
});