import express from "express";
import connection from "./connectionBBDD.js";

const routerApp = express.Router();

const allowedColumns = [
  "pes_bru", "ta_cor", "humeral", "femoral", "br_rel", "br_fle",
  "cintura", "cadera", "pant_per", "triceps", "sub_esc", "cre_ili", "biceps",
  "sup_esp", "abdominal", "mus_med", "pant_plie",
  "peso_kg", "talla", "mediana"
];

const measurementColumns = [
  "pes_bru", "ta_cor", "humeral", "femoral", "br_rel", "br_fle",
  "cintura", "cadera", "pant_per", "triceps", "sub_esc", "cre_ili", "biceps",
  "sup_esp", "abdominal", "mus_med", "pant_plie",
  "peso_kg", "talla"
];

// helper para calcular mediana de un array numérico
function calcMedian(values) {
  const nums = values
    .filter(v => v !== null && v !== undefined)
    .map(v => Number(v))
    .filter(v => !Number.isNaN(v));

  if (nums.length === 0) return null;

  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    return (nums[mid - 1] + nums[mid]) / 2;
  } else {
    return nums[mid];
  }
}

// ====================== WORKSHEET ======================

routerApp.get("/worksheet/:guid", async (req, res) => {
  const { guid } = req.params;

  try {
    const query = `
      SELECT *
      FROM measurements_ant
      WHERE patient_id = $1
      ORDER BY series;
    `;
    const result = await connection.query(query, [guid]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching measurements_ant");
  }
});

// ====================== PATIENT DATA (LIST) ======================

routerApp.get("/patient_data", async (req, res) => {
  try {
    const query = `SELECT * FROM patient_data_ant ORDER BY id DESC;`;
    const result = await connection.query(query);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patient_data_ant");
  }
});

// ====================== ADD PROFILE ======================

routerApp.post("/patient_data/add_profile", async (req, res) => {
  const {
    first_name,
    last_name,
    age,
    height,
    weight,
    birth_date,
    gender,
    category,
    plan,
    email,
    phone,
    address,
    nationalId
  } = req.body;

  try {
    const required = [
      first_name,
      last_name,
      gender,
      birth_date,
      nationalId,
      height,
      weight
    ];

    if (required.some(v => !v || v === "")) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    const checkQuery = `
      SELECT 1
      FROM patient_data_ant
      WHERE nationalId = $1;
    `;
    const checkResult = await connection.query(checkQuery, [nationalId]);

    if (checkResult.rowCount > 0) {
      return res
        .status(409)
        .json({ ok: false, error: "Profile already exists" });
    }

    const query = `
      WITH new_patient AS (
        INSERT INTO patient_data_ant (
          first_name, last_name, age, height, weight,
          birth_date, admission_date, gender, category,
          plan, email, phone, address, nationalId
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, CURRENT_DATE, $7,
          $8, $9, $10, $11, $12, $13
        )
        RETURNING id
      )
      INSERT INTO measurements_ant (patient_id, series, measurement_date)
      SELECT id, series_num, CURRENT_DATE
      FROM new_patient,
      LATERAL (VALUES (1), (2), (3), (4), (5), (6)) AS s(series_num);
    `;

    const values = [
      first_name,
      last_name,
      age,
      height,
      weight,
      birth_date,
      gender,
      category,
      plan,
      email,
      phone,
      address,
      nationalId
    ];

    await connection.query(query, values);
    return res.send({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error saving patient_data_ant");
  }
});

// ====================== RECORD PAGE (ONE PATIENT) ======================

routerApp.get("/record/:guid", async (req, res) => {
  const { guid } = req.params;

  try {
    const query = `SELECT * FROM patient_data_ant WHERE id = $1;`;
    const result = await connection.query(query, [guid]);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patient_data_ant");
  }
});

// ====================== INSERT / UPDATE MEASUREMENT ======================

routerApp.post("/measurement", async (req, res) => {
  const { patient_id, series, variable, value } = req.body;

  try {
    // columnas permitidas
    if (!allowedColumns.includes(variable)) {
      return res.status(400).json({ error: "Invalid column name" });
    }

    const query = `
      INSERT INTO measurements_ant (patient_id, series, ${variable})
      VALUES ($1, $2, $3)
      ON CONFLICT (patient_id, series)
      DO UPDATE SET
        ${variable} = EXCLUDED.${variable},
        measurement_date = NOW();
    `;

    const values = [patient_id, series, value];
    await connection.query(query, values);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving measurement");
  }
});

// ====================== DELETE CELL (SET NULL) ======================

routerApp.post("/measurement/delete-cell", async (req, res) => {
  const { patient_id, series, variable } = req.body;

  try {
    if (!allowedColumns.includes(variable)) {
      return res.status(400).json({ error: "Invalid column name" });
    }

    const query = `
      UPDATE measurements_ant
      SET ${variable} = NULL
      WHERE patient_id = $1
        AND series = $2;
    `;

    const values = [patient_id, series];
    await connection.query(query, values);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting cell");
  }
});

// ====================== RECALC MEDIAN (series = 6) ======================

routerApp.post("/measurement/recalc-median", async (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ error: "patient_id required" });
  }

  try {
    // 1) obtener TODAS las series del paciente excepto serie 6 (mediana)
    const selectQuery = `
      SELECT series, ${measurementColumns.join(", ")}
      FROM measurements_ant
      WHERE patient_id = $1 AND series <> 6
      ORDER BY series;
    `;

    const { rows } = await connection.query(selectQuery, [patient_id]);

    // si no hay series cargadas todavía
    if (rows.length === 0) {
      return res.json({ ok: true, medians: null });
    }

    // 2) calcular medianas por variable
    const medians = {};
    measurementColumns.forEach(col => {
      const vals = rows.map(r => r[col]);
      medians[col] = calcMedian(vals);
    });

    // 3) UPSERT de la fila MEDIANA (series = 6)
    const insertColumns = ["patient_id", "series", ...measurementColumns, "measurement_date"];
    const placeholders = insertColumns.map((_, i) => `$${i + 1}`).join(", ");

    const values = [
      patient_id,
      6, // serie mediana
      ...measurementColumns.map(col => medians[col]),
      new Date() // measurement_date
    ];

    const updateSet = [
      ...measurementColumns.map(col => `${col} = EXCLUDED.${col}`),
      "measurement_date = EXCLUDED.measurement_date"
    ].join(", ");

    const upsertQuery = `
      INSERT INTO measurements_ant (${insertColumns.join(", ")})
      VALUES (${placeholders})
      ON CONFLICT (patient_id, series)
      DO UPDATE SET ${updateSet};
    `;

    await connection.query(upsertQuery, values);

    res.json({ ok: true, medians });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error recalculating medians");
  }
});

export default routerApp;
