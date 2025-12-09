
const params = new URLSearchParams(window.location.search);
const idPatient = params.get("id");
console.log("idPatient:", idPatient);



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
      </section>`

   document.getElementById("section-information-patient").innerHTML = bodyInformation;
})