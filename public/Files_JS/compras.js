
const href_text = document.querySelector('a[name="compras"]')

const btn_del_prov = document.querySelector('.btn_del_prov');

const container_modal_confirmacion = document.querySelector('.container_modal_confirmacion');

const container_body_table = document.querySelector('.container_body_table');

const URLQuery = window.location.origin;
href_text.style.backgroundColor = '#f0f5fb';


const getDataBuy = async () =>{

   container_body_table.innerHTML = '';

   let result = await fetch(`${URLQuery}/view_compras`).then(res=>res.json()).then(data=>data);

      result.forEach(buy =>{
         
         let id_compra = buy.id_compra;
         let fecha = buy.fecha;
         let proveedor = buy.proveedor;
         let descripcion = buy.descripcion;
         let monto = buy.monto;
         let forma_pago = buy.forma_pago;
         let tipo_factura = buy.tipo_factura;
         let numero_factura = buy.numero_factura;
         let categoria = buy.categoria;
         let linkEdit = `table:compras~id_compra:${id_compra}`;

         // let id = prov.id_prov
         // let name = prov.nombre_fantacia
         // let razon = prov.razon_social
         // let cuit = prov.cuit
         // let direction = prov.direccion
         // let phone = prov.telefono
         // let email = prov.email
         // let linkEdit = `table:proveedores~id_prov:${id}`;
         

         let nodeLi = document.createElement("LI");
         nodeLi.classList.add("row_body_table");

         nodeLi.innerHTML = `
                  <div class="div_row_table"><input value="${id_compra}" name="provCheck" type="checkbox"></div>
                  <div class="div_row_table">20-08-2023</div>
                  <div class="div_row_table">${proveedor}.</div>
                  <div class="div_row_table">${descripcion}</div>
                  <div class="div_row_table">${monto}</div>
                  <div class="div_row_table">${forma_pago}</div>
                  <div class="div_row_table">${tipo_factura}</div>
                  <div class="div_row_table">${numero_factura}</div>
                  <div class="div_row_table">${categoria}</div>
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
         "idColumn":'id_compra',
         "tabla":'compras',
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

   container_modal_confirmacion.innerHTML = '';

   getDataBuy();
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





getDataBuy();




