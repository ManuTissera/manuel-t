
// td.addEventListener("click", () => input.focus());
// input.addEventListener("blur", () => {
//     // el usuario dejó la celda, el valor queda insertado automáticamente
// });
const params = new URLSearchParams(window.location.search);
const idPatient = params.get("id");
console.log("idPatient:", idPatient);

// Traer datos de la BBDD
const dataFetch = async () => {
  const response = await fetch(`http://localhost:3111/worksheet/${idPatient}`);
  const data = await response.json();
  return data;
};

const insertMeasure = (idPatient, serie, variable, value) => {
  return fetch("http://localhost:3111/measurement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patient_id: idPatient,
      series: serie,
      variable,
      value
    })
  });
};

const deleteMeasure = (idPatient, serie, variable) => {
  return fetch(`http://localhost:3111/measurement/delete-cell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patient_id: idPatient,
      series: serie,
      variable
      
    })
  });
};

const recalcMedian = (idPatient) => {
  return fetch(`http://localhost:3111/measurement/recalc-median`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patient_id: idPatient })   // ← agregado
  });
};

const dataPatient = async () => {
   const response = await fetch(`http://localhost:3111/record/${idPatient}`);
   const data = await response.json();
   return data;
}

dataPatient().then(res => {

   const id = res.id;
   const first_name = res.first_name;
   const last_name = res.last_name;
   const age = res.age;
   const height = res.height;
   const weight = res.weight;
   const birth_date = res.birth_date;
   const admission_date = res.admission_date;
   const gender = res.gender;
   const category = res.category;
   const plan = res.plan;
   const email = res.email;
   const phone = res.phone;
   const direction = res.direction;


   const bodyInformation = `
      <section class="patient-header">
        <div class="patient-header-left">
          <img src="../assets/avatar-bad-breaking.svg" alt="Avatar paciente" class="patient-avatar" />
          <div>
            <h2 class="patient-name">${first_name} ${last_name}</h2>
            <p class="patient-email">${email}</p>
            <div class="patient-tags">
              <span class="tag-pill tag-plan">Plan: ${plan}</span>
              <span class="tag-pill tag-category">Category: ${category}</span>
            </div>
          </div>
        </div>

        <div class="patient-header-right">
          <p class="patient-id">Patient ID: <span>${id}</span></p>
          <p class="patient-admission">
            Admission Date: <span>${admission_date.split('T')[0]}</span>
          </p>
        </div>

        
      </section>
      <nav class="patient-subnav">
        <a href="./worksheet.html?id=${id}" class="subnav-item subnav-active">WorkSheet</a>
        <a href="./ideal-weight.html?id=${id}" class="subnav-item">Ideal Weight</a>
        <a href="./report.html?id=${id}" class="subnav-item">Report</a>
      </nav>
      `

   document.getElementById("section-information-patient").innerHTML = bodyInformation;
})


// Rellenar la tabla con los datos de la BBDD
dataFetch().then(res => {
  console.log("res:", res);

  // res = array de series (1..5)
  res.forEach(serieObj => {
    const serie = String(serieObj.series); // ej: "1", "2", ...

    Object.entries(serieObj).forEach(([key, value]) => {
      // ignorar campos que no son mediciones
      if (key === "id" || key === "id_patient" || key === "series") return;
      if (value == null || value === "") return;

      const selector = `[data-variable="${key}"][data-serie="${serie}"] .cell-input`;
      const input = document.querySelector(selector);

      if (input) {
        input.value = value;
      }
    });
  });
});

const inputs = document.querySelectorAll(".cell-input");

inputs.forEach(inp => {
  inp.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const td = inp.closest("td");
    const variable = td.dataset.variable;
    const serie = td.dataset.serie;
    const value = inp.value.trim();

    // no tocar la columna de mediana a mano
    if (!serie || serie === "mediana") {
      inp.blur();
      return;
    }

    if (value === "") {
      // borrar medida
      deleteMeasure(idPatient, serie, variable)
        .then(res => {
          console.log("delete:", res.status);
          if (res.status === 200) {
            return recalcMedian(idPatient);
          }
        })
        .then(r => {
          if (r) console.log("Median recalculated:", r.status);
        })
        .catch(err => console.error("error:", err));
    } else {
      // insertar / actualizar medida
      insertMeasure(idPatient, serie, variable, value)
        .then(res => {
          console.log("insert:", res.status);
          if (res.status === 200) {
            return recalcMedian(idPatient);
          }
        })
        .then(r => {
          if (r) console.log("Median recalculated:", r.status);
        })
        .catch(err => console.error("error:", err));
    }

    inp.blur();
  });
});







