const aside = document.querySelector('.aside');
const menu_burger = document.querySelector('.menu_burger');
const close_aside = document.querySelector('.close_aside');
const background_opacity = document.querySelector('.background_opacity');
const href_text = document.querySelector('a[name="gastos"]')

const btn_del_expenses = document.querySelector('.btn_del_expenses');
const container_modal_confirmacion = document.querySelector('.container_modal_confirmacion');

const container_body_table = document.querySelector('.container_body_table');

// ----------------   ELEMENTOS FORMULARIO  -----------------------

const form_add_gasto = document.querySelector('.form_add_gasto');
const btn_add_gasto = document.querySelector('.btn_add_gasto');
const btn_form_add_gasto = document.querySelector('.btn_form_add_gasto');
const btn_form_cancel = document.querySelector('.btn_form_cancel');

const input_date_form = document.querySelector('.input_date_form');
const select_category = document.querySelector('.select_category');
const select_sub_categoria = document.querySelector('.select_sub_categoria');
const input_form_description = document.querySelector('.input_form_description');
const input_form_amount = document.querySelector('.input_form_amount');
const select_method = document.querySelector('.select_method');
const select_proveedor = document.querySelector('.select_proveedor');

const URLQuery = `http://localhost:3210`;

console.log(URLQuery)
href_text.style.backgroundColor = '#f0f5fb';

const getDataProveedor = async () =>{


   let provData = await fetch(`${URLQuery}/view_proveedores`).then(res=>res.json()).then(data=>data);


   provData.forEach(prov=>{

      let optionProv = document.createElement("OPTION");
      optionProv.classList.add("option_select_proveedor");
      optionProv.textContent = prov.nombre_fantacia;
      optionProv.value = prov.nombre_fantacia;

      select_proveedor.appendChild(optionProv);

   })
}


const getDataExpenses = async () =>{

   container_body_table.innerHTML = '';

   let petition = await fetch(`${URLQuery}/view_gastos`).then(res=>res.json()).then(data=>data);


   petition.forEach(expens => {

      let id = expens.id_gasto;
      let categoria = expens.categoria;
      let descripcion = expens.descripcion;
      let fecha = expens.fecha;
      let forma_pago = expens.forma_pago;
      let monto = expens.monto;
      let proveedor = expens.proveedor;
      let subcategoria = expens.subcategoria;
      let linkEdit = `table:gastos~id_gasto:${id}`;

      const nodeLi = document.createElement("LI");
      nodeLi.classList.add("row_body_table");

      nodeLi.innerHTML =`
      
               <div class="div_row_table"><input value="${id}" name="checkExpenses" type="checkbox"></div>
               <div class="div_row_table">20-02-2023</div>
               <div class="div_row_table">${categoria}</div>
               <div class="div_row_table">${subcategoria}</div>
               <div class="div_row_table">${descripcion}</div>
               <div class="div_row_table">${monto}</div>
               <div class="div_row_table">${forma_pago}</div>
               <div class="div_row_table">${proveedor}</div>
               <a href="./edit_files.html?${linkEdit}"  class="div_row_table"><img src="../Assets/icons/edit_caja.svg" alt=""></a>

      `;

      container_body_table.appendChild(nodeLi);


   })
   
   
}

const addExpensesFn = async () =>{



   let date = input_date_form.value;
   let category = select_category.value;
   let subCategory = select_sub_categoria.value;
   let description = input_form_description.value;
   let amount = input_form_amount.value;
   let method = select_method.value;
   let proveedor = select_proveedor.value;

   let results = `

      "date" = ${date},
      "category" = ${category},
      "subCategory" = ${subCategory},
      "description" = ${description},
      "amount" = ${amount},
      "method" = ${method},
      "proveedor" = ${proveedor},

   `

   let petition = await fetch(`${URLQuery}/add_gasto`,{
      method: 'POST',
      body: JSON.stringify({
         "date" : `${date}`,
         "category" : `${category}`,
         "subCategory" : `${subCategory}`,
         "description" : `${description}`,
         "amount" : `${amount}`,
         "method" : `${method}`,
         "proveedor" : `${proveedor}`,
      }),
      headers: { 'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);
   
   console.log(results);
   console.log(petition);

   getDataExpenses();

}


const getBoxSelected = () =>{

   const elementChecked = document.querySelectorAll('input[name="checkExpenses"]:checked');
   
   const elementSelected = Array.from(elementChecked).map(checkedBox => checkedBox.value)
   console.log(elementChecked)
   return elementSelected;
}

const btnModalCancel = () =>{
   container_modal_confirmacion.innerHTML = '';
}
const btnModalAcept = async (IDs) =>{

   let petition = await fetch(`${URLQuery}/delete_element`,{
      method: 'DELETE',
      body: JSON.stringify({
         "idDelete":IDs,
         "idColumn":'id_gasto',
         "tabla":'gastos',
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

   container_modal_confirmacion.innerHTML = '';

   getDataExpenses();
}
btn_del_expenses.addEventListener("click",()=>{

   let h4Text = '';
   let pText  = '';
   let elementSelect = getBoxSelected().join().replaceAll(","," - ");

   if(elementSelect.length == 0){
      h4Text = 'Selecciona algun elemento';
      console.log(h4Text)
   }else if(elementSelect.length == 1){
      h4Text = 'Eliminar Gasto'
      pText = 'Eliminar el elemento con ID: ' + elementSelect;
      console.log(h4Text)
   }else{
      h4Text = 'Eliminar Gastos'
      pText = 'Eliminar los elementos con ID: ' + elementSelect;
      console.log(h4Text)
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


btn_add_gasto.addEventListener("click",()=>{
   getDataProveedor();
   background_opacity.style.display = "flex";
   form_add_gasto.style.right = "0rem";
})

btn_form_add_gasto.addEventListener("click",()=>{

   addExpensesFn();

   background_opacity.style.display = "none";
   form_add_gasto.style.right = "-100%";

})

btn_form_cancel.addEventListener("click",()=>{
   background_opacity.style.display = "none";
   form_add_gasto.style.right = "-100%";
   

})

menu_burger.addEventListener("click",()=>{
   aside.style.left = "0rem";
})

close_aside.addEventListener("click",()=>{
   aside.style.left = "-100%";
})

getDataExpenses();


