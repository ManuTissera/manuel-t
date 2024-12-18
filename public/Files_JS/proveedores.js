
const href_text = document.querySelector('a[name="proveedores"]')

const btn_del_prov = document.querySelector('.btn_del_prov');

const container_modal_confirmacion = document.querySelector('.container_modal_confirmacion');

const container_body_table = document.querySelector('.container_body_table');

const URLQuery = window.location.origin;
href_text.style.backgroundColor = '#f0f5fb';

const getDataProv = async () =>{
   
   container_body_table.innerHTML = '';

   let result = await fetch(`${URLQuery}/view_proveedores`).then(res=>res.json()).then(data=>data);

      result.forEach(prov =>{
         
         let id = prov.id_prov
         let name = prov.nombre_fantacia
         let razon = prov.razon_social
         let cuit = prov.cuit
         let direction = prov.direccion
         let phone = prov.telefono
         let email = prov.email
         let linkEdit = `table:proveedores~id_prov:${id}`;
         

         let nodeLi = document.createElement("LI");
         nodeLi.classList.add("row_body_table");

         nodeLi.innerHTML = `
                  <div class="div_row_table"><input value="${id}" name="provCheck" type="checkbox"></div>
                  <div class="div_row_table">${name}</div>
                  <div class="div_row_table">${razon}.</div>
                  <div class="div_row_table">${cuit}</div>
                  <div class="div_row_table">${direction}</div>
                  <div class="div_row_table">${phone}</div>
                  <div class="div_row_table">${email}</div>
                  <a href="./edit_files.html?${linkEdit}"  class="div_row_table"><img src="../Assets/icons/edit_caja.svg" alt=""></a>
         
         `;

         container_body_table.appendChild(nodeLi);

      })


}

const getBoxSelected = () => {

   const boxChecked = document.querySelectorAll('input[name="provCheck"]:checked');

   const valuesSelected = Array.from(boxChecked).map(checkbox => checkbox.value);

   const valueText = Array.from(boxChecked).map(checkbox => ` ${checkbox.value} -`)
   
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
         "idColumn":'id_prov',
         "tabla":'proveedores',
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

   container_modal_confirmacion.innerHTML = '';

   getDataProv();
}

btn_del_prov.addEventListener("click",()=>{

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

      const modal_conf = `
      
            <div class="background_opacity_modal b_o_modal_confirm">
               <div class="modal-confirm modal_confirm">
                  <div class="circle-warning">
                     <img class="img-circle-warning" src="../Assets/icons/circle_warning.svg" alt="">
                 </div>
                 <h4 class="h4-modal-confirm">${h4Text}</h4>
                 <p class="p-msg-confirm">${pText}</p>
                 <article class="article-btn-modal-confirm">
                     <button class="button-modal-confirm btn_cancel_del" " >Cancelar</button>
                     <button class="button-modal-confirm btn-modal-del" >Eliminar</button>
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




getDataProv();




