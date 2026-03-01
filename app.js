console.clear();

import express from "express";
import routerRequest from "./Routes/routes.js";
import routerApp from "./Routes/routes-anthropometry.js";
import requestRouterData from "./Routes/routes-news-data.js";
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

expressApp.use("/", requestRouterData);
expressApp.use("/", routerRequest);
expressApp.use("/", routerApp);

/* =========================
   STATIC FILES (GENERAL PUBLIC)
========================= */

expressApp.use(express.static(path.join(__dirname, "public")));

/* =========================
   SERVE REACT BUILD (cba_pista)
========================= */

const clientBuildPath = path.join(__dirname, "public", "cba_pista", "dist");
const clientIndexPath = path.join(clientBuildPath, "index.html");

// Only activate if build exists
if (fs.existsSync(clientIndexPath)) {

  // Serve built React files
  expressApp.use(express.static(clientBuildPath));

  // SPA fallback (React Router support)
  expressApp.get("*", (req, res) => {
    res.sendFile(clientIndexPath);
  });

}

/* =========================
   START SERVER
========================= */

expressApp.listen(PORT, () => {
  console.log("Listen in PORT= " + PORT);
});