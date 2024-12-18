

// -----------   ELEMENTOS MODAL  ---------------------

const container_modal_confirm = document.querySelector('.container_modal_confirm');
const modal_res_rej = document.querySelector('.modal-res-rej');
const check_circle_icon = document.querySelector('.check-circle-icon')
const loading_failed_icon = document.querySelector('.loading-failed-icon')


// -------- ELEMENTOS FORMULARIO  --------------------------- 

const input_form_add_date = document.querySelector('.input_form_add_date');
const select_form_add_proveedor = document.querySelector('.select_form_add_proveedor');
const select_form_add_categoria = document.querySelector('.select_form_add_categoria');
const input_form_add_descripcion = document.querySelector('.input_form_add_descripcion');
const input_form_add_monto = document.querySelector('.input_form_add_monto');
const select_form_add_metodo = document.querySelector('.select_form_add_metodo');
const input_form_add_num_fact = document.querySelector('.input_form_add_num_fact');
const btn_add_buy = document.querySelector('.btn_add_buy');


const URLQuery = window.location.origin;

const viewProv = async () =>{

   let resultProveedores = await fetch(`${URLQuery}/view_proveedores`).then(res=>res.json()).then(data=>data);

   resultProveedores.forEach(prov=>{

      let nodeOption = document.createElement("option");
      nodeOption.classList.add("option_select_add");
      nodeOption.textContent = prov.nombre_fantacia;
      nodeOption.value = prov.nombre_fantacia;

      select_form_add_proveedor.appendChild(nodeOption);

   })

}

const addBuy = async () =>{

const input_form_fact = document.querySelector('input[name="fact"]:checked');


   let fecha = input_form_add_date.value;
   let proveedor = select_form_add_proveedor.value;
   let categoria = select_form_add_categoria.value;
   let descripcion = input_form_add_descripcion.value;
   let monto = input_form_add_monto.value;
   let forma_pago = select_form_add_metodo.value;
   let tipo_factura = input_form_fact.value;
   let numero_factura = input_form_add_num_fact.value;

   let dataUpLoad = `

      "fecha" : ${fecha}
      "proveedor" : ${proveedor}
      "categoria" : ${categoria}
      "descripcion" : ${descripcion}
      "monto" : ${monto}
      "forma_pago" : ${forma_pago}
      "tipo_factura" : ${tipo_factura}
      "numero_factura" : ${numero_factura}
   
   `
   console.log(dataUpLoad);

   let petition = await fetch(`${URLQuery}/add_compra`,{
      method: 'POST',
      body: JSON.stringify({
         
         "fecha"  : fecha,
         "proveedor"  : proveedor,
         "categoria"  : categoria,
         "descripcion"  : descripcion,
         "monto"  : monto,
         "forma_pago"  : forma_pago,
         "tipo_factura"  : tipo_factura,
         "numero_factura"  : numero_factura,

         }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   console.log(petition);

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

};

btn_add_buy.addEventListener("click",()=>{
   addBuy();
})

viewProv();