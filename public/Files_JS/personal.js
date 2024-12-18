
const background_opacity = document.querySelector('.background_opacity');

const container_body_table = document.querySelector('.container_body_table');
const href_text = document.querySelector('a[name="personal"]')

// --------- ELEMENTOS MODAL  -----------------------------

const btn_del_personal = document.querySelector('.btn_del_personal');
const container_modal_confirmacion = document.querySelector('.container_modal_confirmacion');
const modal_res_rej = document.querySelector('.modal-res-rej');
const check_circle_icon = document.querySelector('.check-circle-icon')
const loading_failed_icon = document.querySelector('.loading-failed-icon')


// --------- ELEMENTOS FORMULARIO  -----------------------------

const form_add_personal = document.querySelector('.form_add_personal');
const btn_add_personal = document.querySelector('.btn_add_personal');
const btn_form_cancel = document.querySelector('.btn_form_cancel');
const btn_form_add_personal = document.querySelector('.btn_form_add_personal');

const input_date = document.querySelector('.input_date');
const input_name = document.querySelector('.input_name');
const input_surname = document.querySelector('.input_surname');
const select_role = document.querySelector('.select_role');
const input_phone = document.querySelector('.input_phone');
const input_direction = document.querySelector('.input_direction');

const URLQuery = window.location.origin;
href_text.style.backgroundColor = '#f0f5fb';

const getDataPersonal = async () =>{

   container_body_table.innerHTML = '';

   let petition = await fetch(`${URLQuery}/view_personal`).then(res=>res.json()).then(data=>data);


   petition.forEach(personal =>{
         let id_personal = personal.id_personal;
         let nombre = personal.nombre;
         let apellido = personal.apellido;
         let cargo = personal.cargo;
         let fecha_ingreso = personal.fecha_ingreso;
         let telefono = personal.telefono;
         let direccion = personal.direccion;
         //let linkEdit = `table:personal~id_personal:${id_personal}~nombre:${nombre}~apellido:${apellido}~cargo:${cargo}~telefono:${telefono}~direccion:${direccion}`;
         let linkEdit = `table:personal~id_personal:${id_personal}`;


         console.log(linkEdit);
         let nodeLi = document.createElement("LI");
         nodeLi.classList.add("row_body_table");

         nodeLi.innerHTML =`
               
                  <div class="div_row_table"><input value=${id_personal} name="checkPersonal" type="checkbox"></div>
                  <div class="div_row_table">${nombre}</div>
                  <div class="div_row_table">${apellido}</div>
                  <div class="div_row_table">${cargo}</div>
                  <div class="div_row_table">2020-01-15</div>
                  <div class="div_row_table">${telefono}</div>
                  <div class="div_row_table">${direccion}</div>
                  <a href="./edit_files.html?${linkEdit}" class="div_row_table"><img src="../Assets/icons/edit_caja.svg" alt=""></a>
                  
               
         
         `;

         container_body_table.appendChild(nodeLi);
   })
}


const addMemberFn = async () =>{

   let date = input_date.value;
   let namePersonal = input_name.value;
   let surname = input_surname.value;
   let role = select_role.value;
   let phone = input_phone.value;
   let direction = input_direction.value;

   let results = `

      "date" = ${date},
      "name" = ${namePersonal},
      "surname" = ${surname},
      "role" = ${role},
      "phone" = ${phone},
      "direction" = ${direction},
   
   `

   console.log(results);

   let petition = await fetch(`${URLQuery}/add_personal`,{
      method: 'POST',
      body: JSON.stringify({

         "date" : `${date}`,
         "namePersonal" : `${namePersonal}`,
         "surname" : `${surname}`,
         "role" : `${role}`,
         "phone" : `${phone}`,
         "direction" : `${direction}`,
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

   getDataPersonal();

}

const getBoxSelected = () =>{
   
   const boxChecked = document.querySelectorAll('input[name="checkPersonal"]:checked');

   const valuesSelected = Array.from(boxChecked).map(checkbox => checkbox.value);

   return valuesSelected;
}
const btnModalCancel = () =>{
   container_modal_confirmacion.innerHTML = '';
}
const btnModalAcept = async (IDs) =>{

   let petition = await fetch(`${URLQuery}/delete_element`,{
      method: 'DELETE',
      body: JSON.stringify({
         "idDelete":IDs,
         "idColumn":'id_personal',
         "tabla":'personal',
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

   container_modal_confirmacion.innerHTML = '';

   getDataPersonal();
}


btn_del_personal.addEventListener("click",()=>{

   
   let h4Text = '';
   let pText  = '';
   let elementSelect = getBoxSelected().join().replaceAll(","," - ");

   if(getBoxSelected().length == 0){
      h4Text = 'Selecciona algun elemento';
      console.log(h4Text)
   }else if ( getBoxSelected() == 1){
      h4Text = 'Quitar Colega'
      pText = 'Eliminar el elemento con ID: ' + elementSelect;
      console.log(h4Text)
   }else{
      h4Text = 'Quitar Colegas'
      pText = 'Eliminar los elementos con ID: ' + elementSelect;
      console.log(h4Text)
   }

      console.log(getBoxSelected())
      console.log(getBoxSelected().join().replaceAll(",","-"))

      const modal_conf = `
      
            <div class="background_opacity_modal b_o_modal_confirm">
               <div class="modal-confirm modal_confirm">
                  <div class="circle-warning">
                     <img class="img-circle-warning" src="../Assets/icons/circle_warning.svg" alt="">
                 </div>
                 <h4 class="h4-modal-confirm">${h4Text}</h4>
                 <p class="p-msg-confirm">${pText}</p>
                 <article class="article-btn-modal-confirm">
                     <button class="button-modal-confirm btn_cancel_del" onclick="btnModalCancel()" >Cancelar</button>
                     <button class="button-modal-confirm btn-modal-del" ">Eliminar</button>
                 </article>       
               </div>
            </div>
      
      `
      container_modal_confirmacion.innerHTML = modal_conf;

      const btn_modal_del = document.querySelector('.btn-modal-del');      
      btn_modal_del.addEventListener("click",()=>{
         btnModalAcept(getBoxSelected().join())
      })

})


btn_add_personal.addEventListener("click",()=>{
   background_opacity.style.display = "flex";
   form_add_personal.style.right = "0rem";
})
btn_form_cancel.addEventListener("click",()=>{
   background_opacity.style.display = "none";
   form_add_personal.style.right = "-100%";
})
btn_form_add_personal.addEventListener("click",()=>{

   addMemberFn();

   background_opacity.style.display = "none";
   form_add_personal.style.right = "-100%";
})


getDataPersonal();


