

// -----------   ELEMENTOS MODAL  ---------------------

const container_modal_confirm = document.querySelector('.container_modal_confirm');
const modal_res_rej = document.querySelector('.modal-res-rej');
const check_circle_icon = document.querySelector('.check-circle-icon')
const loading_failed_icon = document.querySelector('.loading-failed-icon')



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

   let petition = await fetch(`${URLQuery}/add_cliente`,{
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

   if(petition === 'Successfully loaded'){
      console.log('Funciona')
      let res = `
         <img class="check-circle-icon" src="../Assets/icons/check-circle.svg" alt="">
         <p>Successfully loaded</p>
      `
      modal_res_rej.innerHTML = res
      modal_res_rej.style.bottom = "3rem";
   }else{
      console.log('Funciona')

      let res =`
         <img class="loading-failed-icon" src="../Assets/icons/loading-failed.svg" alt="">
         <p>Loading failed</p>
      `
      modal_res_rej.innerHTML = res
      modal_res_rej.style.bottom = "3rem";
   }

   setTimeout(()=>{
      modal_res_rej.style.bottom = "-3rem";
   },"2500")

   console.log(petition);

};

btn_add_proveedor.addEventListener("click",()=>{
   addClient();
})