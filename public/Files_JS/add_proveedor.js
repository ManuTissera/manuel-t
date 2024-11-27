

// -----------   ELEMENTOS MODAL  ---------------------

const container_modal_confirm = document.querySelector('.container_modal_confirm');

// -----------  ELEMENTOS FORMULARIO   --------------------

const input_form_prov_name = document.querySelector('.input_form_prov_name');
const input_form_prov_razon = document.querySelector('.input_form_prov_razon');
const input_form_prov_cuit = document.querySelector('.input_form_prov_cuit');
const input_form_prov_direction = document.querySelector('.input_form_prov_direction');
const input_form_prov_phone = document.querySelector('.input_form_prov_phone');
const input_form_prov_email = document.querySelector('.input_form_prov_email');
const btn_add_proveedor = document.querySelector('.btn_add_proveedor');


const URLQuery = `http://localhost:3210`;


const addProvFn = async () =>{

   let petition = await fetch(`${URLQuery}/add_proveedor`,{
      method: 'POST',
      header: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data)

   let nameProv = input_form_prov_name.value;
   let razon = input_form_prov_razon.value;
   let cuit = input_form_prov_cuit.value;
   let direction = input_form_prov_direction.value;
   let phone = input_form_prov_phone.value;
   let email = input_form_prov_email.value;
   

   let result = `
   "nameProv" : ${nameProv},
   "razon" : ${razon},
   "cuit" : ${cuit},
   "direction" : ${direction},
   "phone" : ${phone},
   "email" : ${email},

   `
   console.log(result)
   console.log(petition)

}

const btnAceptFn = () =>{
   addProvFn()
   
   container_modal_confirm.innerHTML = '';
}

const btnCancelFn = () =>{
   container_modal_confirm.innerHTML = '';

}


btn_add_proveedor.addEventListener("click",()=>{


   let nameProv = input_form_prov_name.value;
   let razon = input_form_prov_razon.value;
   let cuit = input_form_prov_cuit.value;
   let direction = input_form_prov_direction.value;
   let phone = input_form_prov_phone.value;
   let email = input_form_prov_email.value;


   let modalConfirm = `
   
   <div class="background_opacity b_o_modal_confirm">
      <div class="modal-confirm modal_confirm">
         <div class="circle-container-icon">
            <img class="img_add_person" src="../Assets/icons/person_add-40px.svg" alt="">
         </div>
         <h4 class="h4-modal-confirm">Nuevo Proveedor</h4>
         <p class="p_msg_confirm_add_prov"><b>Nombre: </b>${nameProv}</p>
         <p class="p_msg_confirm_add_prov"><b>Razon Social: </b>${razon}</p>
         <p class="p_msg_confirm_add_prov"><b>CUIT: </b>${cuit}</p>
         <p class="p_msg_confirm_add_prov"><b>Direccion: </b>${direction}</p>
         <p class="p_msg_confirm_add_prov"><b>Telefono: </b>${phone}</p>
         <p class="p_msg_confirm_add_prov"><b>e-mail: </b>${email}</p>
         <article class="article-btn-modal-confirm">
            <button class="button-modal-confirm btn_cancel_add" onclick="btnCancelFn()">Cancelar</button>
            <button class="button-modal-confirm btn_acept_add" onclick="btnAceptFn()">Agregar</button>
         </article>       
      </div>
   </div>
   
   `

   container_modal_confirm.innerHTML = modalConfirm;

})
