const params = new URLSearchParams(window.location.search);
const idPatient = params.get("id");
console.log("idPatient:", idPatient);

// ----------------- FETCHS -----------------

const dataPatient = async () => {
  const response = await fetch(`http://localhost:3111/record/${idPatient}`);
  const data = await response.json();
  return data;
};

const dataMeasure = async () => {
  const response = await fetch(`http://localhost:3111/worksheet/${idPatient}`);
  const data = await response.json();
  return data;
};

// ----------------- HEADER PACIENTE -----------------

const renderPatientHeader = patient => {
  if (!patient) return;

  const {
    id,
    first_name,
    last_name,
    email,
    plan,
    category,
    admission_date
  } = patient;

  const fullName = [first_name, last_name].filter(Boolean).join(" ");

  const bodyInformation = `
    <section class="patient-header">
      <div class="patient-header-left">
        <img src="../assets/avatar-bad-breaking.svg" alt="Avatar paciente" class="patient-avatar" />
        <div>
          <h2 class="patient-name">${fullName || "Patient name"}</h2>
          <p class="patient-email">${email || ""}</p>
          <div class="patient-tags">
            <span class="tag-pill tag-plan">Plan: ${plan || "-"}</span>
            <span class="tag-pill tag-category">Category: ${category || "-"}</span>
          </div>
        </div>
      </div>

      <div class="patient-header-right">
        <p class="patient-id">Patient ID: <span>${id ?? "-"}</span></p>
        <p class="patient-admission">
          Admission Date: <span>${admission_date ? String(admission_date).split("T")[0] : "-"}</span>
        </p>
      </div>
    </section>
    <nav class="patient-subnav">
      <a href="./worksheet.html?id=${idPatient}" class="subnav-item">WorkSheet</a>
      <a href="./ideal-weight.html?id=${idPatient}" class="subnav-item">Ideal Weight</a>
      <a href="./report.html?id=${idPatient}" class="subnav-item subnav-active">Report</a>
    </nav>`;
 
  const container = document.getElementById("section-information-patient");
  if (container) container.innerHTML = bodyInformation;
};

// ----------------- BLOQUE 2: MEDIDAS -----------------

const fillMeasuresFromRow = row => {
  if (!row) return;

  const spans = document.querySelectorAll(".measure-value[data-column]");

  spans.forEach(span => {
    const column = span.dataset.column; // ej: "peso_kg"
    const value = row[column];

    if (value === null || value === undefined) {
      span.textContent = "-";
    } else {
      span.textContent = value;
    }
  });
};

// ----------------- BLOQUE 3: ÍNDICES / COMPOSICIÓN -----------------

const calculateComposition = (row, gender) => {
  if (!row) return {};

  const toNum = v => (v === null || v === undefined ? NaN : Number(v));

  const weight   = toNum(row.peso_kg);
  const heightCm = toNum(row.talla);
  const waist    = toNum(row.cintura);
  const hip      = toNum(row.cadera);

  const tr  = toNum(row.triceps);
  const se  = toNum(row.sub_esc);
  const bi  = toNum(row.biceps);
  const ic  = toNum(row.cre_ili);
  const ss  = toNum(row.sup_esp);
  const ab  = toNum(row.abdominal);
  const mt  = toNum(row.mus_med);
  const cf  = toNum(row.pant_plie);
  const br  = toNum(row.br_rel); // perímetro brazo relajado (cm)

  const isMale = (gender || "").toLowerCase().startsWith("m");

  // BMI
  let bmi = null;
  if (!isNaN(weight) && !isNaN(heightCm) && heightCm > 0) {
    const h = heightCm * 0.01;
    bmi = Number((weight / (h * h)).toFixed(1));
  }

  // Waist / Hip
  let waistHipRatio = null;
  if (!isNaN(waist) && !isNaN(hip) && hip > 0) {
    waistHipRatio = Number((waist / hip).toFixed(2));
  }

  // Sum 6 skinfolds (triceps, subescapular, supraespinal, abdominal, muslo, pantorrilla)
  let sum6 = null;
  if (![tr, se, ss, ab, mt, cf].some(v => isNaN(v))) {
    sum6 = Number((tr + se + ss + ab + mt + cf).toFixed(1));
  }

  // ---------- Durnin & Womersley ----------
  let dwFatPercent = null;
  let dwFatMass = null;
  let dwLeanMass = null;

  if (![tr, se, bi, ic].some(v => isNaN(v)) && !isNaN(weight)) {
    const sum4 = tr + se + bi + ic;
    if (sum4 > 0) {
      const log10sum4 = Math.log10(sum4);
      const density = isMale
        ? 1.1765 - 0.0744 * log10sum4
        : 1.1567 - 0.0717 * log10sum4;

      if (density > 0) {
        dwFatPercent = Number(((495 / density) - 450).toFixed(1));
        dwFatMass    = Number((weight * dwFatPercent / 100).toFixed(1));
        dwLeanMass   = Number((weight - dwFatMass).toFixed(1));
      }
    }
  }

  // ---------- Yuhasz (athletes) ----------
  let yFatPercent = null;
  let yFatMass = null;
  let yLeanMass = null;

  if (!isNaN(sum6) && !isNaN(weight)) {
    const fatP = isMale
      ? 0.1051 * sum6 + 2.585
      : 0.1548 * sum6 + 3.58;

    yFatPercent = Number(fatP.toFixed(1));
    yFatMass    = Number((weight * yFatPercent / 100).toFixed(1));
    yLeanMass   = Number((weight - yFatMass).toFixed(1));
  }

  // ---------- Arm muscle area ----------
  let armMuscleArea = null;
  if (!isNaN(br) && !isNaN(tr)) {
    const armCircMm = br * 10; // cm -> mm
    const num = Math.pow(armCircMm - Math.PI * tr, 2);
    armMuscleArea = Number((num / (4 * Math.PI)).toFixed(0)); // mm²
  }

  return {
    bmi,
    waist_hip_ratio: waistHipRatio,
    sum6,
    dw_fat_percent : dwFatPercent,
    dw_fat_mass    : dwFatMass,
    dw_lean_mass   : dwLeanMass,
    yuhasz_fat_percent : yFatPercent,
    yuhasz_fat_mass    : yFatMass,
    yuhasz_lean_mass   : yLeanMass,
    arm_muscle_area    : armMuscleArea
  };
};

// ----------------- SOMATOTIPO: CÁLCULOS -----------------

const calculateSomatotype = row => {
  if (!row) return null;

  const toNum = v => (v === null || v === undefined ? NaN : Number(v));

  const peso     = toNum(row.peso_kg);
  const talla    = toNum(row.talla);      // cm
  const humeral  = toNum(row.humeral);    // diámetro biepicondilar húmero
  const femoral  = toNum(row.femoral);    // diámetro biepicondilar fémur
  const brFlex   = toNum(row.br_fle);     // perímetro brazo flexionado/tenso (cm)
  const pantMax  = toNum(row.pant_per);   // perímetro pantorrilla máxima (cm)

  const tr      = toNum(row.triceps);     // pliegues en mm
  const se      = toNum(row.sub_esc);
  const ss      = toNum(row.sup_esp);
  const pantPl  = toNum(row.pant_plie);

  // --- comprobación mínima ---
  if ([peso, talla, humeral, femoral, brFlex, pantMax, tr, se, ss, pantPl]
      .some(v => Number.isNaN(v))) {
    return null;
  }

  // ----------------- Fórmulas Heath–Carter -----------------

  // 1) sumatoria de pliegues y corrección por talla
  const sumatoriaPliegues = tr + se + ss;                       // mm
  const alturaEnCm        = 170.18 / talla;                     // factor de corrección
  const sumatoriaSF       = sumatoriaPliegues * alturaEnCm;     // mm corregidos

  // 2) perímetros corregidos (cm)
  const perCorrBrazo = brFlex  - tr     / 10;   // pliegue en cm
  const perCorrPant  = pantMax - pantPl / 10;

  // 3) índice HWR (Height–Weight Ratio)
  const raizCubicaPeso = Math.pow(peso, 0.33333);
  const HWR            = talla / raizCubicaPeso;

  // 4) ENDOMORFO (polinomio en sumatoriaSF)
  const endo = (() => {
    const x  = sumatoriaSF;
    const x2 = x * x;
    const x3 = Math.pow(x, 3);
    const val = -0.7182 + 0.1451 * x - 0.00068 * x2 + 0.0000014 * x3;
    return Number(val.toFixed(1));
  })();

  // 5) MESOMORFO
  const mesoRaw = 0.858 * humeral +
                  0.601 * femoral +
                  0.188 * perCorrBrazo +
                  0.161 * perCorrPant -
                  0.131 * talla +
                  4.5;
  const meso = Number(mesoRaw.toFixed(1));

  // 6) ECTOMORFO (por tramos según HWR)
  const ecto = (() => {
    let val;
    if (HWR <= 38.25)        val = 0.1;
    else if (HWR < 40.75)    val = 0.463 * HWR - 17.63;
    else                     val = 0.732 * HWR - 28.58;
    return Number(val.toFixed(1));
  })();

  // 7) Coordenadas somatocarta (sistema Heath–Carter)
  const xL = ecto - endo;
  const yL = 2 * meso - (ecto + endo);

  // Para el canvas 360x360 con centro en (180,180)
  const xCanvas = 180 + (xL * 180) / 9;   // escala -9..+9 → ancho
  const yCanvas = 180 - 18 * yL;          // 1 unidad somatotipo → 18 px

  return {
    endo,
    meso,
    ecto,
    xL,
    yL,
    xCanvas,
    yCanvas
  };
};

// ----------------- SOMATOTIPO: DIBUJO EN CANVAS -----------------

const drawSomatotypeBase = ctx => {
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 0.8;
  ctx.strokeStyle = "#555";

  // Triángulo redondeado (mismas arcs que informe.js)
  ctx.beginPath();
  ctx.arc(409, 321, 370, -2.23433, 3.17159, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(180, -33, 370, 1.186398, 1.96033, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-50, 320, 370, -0.025, 5.385433, true);
  ctx.stroke();

  // Líneas internas (regla)
  ctx.beginPath();
  ctx.moveTo(76, 160);
  ctx.lineTo(320, 310);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(282, 160);
  ctx.lineTo(40, 309);
  ctx.stroke();

  // Eje vertical central
  ctx.beginPath();
  ctx.moveTo(180, 30);
  ctx.lineTo(180, 338);
  ctx.stroke();
};

const drawSomatotypePoint = (ctx, somato) => {
  if (!somato) return;

  const { xL, yL } = somato;

  // Misma fórmula que informe.js
  const x = 180 + (xL * 180) / 9;
  const y = 180 - 18 * yL;

  ctx.fillStyle = "#1976d2";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
  ctx.fill();
};

const renderSomatotypeChart = somato => {
  const canvas = document.getElementById("somatotype-canvas");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");

  drawSomatotypeBase(ctx);
  if (somato) {
    drawSomatotypePoint(ctx, somato);
  }
};

const fillComposition = comp => {
  if (!comp) return;
  Object.entries(comp).forEach(([key, value]) => {
    const el = document.querySelector(`.comp-value[data-key="${key}"]`);
    if (!el) return;
    if (value === null || value === undefined || Number.isNaN(value)) {
      el.textContent = "-";
    } else {
      el.textContent = value;
    }
  });
};

// ----------------- CARGA GENERAL DEL REPORT -----------------

const loadReport = async () => {
  try {
    const [patientRes, measureRes] = await Promise.all([
      dataPatient(),
      dataMeasure()
    ]);

    const patient = Array.isArray(patientRes) ? patientRes[0] : patientRes;
    const row     = Array.isArray(measureRes) ? measureRes[0] : measureRes;

    if (patient) renderPatientHeader(patient);

    if (row) {
      // mezclamos: TODO viene de row,
      // pero peso_kg y talla se pisan con los de /record
      const compRow = {
        ...row,
        peso_kg: patient?.weight ?? row.peso_kg,
        talla  : patient?.height ?? row.talla
      };

      const gender = patient?.gender;

      // Bloque 2
      fillMeasuresFromRow(compRow);

      // Bloque 3
      const comp = calculateComposition(compRow, gender);
      fillComposition(comp);

      // Somatotipo
      const somato = calculateSomatotype(compRow);
      console.log("Somatotipo:", somato);

      renderSomatotypeChart(somato);
    }
  } catch (err) {
    console.error("Error loading report:", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (!idPatient) {
    console.error("No idPatient in query string");
    return;
  }
  loadReport();
});
