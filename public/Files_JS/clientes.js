

const aside = document.querySelector('.aside');
const menu_burger = document.querySelector('.menu_burger');
const close_aside = document.querySelector('.close_aside');
const href_text = document.querySelector('a[name="clientes"]')

// -------  ELEMENTOS MODAL ----------------------------

const container_modal_confirmacion = document.querySelector('.container_modal_confirmacion');
const btn_del_client = document.querySelector('.btn_del_client');


// -------- ELEMENTOS MODAL  --------------------------- 

const container_body_table = document.querySelector('.container_body_table');


const URLQuery = `http://localhost:3210`;
href_text.style.backgroundColor = '#f0f5fb';

const getDataClient = async () =>{

   container_body_table.innerHTML = '';

   let result = await fetch(`${URLQuery}/view_clientes`).then(res=>res.json()).then(data=>data);

   result.forEach(client =>{

      let id = client.id_cliente;
      let nameClient = client.nombre_fantacia_cl;
      let razon = client.razon_social_cl;
      let cuit = client.cuit_cl;
      let direction = client.direccion_cl;
      let phone = client.telefono_cl;
      let email = client.email_cl;
      let dateIng = client.fecha_ingreso_cl;
      let regimen = client.facturacion;
      let linkEdit = `table:clientes~id_cliente:${id}`

         const nodeLi = document.createElement("LI");
         nodeLi.classList.add("row_body_table");

            nodeLi.innerHTML = `
                        <div class="div_row_table"><input value=${id} name="checkClient" type="checkbox"></div>       
                        <div class="div_row_table">${nameClient}</div>
                        <div class="div_row_table">${razon}</div>
                        <div class="div_row_table">${cuit}</div>
                        <div class="div_row_table">${direction}</div>
                        <div class="div_row_table">${phone}</div>
                        <div class="div_row_table">${email}</div>
                        <div class="div_row_table">27-09-2022</div>
                        <div class="div_row_table">${regimen}</div>
                        <a href="./edit_files.html?${linkEdit}"  class="div_row_table"><img src="../Assets/icons/edit_caja.svg" alt=""></a>

            `
            container_body_table.appendChild(nodeLi); 

   })

}

const getBoxSelected = () => {

   const boxChecked = document.querySelectorAll('input[name="checkClient"]:checked');

   const valuesSelected = Array.from(boxChecked).map(checkbox => checkbox.value);
   
   return valuesSelected;
 };

const btnModalCancel = () =>{

   container_modal_confirmacion.innerHTML = '';
}
const btnModalAcept = async (IDs) =>{

   let petition = await fetch(`${URLQuery}/delete_element`,{
      method: 'DELETE',
      body: JSON.stringify({
         "idDelete":IDs,
         "idColumn":'id_cliente',
         "tabla":'clientes',
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

   container_modal_confirmacion.innerHTML = '';

   getDataClient();
}


btn_del_client.addEventListener("click",()=>{

   let h4Text = '';
   let pText  = '';
   let elementSelect = getBoxSelected().join().replaceAll(","," - ");
   let elementNum = getBoxSelected()


   if(elementSelect.length == 0){
      h4Text = 'Selecciona algun elemento';
   }else if ( elementSelect.length == 1){
      h4Text = 'Eliminar Proveedor'
      pText = 'Eliminar el elemento con ID: ' + elementSelect;
   }else{
      h4Text = 'Eliminar Proveedores'
      pText = 'Eliminar los elementos con ID: ' + elementSelect;
   }


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
                     <button class="button-modal-confirm btn-modal-del">Eliminar</button>
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


menu_burger.addEventListener("click",()=>{
   aside.style.left = "0rem";
})
close_aside.addEventListener("click",()=>{
   aside.style.left = "-100%";   
})


getDataClient();
