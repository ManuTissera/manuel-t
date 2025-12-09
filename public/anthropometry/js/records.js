

const params = new URLSearchParams(window.location.search);
const idPatient = params.get("id")
console.log(idPatient)

const dataFetch = async () => {
   const response = await fetch(`http://localhost:3111/record/${idPatient}`);
   const data = await response.json();
   return data;
}

dataFetch().then(res => {

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
        <a href="./worksheet.html?id=${id}" class="subnav-item subnav-active">WorkSheet#</a>
        <a href="./ideal-weight.html?id=${id}" class="subnav-item">Ideal Weight</a>
        <a href="./report.html?id=${id}" class="subnav-item">Report</a>
      </nav>

      <section class="patient-detail-section">

        <article class="patient-card">
          <h3>Personal Information</h3>
          <div class="patient-info-grid">
            <div class="info-item">
              <span class="info-label">First Name</span>
              <span class="info-value">${first_name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Last Name</span>
              <span class="info-value">${last_name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Gender</span>
              <span class="info-value">${gender}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Birth Date</span>
              <span class="info-value">${birth_date.split("T")[0]}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Age</span>
              <span class="info-value">${age ?? ""}</span>
            </div>
          </div>
        </article>

        <article class="patient-card">
          <h3>Contact</h3>
          <div class="patient-info-grid">
            <div class="info-item">
              <span class="info-label">Phone</span>
              <span class="info-value">${phone}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Address</span>
              <span class="info-value">${direction}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">${email}</span>
            </div>
          </div>
        </article>

        <article class="patient-card">
          <h3>Basic Clinical Data</h3>
          <div class="patient-info-grid">
            <div class="info-item">
              <span class="info-label">Category</span>
              <span class="info-value">${category}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Plan</span>
              <span class="info-value">${plan}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Height</span>
              <span class="info-value">${height} cm</span>
            </div>
            <div class="info-item">
              <span class="info-label">Weight</span>
              <span class="info-value">${weight} kg</span>
            </div>
          </div>
        </article>

      </section>
   `;

   document.getElementById("section-information-patient").innerHTML = bodyInformation;
});
