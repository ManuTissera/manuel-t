
const background_opacity = document.querySelector('.background_opacity');

const aside = document.querySelector('.aside');
const menu_burger = document.querySelector('.menu_burger');
const close_aside = document.querySelector('.close_aside');
const container_body_table = document.querySelector('.container_body_table');
const href_text = document.querySelector('a[name="ventas"]')


// ----------- ELEMENTOS FORMULARIO -------------------------

const form_add_caja = document.querySelector('.form_add_caja');
const btn_add_caja = document.querySelector('.btn_add_caja');
const btn_form_cancel = document.querySelector('.btn_form_cancel');
const btn_form_add_caja = document.querySelector('.btn_form_add_caja');

const input_form_cajas_date = document.querySelector('.input_form_cajas_date');
const select_form_cajas_titular = document.querySelector('.select_form_cajas_titular');
const select_form_cajas_comercio = document.querySelector('.select_form_cajas_comercio');
const input_form_caja_efectivo = document.querySelector('.input_form_caja_efectivo');
const input_form_cajas_tarjeta = document.querySelector('.input_form_cajas_tarjeta');
const input_form_cta_cte = document.querySelector('.input_form_cta_cte');

// -----------  ELEMENTOS MODAL ------------------------------

const container_modal_confirmacion = document.querySelector('.container_modal_confirmacion');
const btn_del_caja = document.querySelector('.btn_del_caja');

const URLQuery = window.location.origin;
console.log(URLQuery);
href_text.style.backgroundColor = '#f0f5fb';



const getDataCaja = async () =>{

   container_body_table.innerHTML = '';

   let petition = await fetch(`${URLQuery}/view_caja`).then(res=>res.json()).then(data=>data);


   petition.forEach(caja =>{

         let id = caja.id;
         let fecha = caja.fecha;
         let personal = caja.personal;
         let comercio = caja.comercio;
         let efectivo = caja.venta_efectivo;
         let tarjeta = caja.venta_tarjeta;
         let cta_cte = caja.venta_cuenta_corriente;
         let linkEdit = `tabla:ventas~id:${id}`;
         // let linkEdit = `tabla:ventas~id:${id}~fecha:${fecha}~personal:${personal}
         // ~comercio:${comercio}~venta_efectivo:${efectivo}~venta_tarjeta:${tarjeta}~venta_cuenta_corriente:${cta_cte}`;




         let nodeLi = document.createElement("LI");
         nodeLi.classList.add("row_body_table");

         nodeLi.innerHTML =`
         
                  <div class="div_row_table"><input value=${id} name="checkCaja" type="checkbox"></div>
                  <div class="div_row_table">2022-04-30</div>
                  <div class="div_row_table">${personal}</div>
                  <div class="div_row_table">${comercio}</div>
                  <div class="div_row_table">${efectivo}</div>
                  <div class="div_row_table">${tarjeta}</div>
                  <div class="div_row_table">${cta_cte}</div>
                  <a href="./edit_files.html?${linkEdit}"  class="div_row_table"><img src="../Assets/icons/edit_caja.svg" alt=""></a>
               
         `;

         container_body_table.appendChild(nodeLi);
   })

}

const addCajaFn = async () =>{

   const input_turno = document.querySelectorAll('input[name="turno"]:checked');
   const valueTurn = Array.from(input_turno).map(turn => turn.value);

   let date = input_form_cajas_date.value;
   let titular = select_form_cajas_titular.value;
   let comercio = select_form_cajas_comercio.value;
   let efectivo = input_form_caja_efectivo.value;
   let tarjeta = input_form_cajas_tarjeta.value;
   let ctaCte = input_form_cta_cte.value;

   let result = `
   
         "date": ${date},
         "turno": ${valueTurn[0]},
         "titular": ${titular},
         "comercio": ${comercio},
         "efectivo": ${efectivo},
         "tarjeta": ${tarjeta},
         "ctaCte": ${ctaCte},
   
   `;

   let petition = await fetch(`${URLQuery}/add_caja`,{
      method: 'POST',
      body: JSON.stringify({

         "date": `${date}`,
         "turno": `${valueTurn[0]}`,
         "titular": `${titular}`,
         "comercio": `${comercio}`,
         "efectivo": `${efectivo}`,
         "tarjeta": `${tarjeta}`,
         "ctaCte": `${ctaCte}`,         

      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);
   getDataCaja();

}


const getBoxSelected = () => {

   const boxChecked = document.querySelectorAll('input[name="checkCaja"]:checked');

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
         "idColumn":'id',
         "tabla":'ventas',
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

   container_modal_confirmacion.innerHTML = '';

   getDataCaja();
}


btn_del_caja.addEventListener("click",()=>{

   let h4Text = '';
   let pText  = '';
   let elementSelect = getBoxSelected().join().replaceAll(","," - ");

   if(getBoxSelected().length == 0){
      h4Text = 'Selecciona algun elemento';
      console.log(h4Text)
   }else if ( getBoxSelected() == 1){
      h4Text = 'Eliminar Proveedor'
      pText = 'Eliminar el elemento con ID: ' + elementSelect;
      console.log(h4Text)
   }else{
      h4Text = 'Eliminar Proveedores'
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

});

btn_add_caja.addEventListener("click",()=>{
   background_opacity.style.display = "flex";
   form_add_caja.style.right = "0rem";
})
btn_form_cancel.addEventListener("click",()=>{
   background_opacity.style.display = "none";
   form_add_caja.style.right = "-100%";
})
btn_form_add_caja.addEventListener("click",()=>{

   addCajaFn();

   background_opacity.style.display = "none";
   form_add_caja.style.right = "-100%";
})

menu_burger.addEventListener("click",()=>{
   aside.style.left = "0rem";
})
close_aside.addEventListener("click",()=>{
   aside.style.left = "-100%";   
})


getDataCaja();

