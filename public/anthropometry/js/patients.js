

const tbodyPatient = document.querySelector('.tbody-patient');


const result = async () => {
   const response = await fetch('http://localhost:3111/patient_data')
   const data = await response.json();
   return data
 
}





result().then(res => {
   res.forEach(pat => {
      const idPatient = pat.id
      const firstName = pat.first_name;
      const lastName  = pat.last_name;
      const email     = pat.email;
      const category  = pat.category;

      console.log(pat)

      const rowTable = `
              <div class="row-table">
                <label class="custom-checkbox">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <div class="div-row-table cont-name">
                  <img src="../assets/avatar-bad-breaking.svg" alt="Avatar paciente" />
                  <article>
                    <div>${firstName} ${lastName}</div>
                    <span>${email}</span>
                  </article>
                </div>
                <div class="div-row-table">2024-11-10</div>
                <div class="div-row-table">Paid</div>
                <div class="div-row-table">Premium</div>
                <div class="div-row-table">${category}</div>
                <a href="./records.html?id=${idPatient}" class="div-row-table row-link">
                  <p>Archivo</p>
                  <img src="../assets/icons/link-external.svg" alt="Ver archivo" />
                </a>
              </div>
      `

      tbodyPatient.innerHTML += rowTable;
   })
})


