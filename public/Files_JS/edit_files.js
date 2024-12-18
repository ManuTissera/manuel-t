

const container_name_table = document.querySelector('.container_name_table');
const h2_header_form = document.querySelector('.h2-header-form');
const main_form_edit = document.querySelector('.main_form_edit');
const container_modal_confirm = document.querySelector('.container_modal_confirm');


const btn_edit = document.querySelector('.btn_edit');

// ------- CAPTURAR INFORMACION ---------

let result = window.location;
let dataURL = window.location.search;
let dataArray = dataURL.split('~');
let nameTable = (dataArray[0].split(':'))[1];
let idColumn = (dataArray[1].split(':'))[0];
let idValue = (dataArray[1].split(':'))[1]
let nameTableTitle = nameTable.charAt(0).toUpperCase() + nameTable.slice(1).toLowerCase()
console.log(nameTable)
console.log(idColumn)
console.log(idValue)

//h2_header_form.textContent = `Editar ${nameTable}`
h2_header_form.textContent = `Editar ${nameTableTitle}`

const URLQuery = window.location.origin;


// console.log(result);
// console.log(dataURL);
console.log(dataArray);

const getDataPersonal = async () =>{

   let personalPetiton = await fetch(`${URLQuery}/view_personal`).then(res=>res.json()).then(data=>data);

   return personalPetiton;
   
}

const getDataComercios = async () =>{

   let comercesData = await fetch(`${URLQuery}/view_comercios`).then(res=>res.json()).then(data=>data);

   return comercesData;
}

const getDataProveedor = async () =>{

   let provData = await fetch(`${URLQuery}/view_proveedores`).then(res=>res.json()).then(data=>data);

   return provData;
}


const functionCancelEdit = () =>{
   container_modal_confirm.innerHTML = '';
}

const functionConfirmEdit = async (arrDataUpdate) =>{

   let petitionEdit = await fetch(`${URLQuery}/edit_element`,{
   method: 'PATCH',
   body: JSON.stringify({
      "table":nameTable,
      "dataChange": arrDataUpdate,
      "idColumn": idColumn,
      "id": idValue,
   }),
   headers: {'Content-type':'application/json'}
   }).then(res=>res.text()).then(data=>data);

   container_modal_confirm.innerHTML = '';

   console.log(petitionEdit);
}


let arrDataUpdate = [];
let objDataInfo = {};

const sendEditFn = async () =>{
   const input_insert_editAll = document.querySelectorAll('.input_insert_edit')

   input_insert_editAll.forEach(inpInsert =>{

      let dataName = inpInsert.name;
      let dataValue = inpInsert.value;
      let dataId = inpInsert.id;
      
      if(inpInsert.value != ''){   
         // let sintaxSQL = `UPDATE ${nameTable} SET ${dataName} = ${dataValue} WHERE ${idColumn} = ${idValue};`;
         // arrDataUpdate.push(sintaxSQL)
         if(dataName === 'venta_efectivo' | dataName === 'venta_tarjeta' | dataName === 'venta_cuenta_corriente' ){

            let sintaxSQL = `${dataName} = ${dataValue}`;
            arrDataUpdate.push(sintaxSQL);
            objDataInfo[dataId] = dataValue;
         }else{
            let sintaxSQL = `${dataName} = '${dataValue}'`;

            arrDataUpdate.push(sintaxSQL)
            objDataInfo[dataId] = dataValue;
            

         }
      }else{
      }

      
   })
   let dataSet = arrDataUpdate.join();


   let modalConfirm = `
   
   <div class="background_opacity b_o_modal_confirm">
      <div class="modal-confirm modal_confirm">
         <div class="circle-container-icon">
            <img class="img_add_person" src="../Assets/icons/person_edit-40px.svg" alt="">
         </div>
         <h4 class="h4-modal-confirm">Datos Editar</h4>
         <div class="container_data_change">
            
         </div>
         <article class="article-btn-modal-confirm">
            <button class="button-modal-confirm btn_cancel_edit" >Cancelar</button>
            <button class="button-modal-confirm btn_acept_edit" >Agregar</button>
         </article>       
      </div>
   </div>
   
   `
   container_modal_confirm.innerHTML = modalConfirm;

   const btn_cancel_edit = document.querySelector('.btn_cancel_edit');
   const btn_acept_edit = document.querySelector('.btn_acept_edit');
   const container_data_change = document.querySelector('.container_data_change');


         btn_acept_edit.addEventListener("click",()=>{
            console.log(nameTable)
            console.log(dataSet)
            console.log(idColumn)
            console.log(idValue)
         functionConfirmEdit(dataSet)
         
         })
         btn_cancel_edit.addEventListener("click",()=>{
            container_modal_confirm.innerHTML = '';

         })

         console.log(arrDataUpdate);

         Object.entries(objDataInfo).forEach(([key, value])=>{
            
            let pData = document.createElement('p');
            pData.classList.add("p_msg_edit","p_msg_confirm_add_prov");
            pData.innerHTML = `<b>${key}: </b>${value}`

            container_data_change.appendChild(pData)

         })


}



const editGastosFn = async (fecha,categoria,subcategoria,descripcion,monto,forma_pago,proveedor) =>{


   let structur = ` 
     <div class="container_name_table">${nameTableTitle}</div>
      <section class="section_main_add_proveedor">
         <a href="./gastos.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_edit_container">
         <div class="div-form-edit">
            <p class="text_form_input">Fecha</p>
            <input type="text" value="${fecha}" class="input_data_edit input_form_edit_date" disabled>
            <button class="btn_arrow btn_arrow_style" name="1">Editar</button>
            <div class="container_input_edit" name="cont_1">
               <input type="date" id="Fecha" name="fecha" class="input_insert_edit input_insert_date">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Categoria</p>
            <input type="text" value="${categoria}" class="input_data_edit input_form_edit_categoria" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_2">
               
               <select name="categoria" id="Categoria" class="select_edit input_insert_edit select_insert_categoria">
                  <option value="" class="option_category">Seleccionar Categoria</option>
                  <option value="Impuestos y Tasas" class="option_category">Impuestos y Tasas</option>
                  <option value="Gastos de Oficina" class="option_category">Gastos de Oficina</option>
                  <option value="Gastos Operativos" class="option_category">Gastos Operativos</option>
                  <option value="Marketing y Publicidad" class="option_category">Marketing y Publicidad</option>
                  <option value="Gastos Financieros" class="option_category">Gastos Financieros</option>
                  <option value="Otros" class="option_category">Otros</option>
               </select>
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Sub Categoria</p>
            <input type="text" value="${subcategoria}" class="input_data_edit input_form_edit_subcategoria" disabled>
            <button class="btn_arrow btn_arrow_style" name="3">Editar</button>
            <div class="container_input_edit" name="cont_3">
   
               <select name="subcategoria" id="Subcategoria" class="select_edit input_insert_edit select_insert_subcategoria">
                  <option value="" class="option_sub_categoria">Seleccionar Sub Categoria</option>
                  <option value="IVA" class="option_sub_categoria">IVA</option>
                  <option value="Ingresos Brutos" class="option_sub_categoria">Ingresos Brutos</option>
                  <option value="Ganancias" class="option_sub_categoria">Ganancias</option>
                  <option value="Tasas Municipales" class="option_sub_categoria">Tasas Municipales</option>
                  <option value="Retenciones" class="option_sub_categoria">Retenciones</option>
                  <option value="Librería" class="option_sub_categoria">Librería</option>
                  <option value="Mantenimiento" class="option_sub_categoria">Mantenimiento</option>
                  <option value="Utilería" class="option_sub_categoria">Utilería</option>
                  <option value="Servicios Públicos" class="option_sub_categoria">Servicios Públicos</option>
                  <option value="Combustibles" class="option_sub_categoria">Combustibles</option>
                  <option value="Reparaciones de Vehículos" class="option_sub_categoria">Reparaciones de Vehículos</option>
                  <option value="Transporte" class="option_sub_categoria">Transporte</option>
                  <option value="Alquileres" class="option_sub_categoria">Alquileres</option>
                  <option value="Sueldos" class="option_sub_categoria">Sueldos</option>
                  <option value="Publicidad Digital" class="option_sub_categoria">Publicidad Digital</option>
                  <option value="Impresión de Materiales" class="option_sub_categoria">Impresión de Materiales</option>
                  <option value="Branding" class="option_sub_categoria">Branding</option>
                  <option value="Comisiones Bancarias" class="option_sub_categoria">Comisiones Bancarias</option>
                  <option value="Intereses" class="option_sub_categoria">Intereses</option>
                  <option value="Tarjetas de Crédito" class="option_sub_categoria">Tarjetas de Crédito</option>
                  <option value="Capacitación" class="option_sub_categoria">Capacitación</option>
                  <option value="Suscripciones" class="option_sub_categoria">Suscripciones</option>
                  <option value="Viajes y Viáticos" class="option_sub_categoria">Viajes y Viáticos</option>
                  <option value="Seguros" class="option_sub_categoria">Seguros</option>
               </select>
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Descripcion</p>
            <input type="text" value="${descripcion}" class="input_data_edit descripcion" disabled>
            <button class="btn_arrow btn_arrow_style" name="4">Editar</button>
            <div class="container_input_edit" name="cont_4">
               <input type="text" id="Descripcion" name="descripcion" class="input_insert_edit input_insert_descripcion">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Monto</p>
            <input type="text" value="${monto}" class="input_data_edit monto" disabled>
            <button class="btn_arrow btn_arrow_style" name="5">Editar</button>
            <div class="container_input_edit" name="cont_5">
               <input type="text" id="Monto" name="monto" class="input_insert_edit input_insert_monto">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Metodo de Pago</p>
            <input type="text" value="${forma_pago}" class="input_data_edit input_form_edit_metodo" disabled>
            <button class="btn_arrow btn_arrow_style" name="6">Editar</button>
            <div class="container_input_edit" name="cont_6">
               
               <select name="forma_pago" id="Metodo de Pago" class="select_edit input_insert_edit select_insert_metodo">
                  <option value="" class="option_select_method">Seleccionar Metodo</option>
                  <option value="Efectivo" class="option_select_method">Efectivo</option>
                  <option value="Transferencia" class="option_select_method">Transferencia</option>
                  <option value="Tarjeta" class="option_select_method">Tarjeta</option>
                  <option value="Cheque" class="option_select_method">Cheque</option>
                  <option value="Otro" class="option_select_method">Otro</option>
               </select>

            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Proveedor</p>
            <input type="text" value="${proveedor}" class="input_data_edit input_form_edit_proveedor" disabled>
            <button class="btn_arrow btn_arrow_style" name="7">Editar</button>
            <div class="container_input_edit" name="cont_7">
               
               <select name="proveedor" id="Proveedor" class="select_edit input_insert_edit select_insert_proveedor">
                  <option value="" class="option_form_comercio">Seleccionar Proveedor</option>
               </select>

            </div>
         </div>

         <button class="rounded_button btn_edit" onclick="sendEditFn()">Editar</button>
      </div>
      
      `
      main_form_edit.innerHTML = structur;

      const select_insert_proveedor = document.querySelector('.select_insert_proveedor');

      (await getDataProveedor()).forEach(prov =>{
         //console.log(prov.nombre_fantacia);

         let provOption = document.createElement("option");
         provOption.classList.add("option_form_proveedores");
         provOption.textContent = prov.nombre_fantacia;
         provOption.value = prov.nombre_fantacia;

         select_insert_proveedor.appendChild(provOption);

      })


}

const editClienteFn = async (nombre_fantacia_cl,razon_social_cl,cuit_cl,direccion_cl,telefono_cl,email_cl,fecha_ingreso_cl,facturacion) =>{


   let structur = ` 
      <div class="container_name_table">${nameTableTitle}</div>
      <section class="section_main_add_proveedor">
         <a href="./clientes_mayor.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_edit_container">
         <div class="div-form-edit">
            <p class="text_form_input">Nombre</p>
            <input type="text" value="${nombre_fantacia_cl}" class="input_data_edit input_form_edit_name" disabled>
            <button class="btn_arrow btn_arrow_style" name="1">Editar</button>
            <div class="container_input_edit" name="cont_1">
               <input type="text" id="Nombre" name="nombre_fantacia_cl" class="input_insert_edit input_insert_name">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Razon Social</p>
            <input type="text" value="${razon_social_cl}" class="input_data_edit input_form_edit_razon" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_2">
               <input type="text" id="Razon Social" name="razon_social_cl" class="input_insert_edit input_insert_razon">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">CUIT</p>
            <input type="text" value="${cuit_cl}" class="input_data_edit input_form_edit_cuit" disabled>
            <button class="btn_arrow btn_arrow_style" name="3">Editar</button>
            <div class="container_input_edit" name="cont_3">
               <input type="text" id="CUIT= name="cuit_cl" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Direccion</p>
            <input type="text" value="${direccion_cl}" class="input_data_edit input_form_edit_direccion" disabled>
            <button class="btn_arrow btn_arrow_style" name="4">Editar</button>
            <div class="container_input_edit" name="cont_4">
               <input type="text" id="Direccion" name="direccion_cl" class="input_insert_edit input_insert_direccion">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Nº Telefono</p>
            <input type="text" value="${telefono_cl}" class="input_data_edit input_form_edit_phone" disabled>
            <button class="btn_arrow btn_arrow_style" name="5">Editar</button>
            <div class="container_input_edit" name="cont_5">
               <input type="text" id="Nº Telefono" name="telefono_cl" class="input_insert_edit input_insert_phone">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">E-mail</p>
            <input type="text" value="${email_cl}" class="input_data_edit input_form_edit_email" disabled>
            <button class="btn_arrow btn_arrow_style" name="6">Editar</button>
            <div class="container_input_edit" name="cont_6">
               <input type="text" id="e-mail" name="email_cl" class="input_insert_edit input_insert_email">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Fecha Ingreso</p>
            <input type="text" value="${fecha_ingreso_cl}" class="input_data_edit input_form_edit_email" disabled>
            <button class="btn_arrow btn_arrow_style" name="7">Editar</button>
            <div class="container_input_edit" name="cont_7">
               <input type="text" id="Fecha Ingreso" name="fecha_ingreso_cl" class="input_insert_edit input_insert_email">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Regimen</p>
            <input type="text" value="${facturacion}" class="input_data_edit input_form_edit_facturacion" disabled>
            <button class="btn_arrow btn_arrow_style" name="8">Editar</button>
            <div class="container_input_edit" name="cont_8">
               
               <select name="facturacion" id="Regimen" class="select_edit input_insert_edit select_insert_facturacion">
                  <option value="" class="option_select_factiacion">Seleccionar Regimen</option>
                  <option value="Responsable Inscripto" class="option_select_factiacion">Responsable Inscripto</option>
                  <option value="Regimen Simplificado" class="option_select_factiacion">Regimen Simplificado</option>
                  <option value="Consumidor Final" class="option_select_factiacion">Consumidor Final</option>
               </select>

            </div>
         </div>

         <button class="rounded_button btn_edit" onclick="sendEditFn()">Editar</button>
      </div>
      
   
      
      `

      main_form_edit.innerHTML = structur;


}

const editComprasFn = async (fecha,proveedor,descripcion,monto,forma_pago,tipo_factura,numero_factura,categoria) =>{


   let structur = `
   
         <div class="container_name_table">${nameTableTitle}</div>
      <section class="section_main_add_proveedor">
         <a href="./compras.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_edit_container">

         <div class="div-form-edit">
            <p class="text_form_input">Fecha</p>
            <input type="text" value="${fecha}" class="input_data_edit input_form_edit_date" disabled>
            <button class="btn_arrow btn_arrow_style" name="1">Editar</button>
            <div class="container_input_edit" name="cont_1">
               <input type="text" id="Fecha" name="fecha" class="input_insert_edit input_insert_date">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Proveedor</p>
            <input type="text" value="${proveedor}" class="input_data_edit input_form_edit_proveedor" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_2">
               
               <select name="proveedor" id="proveedor" class="select_edit input_insert_edit select_insert_proveedor">
                  <option value="" class="option_select_factiacion">Seleccionar Proveedor</option>
               </select>

            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Descripcion</p>
            <input type="text" value="${descripcion}" class="input_data_edit input_form_edit_description" disabled>
            <button class="btn_arrow btn_arrow_style" name="3">Editar</button>
            <div class="container_input_edit" name="cont_3">
               <input type="text" id="Descripcion" name="descripcion" class="input_insert_edit input_insert_descripcion">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Monto</p>
            <input type="text" value="${monto}" class="input_data_edit input_form_edit_monto" disabled>
            <button class="btn_arrow btn_arrow_style" name="4">Editar</button>
            <div class="container_input_edit" name="cont_4">
               <input type="text" id="Monto" name="monto" class="input_insert_edit input_insert_monto">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Metodo de pago</p>
            <input type="text" value="${forma_pago}" class="input_data_edit input_form_edit_metodo" disabled>
            <button class="btn_arrow btn_arrow_style" name="5">Editar</button>
            <div class="container_input_edit" name="cont_5">
               
               <select name="forma_pago" id="forma_pago" class="select_edit input_insert_edit select_insert_metodo">
                  <option value="" class="option_select_add">Selecciona Metodo de Pago</option>
                  <option value="Efectivo" class="option_select_add">Efectivo</option>
                  <option value="Tarjeta" class="option_select_add">Tarjeta</option>
                  <option value="Cheque" class="option_select_add">Cheque</option>
                  <option value="Transferencia" class="option_select_add">Transferencia</option>
                  <option value="Cuenta Corriente" class="option_select_add">Cuenta Corriente</option>
               </select>

            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Factura</p>
            <input type="text" value="${tipo_factura}" class="input_data_edit input_form_edit_factura" disabled>
            <button class="btn_arrow btn_arrow_style" name="6">Editar</button>
            <div class="container_input_edit" name="cont_6">
               <input type="text" id="Factura" name="tipo_factura" class="input_insert_edit input_insert_factura">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Nº Factura</p>
            <input type="text" value="${numero_factura}" class="input_data_edit input_form_edit_num_factura" disabled>
            <button class="btn_arrow btn_arrow_style" name="7">Editar</button>
            <div class="container_input_edit" name="cont_7">
               <input type="text" id="Nº Factura" name="numero_factura" class="input_insert_edit input_insert_factura">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Categoria</p>
            <input type="text" value="${categoria}" class="input_data_edit input_form_edit_categoria" disabled>
            <button class="btn_arrow btn_arrow_style" name="8">Editar</button>
            <div class="container_input_edit" name="cont_8">
               <input type="text" id="categoria" name="categoria" class="input_insert_edit input_insert_categoria">
            </div>
         </div>

         <button class="rounded_button btn_edit" onclick="sendEditFn()">Editar</button>
      </div>
   
   `

   main_form_edit.innerHTML = structur;


}

const editComerciosFn = async () =>{

   let structur = ` 
           <section class="section_main_add_proveedor">
         <a href="./clientes_mayor.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_add_proveedor">
         <div class="div-form-add">
            <p class="text_form_input">Nombre</p>
            <input type="text" class="input_add input_form_add_name">
         </div>
         <div class="div-form-add">
            <p class="text_form_input">Razon Social</p>
            <input type="text" class="input_add input_form_add_razon">
         </div>
         <div class="div-form-add">
            <p class="text_form_input">CUIT</p>
            <input type="text" class="input_add input_form_add_cuit">
         </div>
         <div class="div-form-add">
            <p class="text_form_input">Regimen</p>
            <select name="" id="" class="select_add select_form_add_regimen">
               <option value="Responsable Inscripto" class="option_select_add">Responsable Inscripto</option>
               <option value="Regimen Simplificado" class="option_select_add">Regimen Simplificado</option>
               <option value="Consumidor Final" class="option_select_add">Consumidor Final</option>
            </select>
         </div>
         <div class="div-form-add">
            <p class="text_form_input">Direccion</p>
            <input type="text" class="input_add input_form_add_direction">
         </div>
         <div class="div-form-add">
            <p class="text_form_input">Nº Telefono</p>
            <input type="text" class="input_add input_form_add_phone">
         </div>
         <div class="div-form-add">
            <p class="text_form_input">E-mail</p>
            <input type="text" class="input_add input_form_add_email">
         </div>
         <div class="div-form-add">
            <p class="text_form_input">Fecha Ingreso</p>
            <input type="date" class="input_add input_form_add_dateIng">
         </div>

         <button class="rounded_button btn_add_proveedor">Agregar</button>
      </div>
      
      `



}

const editPersonalFn = async (apellido,cargo,direccion,nombre,telefono) =>{


   let structur = ` 
      <div class="container_name_table">${nameTableTitle}</div>
      <section class="section_main_add_proveedor">
         <a href="./clientes_mayor.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_edit_container">
         <div class="div-form-edit">
            <p class="text_form_input">Nombre</p>
            <input type="text" value="${nombre}" class="input_data_edit input_form_edit_name" disabled>
            <button class="btn_arrow btn_arrow_style" name="1">Editar</button>
            <div class="container_input_edit" name="cont_1">
               <input type="text" id="Nombre" name="nombre" class="input_insert_edit input_insert_name">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Apellido</p>
            <input type="text" value="${apellido}" class="input_data_edit input_form_edit_surname" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_2">
               <input type="text" id="Apellido" name="apellido" class="input_insert_edit input_insert_surname">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Cargo</p>
            <input type="text" value="${cargo}" class="input_data_edit input_form_edit_role" disabled>
            <button class="btn_arrow btn_arrow_style" name="4">Editar</button>
            <div class="container_input_edit" name="cont_4">
               
               <select name="cargo" id="Cargo" class="select_edit input_insert_edit select_insert_role">
                  <option value="" class="option_form_role">Seleccionar Cargo</option>
                  <option value="Director" class="option_form_role">Director</option>
                  <option value="Gerente" class="option_form_role">Gerente</option>
                  <option value="Administrador" class="option_form_role">Administrador</option>
                  <option value="Cajero" class="option_form_role">Cajero</option>
                  <option value="Operario" class="option_form_role">Operario</option>
               </select>

            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Direccion</p>
            <input type="text" value="${direccion}" class="input_data_edit input_form_edit_direction" disabled>
            <button class="btn_arrow btn_arrow_style" name="5">Editar</button>
            <div class="container_input_edit" name="cont_5">
               <input type="text" id="Direccion" name="direccion" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Nº Telefono</p>
            <input type="text" value="${telefono}" class="input_data_edit input_form_edit_phone" disabled>
            <button class="btn_arrow btn_arrow_style" name="6">Editar</button>
            <div class="container_input_edit" name="cont_6">
               <input type="text" id="Nº Telefono" name="telefono" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">E-mail</p>
            <input type="text" value="" class="input_data_edit input_form_edit_email" disabled>
            <button class="btn_arrow btn_arrow_style" name="7">Editar</button>
            <div class="container_input_edit" name="cont_7">
               <input type="text" id="e-mail" name="email" class="input_insert_edit input_insert_cuit">
            </div>
         </div>


         <button class="rounded_button btn_edit" onclick="sendEditFn()">Editar</button>
      </div>
      
      `

      main_form_edit.innerHTML = structur;

}

const editProveedoresFn = async (nombre_fantacia,razon_social,cuit,direccion,telefono,email) =>{


   let structur = ` 
      <div class="container_name_table">${nameTableTitle}</div>
      <section class="section_main_add_proveedor">
         <a href="./proveedores.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_edit_container">
         <div class="div-form-edit">
            <p class="text_form_input">Nombre</p>
            <input type="text" name="Nombre" value="${nombre_fantacia}" class="input_data_edit input_form_edit_name" disabled>
            <button class="btn_arrow btn_arrow_style" name="1">Editar</button>
            <div class="container_input_edit" name="cont_1">
               <input type="text" id="Nombre" name="nombre_fantacia" class="input_insert_edit input_insert_name">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Razon Social</p>
            <input type="text" name="Razon Social" value="${razon_social}" class="input_data_edit input_form_edit_razon" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_2">
               <input type="text" id="Razon Social" name="razon_social" class="input_insert_edit input_insert_razon">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">CUIT</p>
            <input type="text" name="CUIT" value="${cuit}" class="input_data_edit input_form_edit_cuit" disabled>
            <button class="btn_arrow btn_arrow_style" name="3">Editar</button>
            <div class="container_input_edit" name="cont_3">
               <input type="text" id="CUIT" name="cuit" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Direccion</p>
            <input type="text" name="Direccion" value="${direccion}" class="input_data_edit input_form_edit_direction" disabled>
            <button class="btn_arrow btn_arrow_style" name="4">Editar</button>
            <div class="container_input_edit" name="cont_4">
               <input type="text" id="Direccion" name="direccion" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Nº Telefono</p>
            <input type="text" name="Nº Telefono" value="${telefono}" class="input_data_edit input_form_edit_phone" disabled>
            <button class="btn_arrow btn_arrow_style" name="5">Editar</button>
            <div class="container_input_edit" name="cont_5">
               <input type="text" id="Nº Telefono" name="telefono" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">E-mail</p>
            <input type="text" name="e-mail" value="${email}" class="input_data_edit input_form_edit_email" disabled>
            <button class="btn_arrow btn_arrow_style" name="6">Editar</button>
            <div class="container_input_edit" name="cont_6">
               <input type="text" id="e-mail" name="email" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <button class="rounded_button btn_edit" onclick="sendEditFn()">Editar</button>
      </div>
      
      `
      main_form_edit.innerHTML = structur;

}

const editVentasFn = async (fecha,comercio,personal,venta_cuenta_corriente,venta_efectivo,venta_tarjeta) =>{




   let structur = ` 
      <div class="container_name_table">${nameTableTitle}</div>
      <section class="section_main_add_proveedor">
         <a href="./cajas.html" class="div_back_add_proveedor">
            <img src="../Assets/icons/chevron_back.svg" alt="">
            <p class="p_back_add_proveedor">Volver</p>
         </a>
      </section>
      <div class="form_edit_container">
         <div class="div-form-edit">
            <p class="text_form_input">Fecha</p>
            <input type="text" value="${fecha}" class="input_data_edit input_form_edit_date" disabled>
            <button class="btn_arrow btn_arrow_style" name="1">Editar</button>
            <div class="container_input_edit" name="cont_1">
               <input type="date" id="Fecha" name="fecha" class="input_insert_edit input_insert_date">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Titular</p>
            <input type="text" value="${personal}" class="input_data_edit input_form_edit_personal" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_4">
               
               <select name="personal" id="Titular" class="select_edit input_insert_edit select_insert_personal">
                  <option value="" class="option_form_personal">Seleccionar Titular</option>
               </select>

            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Comercio</p>
            <input type="text" value="${comercio}" class="input_data_edit input_form_edit_comercio" disabled>
            <button class="btn_arrow btn_arrow_style" name="2">Editar</button>
            <div class="container_input_edit" name="cont_4">
               
               <select name="comercio" id="Comercio" class="select_edit input_insert_edit select_insert_comercio">
                  <option value="" class="option_form_comercio">Seleccionar Comercio</option>
               </select>

            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Monto Efectivo</p>
            <input type="text" value="${venta_efectivo}" class="input_data_edit input_form_edit_efectivo" disabled>
            <button class="btn_arrow btn_arrow_style" name="5">Editar</button>
            <div class="container_input_edit" name="cont_5">
               <input type="text" id="Monto Efectivo" name="venta_efectivo" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Monto Tarjeta</p>
            <input type="text" value="${venta_tarjeta}" class="input_data_edit input_form_edit_tarjeta" disabled>
            <button class="btn_arrow btn_arrow_style" name="6">Editar</button>
            <div class="container_input_edit" name="cont_6">
               <input type="text" id="Monto Tarjeta" name="venta_tarjeta" class="input_insert_edit input_insert_cuit">
            </div>
         </div>

         <div class="div-form-edit">
            <p class="text_form_input">Monto Cuenta Corriente</p>
            <input type="text" value="${venta_cuenta_corriente}" class="input_data_edit input_form_edit_cta_cte" disabled>
            <button class="btn_arrow btn_arrow_style" name="7">Editar</button>
            <div class="container_input_edit" name="cont_7">
               <input type="text" id="Monto Cta Cte" name="venta_cuenta_corriente" class="input_insert_edit input_insert_cuit">
            </div>
         </div>


         <button class="rounded_button btn_edit" onclick="sendEditFn()">Editar</button>
      </div>
      
      `
      main_form_edit.innerHTML = structur;





 
      const select_insert_comercio = document.querySelector('.select_insert_comercio');

      (await getDataComercios()).forEach(comercios =>{
         console.log(comercios.nombre);

         let optionComerces = document.createElement("option");
         optionComerces.classList.add("option_form_comercio")
         optionComerces.textContent = comercios.nombre;
         optionComerces.value = comercios.nombre;

         select_insert_comercio.appendChild(optionComerces);
      })

      const select_insert_personal = document.querySelector('.select_insert_personal');
      (await getDataPersonal()).forEach(personal =>{
         let dataPersonal = `${personal.nombre} ${personal.apellido}`;
         console.log(dataPersonal);

         let optionPeronal = document.createElement("option");
         optionPeronal.classList.add("option_form_personal");
         optionPeronal.textContent = dataPersonal;
         optionPeronal.value = dataPersonal;

         select_insert_personal.appendChild(optionPeronal);
      })
      



}


const getDataToEdit = async (nameTable,idColumn,idValue) =>{

   console.log(`${nameTable}
      ${idColumn}
      ${idValue}`)

   let resultQuery = await fetch(`${URLQuery}/view_data_edit`,{
      method: 'POST',
      body: JSON.stringify({
         "table": nameTable,
         "column": idColumn,
         "id": idValue,
      }),
      headers: {'Content-type':'application/json'}
   }).then(res=>res.json()).then(data=>data);

   console.log(resultQuery[0])

   if(nameTable === 'clientes'){
      console.log('Ejecutor cliente')

      let nombre_fantacia_cl = resultQuery[0].nombre_fantacia_cl
      let razon_social_cl = resultQuery[0].razon_social_cl
      let cuit_cl = resultQuery[0].cuit_cl
      let direccion_cl = resultQuery[0].direccion_cl
      let telefono_cl = resultQuery[0].telefono_cl
      let email_cl = resultQuery[0].email_cl
      let fecha_ingreso_cl = resultQuery[0].fecha_ingreso_cl
      let facturacion = resultQuery[0].facturacion


      editClienteFn(nombre_fantacia_cl,razon_social_cl,cuit_cl,direccion_cl,telefono_cl,email_cl,fecha_ingreso_cl,facturacion)
   }else if(nameTable === 'comercios'){
      console.log('Ejectuto comercios')

   }else if(nameTable === 'gastos'){
      console.log('Ejecuro gastos')

      let fecha = resultQuery[0].fecha;
      let categoria = resultQuery[0].categoria;
      let subcategoria = resultQuery[0].subcategoria;
      let descripcion = resultQuery[0].descripcion;
      let monto = resultQuery[0].monto;
      let forma_pago = resultQuery[0].forma_pago;
      let proveedor = resultQuery[0].proveedor;

      editGastosFn(fecha,categoria,subcategoria,descripcion,monto,forma_pago,proveedor)
   }else if(nameTable === 'personal'){
      console.log('Ejecuto personal')

      let apellido = resultQuery[0].apellido
      let cargo = resultQuery[0].cargo
      let direccion = resultQuery[0].direccion
      let fecha_ingreso = resultQuery[0].fecha_ingreso
      let id_personal = resultQuery[0].id_personal
      let nombre = resultQuery[0].nombre
      let telefono = resultQuery[0].telefono

      editPersonalFn(apellido,cargo,direccion,nombre,telefono);
   }else if(nameTable === 'proveedores'){
      console.log('Ejecuto proveedores')

      let nombre_fantacia = resultQuery[0].nombre_fantacia;
      let razon_social = resultQuery[0].razon_social;
      let cuit = resultQuery[0].cuit;
      let direccion = resultQuery[0].direccion;
      let telefono = resultQuery[0].telefono;
      let email = resultQuery[0].email;
      
      editProveedoresFn(nombre_fantacia,razon_social,cuit,direccion,telefono,email)
   }else if(nameTable === 'ventas'){
      console.log('Ejecuto ventas')

      let comercio = resultQuery[0].comercio;
      let fecha = resultQuery[0].fecha;
      let personal = resultQuery[0].personal;
      let venta_cuenta_corriente = resultQuery[0].venta_cuenta_corriente;
      let venta_efectivo = resultQuery[0].venta_efectivo;
      let venta_tarjeta = resultQuery[0].venta_tarjeta;

      editVentasFn(fecha,comercio,personal,venta_cuenta_corriente,venta_efectivo,venta_tarjeta);

   }else if(nameTable === 'compras'){
      console.log('Ejecuto compras');

      let fecha = resultQuery[0].fecha;
      let proveedor = resultQuery[0].proveedor;
      let descripcion = resultQuery[0].descripcion;
      let monto = resultQuery[0].monto;
      let forma_pago = resultQuery[0].forma_pago;
      let tipo_factura = resultQuery[0].tipo_factura;
      let numero_factura = resultQuery[0].numero_factura;
      let categoria = resultQuery[0].categoria;


      editComprasFn(fecha,proveedor,descripcion,monto,forma_pago,tipo_factura,numero_factura,categoria)
   }

   const btn_arrow = document.querySelectorAll('.btn_arrow');
   const containerAll = document.querySelectorAll('.container_input_edit');

         let numBtn = 0;

         btn_arrow.forEach((btn)=>{
         
            btn.addEventListener("click",()=>{
                  containerAll.forEach((contain)=>{
                     contain.style.height = "0rem";
                  
                  })
               const containerLab = btn.nextElementSibling;
               
               
                  if(numBtn === btn.name){
                     containerLab.style.height = "0rem";
                     numBtn = 0;
                  }else{
                     numBtn = btn.name;
                     containerLab.style.height = "2.7rem";
                  }
               
               // input_insert_edit.style.top = "0rem";
            })

})


}




getDataToEdit(nameTable,idColumn,idValue);


