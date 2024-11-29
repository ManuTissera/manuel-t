

// -------- ELEMENTOS FORMULARIO  --------------------------- 

const input_form_add_name = document.querySelector('.input_form_add_name');
const input_form_add_razon = document.querySelector('.input_form_add_razon');
const input_form_add_cuit = document.querySelector('.input_form_add_cuit');
const select_form_add_regimen = document.querySelector('.select_form_add_regimen');
const input_form_add_direction = document.querySelector('.input_form_add_direction');
const input_form_add_phone = document.querySelector('.input_form_add_phone');
const input_form_add_email = document.querySelector('.input_form_add_email');
const input_form_add_dateIng = document.querySelector('.input_form_add_dateIng');
const btn_add_proveedor = document.querySelector('.btn_add_proveedor');

const URLQuery = window.location.origin;
console.log(URLQuery)


const addClient = async () =>{

   let name = input_form_add_name.value;
   let razon = input_form_add_razon.value;
   let cuit = input_form_add_cuit.value;
   let regimen = select_form_add_regimen.value;
   let direction = input_form_add_direction.value;
   let phone = input_form_add_phone.value;
   let email = input_form_add_email.value;
   let dateIng = input_form_add_dateIng.value;

   let dataUpLoad = `

      "name" = ${name},
      "razon" = ${razon},
      "cuit" = ${cuit},
      "regimen" = ${regimen},
      "direction" = ${direction},
      "phone" = ${phone},
      "email" = ${email},
      "dateIng" = ${dateIng},
   
   `
   console.log(dataUpLoad);

   let result = await fetch(`${URLQuery}/add_cliente`,{
      method: 'POST',
      body: JSON.stringify({
               "name": `${name}`,
               "razon": `${razon}`,
               "cuit": `${cuit}`,
               "regimen": `${regimen}`,
               "direction": `${direction}`,
               "phone": `${phone}`,
               "email": `${email}`,
               "dateIng": `${dateIng}`,
         }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(result);

};

btn_add_proveedor.addEventListener("click",()=>{
   addClient();
})