

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

let URLhost = (window.location.hostname === 'localhost')?'http://localhost:3111':''



const editGastosFn = ({fecha,categoria,subcategoria,descripcion,monto,forma_pago,proveedor,handleChange,btnEdit,handleClick}) =>{



   return (
      <>

      <div className="form_edit_container">
         <div className="div-form-edit">
            <p className="text_form_input">Fecha</p>
            <input type="text" value={fecha} className="input_data_edit input_form_edit_date" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="1">Editar</button>
            <div className="container_input_edit" name="cont_1">
               <input type="date" id="Fecha" name="fecha" onChange={handleChange} className="input_insert_edit input_insert_date"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Categoria</p>
            <input type="text" value={categoria} className="input_data_edit input_form_edit_categoria" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
            <div className="container_input_edit" name="cont_2">
               
               <select name="categoria" id="Categoria" onChange={handleChange} className="select_edit input_insert_edit select_insert_categoria">
                  <option value="" className="option_category">Seleccionar Categoria</option>
                  <option value="Impuestos y Tasas" className="option_category">Impuestos y Tasas</option>
                  <option value="Gastos de Oficina" className="option_category">Gastos de Oficina</option>
                  <option value="Gastos Operativos" className="option_category">Gastos Operativos</option>
                  <option value="Marketing y Publicidad" className="option_category">Marketing y Publicidad</option>
                  <option value="Gastos Financieros" className="option_category">Gastos Financieros</option>
                  <option value="Otros" className="option_category">Otros</option>
               </select>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Sub Categoria</p>
            <input type="text" value={subcategoria} className="input_data_edit input_form_edit_subcategoria" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="3">Editar</button>
            <div className="container_input_edit" name="cont_3">
   
               <select name="subcategoria" id="Subcategoria" onChange={handleChange} className="select_edit input_insert_edit select_insert_subcategoria">
                  <option value="" className="option_sub_categoria">Seleccionar Sub Categoria</option>
                  <option value="IVA" className="option_sub_categoria">IVA</option>
                  <option value="Ingresos Brutos" className="option_sub_categoria">Ingresos Brutos</option>
                  <option value="Ganancias" className="option_sub_categoria">Ganancias</option>
                  <option value="Tasas Municipales" className="option_sub_categoria">Tasas Municipales</option>
                  <option value="Retenciones" className="option_sub_categoria">Retenciones</option>
                  <option value="Librería" className="option_sub_categoria">Librería</option>
                  <option value="Mantenimiento" className="option_sub_categoria">Mantenimiento</option>
                  <option value="Utilería" className="option_sub_categoria">Utilería</option>
                  <option value="Servicios Públicos" className="option_sub_categoria">Servicios Públicos</option>
                  <option value="Combustibles" className="option_sub_categoria">Combustibles</option>
                  <option value="Reparaciones de Vehículos" className="option_sub_categoria">Reparaciones de Vehículos</option>
                  <option value="Transporte" className="option_sub_categoria">Transporte</option>
                  <option value="Alquileres" className="option_sub_categoria">Alquileres</option>
                  <option value="Sueldos" className="option_sub_categoria">Sueldos</option>
                  <option value="Publicidad Digital" className="option_sub_categoria">Publicidad Digital</option>
                  <option value="Impresión de Materiales" className="option_sub_categoria">Impresión de Materiales</option>
                  <option value="Branding" className="option_sub_categoria">Branding</option>
                  <option value="Comisiones Bancarias" className="option_sub_categoria">Comisiones Bancarias</option>
                  <option value="Intereses" className="option_sub_categoria">Intereses</option>
                  <option value="Tarjetas de Crédito" className="option_sub_categoria">Tarjetas de Crédito</option>
                  <option value="Capacitación" className="option_sub_categoria">Capacitación</option>
                  <option value="Suscripciones" className="option_sub_categoria">Suscripciones</option>
                  <option value="Viajes y Viáticos" className="option_sub_categoria">Viajes y Viáticos</option>
                  <option value="Seguros" className="option_sub_categoria">Seguros</option>
               </select>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Descripcion</p>
            <input type="text" value={descripcion} className="input_data_edit descripcion" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="4">Editar</button>
            <div className="container_input_edit" name="cont_4">
               <input type="text" id="Descripcion" name="descripcion" onChange={handleChange} className="input_insert_edit input_insert_descripcion"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Monto</p>
            <input type="text" value={monto} className="input_data_edit monto" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="5">Editar</button>
            <div className="container_input_edit" name="cont_5">
               <input type="text" id="Monto" name="monto" onChange={handleChange} className="input_insert_edit input_insert_monto"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Metodo de Pago</p>
            <input type="text" value={forma_pago} className="input_data_edit input_form_edit_metodo" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="6">Editar</button>
            <div className="container_input_edit" name="cont_6">
               
               <select name="forma_pago" id="Metodo de Pago" onChange={handleChange} className="select_edit input_insert_edit select_insert_metodo">
                  <option value="" className="option_select_method">Seleccionar Metodo</option>
                  <option value="Efectivo" className="option_select_method">Efectivo</option>
                  <option value="Transferencia" className="option_select_method">Transferencia</option>
                  <option value="Tarjeta" className="option_select_method">Tarjeta</option>
                  <option value="Cheque" className="option_select_method">Cheque</option>
                  <option value="Otro" className="option_select_method">Otro</option>
               </select>

            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Proveedor</p>
            <input type="text" value={proveedor} className="input_data_edit input_form_edit_proveedor" disabled/>
            <button className="btn_arrow btn_arrow_style" name="7">Editar</button>
            <div className="container_input_edit" name="cont_7">
               
               <select name="proveedor" id="Proveedor" onChange={handleChange} className="select_edit input_insert_edit select_insert_proveedor">
                  <option value="" className="option_form_comercio">Seleccionar Proveedor</option>
               </select>

            </div>
         </div>

         <button className="rounded_button btn_edit" onClick={btnEdit} >Editar</button>
      </div>
      
      
      </>
   )
      {/* const select_insert_proveedor = document.querySelector('.select_insert_proveedor');

      (await getDataProveedor()).forEach(prov =>{
         //console.log(prov.nombre_fantacia);

         let provOption = document.createElement("option");
         provOption.classList.add("option_form_proveedores");
         provOption.textContent = prov.nombre_fantacia;
         provOption.value = prov.nombre_fantacia;

         select_insert_proveedor.appendChild(provOption);

      }) */}
   

}

const editComprasFn = ({fecha,proveedor,descripcion,monto,forma_pago,tipo_factura,numero_factura,categoria,handleChange,btnEdit,handleClick}) =>{



   return(
      <>

      <div className="form_edit_container">

         <div className="div-form-edit">
            <p className="text_form_input">Fecha</p>
            <input type="text" value={fecha} className="input_data_edit input_form_edit_date" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="1">Editar</button>
            <div className="container_input_edit" name="cont_1">
               <input type="text" id="Fecha" name="fecha"  onChange={handleChange} className="input_insert_edit input_insert_date"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Proveedor</p>
            <input type="text" value={proveedor} className="input_data_edit input_form_edit_proveedor" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
            <div className="container_input_edit" name="cont_2">
               
               <select name="proveedor" id="proveedor"  onChange={handleChange} className="select_edit input_insert_edit select_insert_proveedor">
                  <option value="" className="option_select_factiacion">Seleccionar Proveedor</option>
               </select>

            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Descripcion</p>
            <input type="text" value={descripcion} className="input_data_edit input_form_edit_description" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="3">Editar</button>
            <div className="container_input_edit" name="cont_3">
               <input type="text" id="Descripcion" name="descripcion" onChange={handleChange} className="input_insert_edit input_insert_descripcion"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Monto</p>
            <input type="text" value={monto} className="input_data_edit input_form_edit_monto" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="4">Editar</button>
            <div className="container_input_edit" name="cont_4">
               <input type="text" id="Monto" name="monto" onChange={handleChange} className="input_insert_edit input_insert_monto"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Metodo de pago</p>
            <input type="text" value={forma_pago} className="input_data_edit input_form_edit_metodo" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="5">Editar</button>
            <div className="container_input_edit" name="cont_5">
               
               <select name="forma_pago" id="forma_pago" onChange={handleChange} className="select_edit input_insert_edit select_insert_metodo">
                  <option value="" className="option_select_add">Selecciona Metodo de Pago</option>
                  <option value="Efectivo" className="option_select_add">Efectivo</option>
                  <option value="Tarjeta" className="option_select_add">Tarjeta</option>
                  <option value="Cheque" className="option_select_add">Cheque</option>
                  <option value="Transferencia" className="option_select_add">Transferencia</option>
                  <option value="Cuenta Corriente" className="option_select_add">Cuenta Corriente</option>
               </select>

            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Factura</p>
            <input type="text" value={tipo_factura} className="input_data_edit input_form_edit_factura" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="6">Editar</button>
            <div className="container_input_edit" name="cont_6">
               <input type="text" id="Factura" name="tipo_factura" onChange={handleChange} className="input_insert_edit input_insert_factura"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Nº Factura</p>
            <input type="text" value={numero_factura} className="input_data_edit input_form_edit_num_factura" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="7">Editar</button>
            <div className="container_input_edit" name="cont_7">
               <input type="text" id="Nº Factura" name="numero_factura" onChange={handleChange} className="input_insert_edit input_insert_factura"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Categoria</p>
            <input type="text" value={categoria} className="input_data_edit input_form_edit_categoria" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="8">Editar</button>
            <div className="container_input_edit" name="cont_8">
               <input type="text" id="categoria" name="categoria" onChange={handleChange} className="input_insert_edit input_insert_categoria"/>
            </div>
         </div>

         <button className="rounded_button btn_edit" onClick={btnEdit} >Editar</button>
      </div>
   </>
   )


}

const editComerciosFn = () =>{

   return ( 
      <>

      <div className="form_add_proveedor">
         <div className="div-form-add">
            <p className="text_form_input">Nombre</p>
            <input type="text" className="input_add input_form_add_name"/>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">Razon Social</p>
            <input type="text" className="input_add input_form_add_razon"/>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">CUIT</p>
            <input type="text" className="input_add input_form_add_cuit"/>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">Regimen</p>
            <select name="" id="" className="select_add select_form_add_regimen">
               <option value="Responsable Inscripto" className="option_select_add">Responsable Inscripto</option>
               <option value="Regimen Simplificado" className="option_select_add">Regimen Simplificado</option>
               <option value="Consumidor Final" className="option_select_add">Consumidor Final</option>
            </select>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">Direccion</p>
            <input type="text" className="input_add input_form_add_direction"/>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">Nº Telefono</p>
            <input type="text" className="input_add input_form_add_phone"/>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">E-mail</p>
            <input type="text" className="input_add input_form_add_email"/>
         </div>
         <div className="div-form-add">
            <p className="text_form_input">Fecha Ingreso</p>
            <input type="date" className="input_add input_form_add_dateIng"/>
         </div>

         <button className="rounded_button btn_add_proveedor">Agregar</button>
      </div>
      </>
)



}

const editProveedoresFn = ({nombre_fantacia,razon_social,cuit,direccion,telefono,email,handleChange,btnEdit,handleClick}) =>{


   return( 
      <>

         <div className="form_edit_container">
            <div className="div-form-edit">
               <p className="text_form_input">Nombre</p>
               <input type="text" name="Nombre" value={nombre_fantacia} className="input_data_edit input_form_edit_name" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="1">Editar</button>
               <div className="container_input_edit" name="cont_1">
                  <input type="text" id="Nombre" name="nombre_fantacia" onChange={handleChange} className="input_insert_edit input_insert_name"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Razon Social</p>
               <input type="text" name="Razon Social" value={razon_social} className="input_data_edit input_form_edit_razon" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
               <div className="container_input_edit" name="cont_2">
                  <input type="text" id="Razon Social" name="razon_social" onChange={handleChange} className="input_insert_edit input_insert_razon"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">CUIT</p>
               <input type="text" name="CUIT" value={cuit} className="input_data_edit input_form_edit_cuit" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="3">Editar</button>
               <div className="container_input_edit" name="cont_3">
                  <input type="text" id="CUIT" name="cuit" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Direccion</p>
               <input type="text" name="Direccion" value={direccion} className="input_data_edit input_form_edit_direction" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="4">Editar</button>
               <div className="container_input_edit" name="cont_4">
                  <input type="text" id="Direccion" name="direccion" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Nº Telefono</p>
               <input type="text" name="Nº Telefono" value={telefono} className="input_data_edit input_form_edit_phone" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="5">Editar</button>
               <div className="container_input_edit" name="cont_5">
                  <input type="text" id="Nº Telefono" name="telefono" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">E-mail</p>
               <input type="text" name="e-mail" value={email} className="input_data_edit input_form_edit_email" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="6">Editar</button>
               <div className="container_input_edit" name="cont_6">
                  <input type="text" id="e-mail" name="email" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>

            <button className="rounded_button btn_edit" onClick={btnEdit} >Editar</button>
         </div>
      </>
)
}

const editVentasFn = ({fecha,comercio,personal,venta_cuenta_corriente,venta_efectivo,venta_tarjeta,handleChange,btnEdit,handleClick}) =>{


   return ( 
      <>

      <div className="form_edit_container">
         <div className="div-form-edit">
            <p className="text_form_input">Fecha</p>
            <input type="text" value={fecha} className="input_data_edit input_form_edit_date" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="1">Editar</button>
            <div className="container_input_edit" name="cont_1">
               <input type="date" id="Fecha" name="fecha" onChange={handleChange} className="input_insert_edit input_insert_date"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Titular</p>
            <input type="text" value={personal} className="input_data_edit input_form_edit_personal" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
            <div className="container_input_edit" name="cont_4">
               
               <select name="personal" id="Titular" onChange={handleChange} className="select_edit input_insert_edit select_insert_personal">
                  <option value="" className="option_form_personal">Seleccionar Titular</option>
               </select>

            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Comercio</p>
            <input type="text" value={comercio} className="input_data_edit input_form_edit_comercio" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
            <div className="container_input_edit" name="cont_4">
               
               <select name="comercio" id="Comercio" className="select_edit input_insert_edit select_insert_comercio">
                  <option value="" onChange={handleChange} className="option_form_comercio">Seleccionar Comercio</option>
               </select>

            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Monto Efectivo</p>
            <input type="text" value={venta_efectivo} className="input_data_edit input_form_edit_efectivo" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="5">Editar</button>
            <div className="container_input_edit" name="cont_5">
               <input type="text" id="Monto Efectivo" onChange={handleChange} name="venta_efectivo" className="input_insert_edit input_insert_cuit"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Monto Tarjeta</p>
            <input type="text" value={venta_tarjeta} className="input_data_edit input_form_edit_tarjeta" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="6">Editar</button>
            <div className="container_input_edit" name="cont_6">
               <input type="text" id="Monto Tarjeta" onChange={handleChange} name="venta_tarjeta" className="input_insert_edit input_insert_cuit"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Monto Cuenta Corriente</p>
            <input type="text" value={venta_cuenta_corriente} className="input_data_edit input_form_edit_cta_cte" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="7">Editar</button>
            <div className="container_input_edit" name="cont_7">
               <input type="text" id="Monto Cta Cte" onChange={handleChange} name="venta_cuenta_corriente" className="input_insert_edit input_insert_cuit"/>
            </div>
         </div>


         <button className="rounded_button btn_edit" onClick={btnEdit} >Editar</button>
      </div>
      </>
)




 
      {/* const select_insert_comercio = document.querySelector('.select_insert_comercio');

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
       */}



}


const editClienteFn =  ({nombre_fantacia_cl,razon_social_cl,cuit_cl,direccion_cl,telefono_cl,email_cl,fecha_ingreso_cl,facturacion,handleChange,btnEdit,handleClick}) =>{




   return (

      <>

      <div className="form_edit_container">
         <div className="div-form-edit">
            <p className="text_form_input">Nombre</p>
            <input type="text" value={nombre_fantacia_cl} className="input_data_edit input_form_edit_name" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="1">Editar</button>
            <div className="container_input_edit" name="cont_1">
               <input type="text" id="Nombre" name="nombre_fantacia_cl" onChange={handleChange} className="input_insert_edit input_insert_name"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Razon Social</p>
            <input type="text" value={razon_social_cl} className="input_data_edit input_form_edit_razon" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
            <div className="container_input_edit" name="cont_2">
               <input type="text" id="Razon Social" name="razon_social_cl" onChange={handleChange} className="input_insert_edit input_insert_razon"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">CUIT</p>
            <input type="text" value={cuit_cl} className="input_data_edit input_form_edit_cuit" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="3">Editar</button>
            <div className="container_input_edit" name="cont_3">
               <input type="text" id="CUIT" name="cuit_cl" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Direccion</p>
            <input type="text" value={direccion_cl} className="input_data_edit input_form_edit_direccion" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="4">Editar</button>
            <div className="container_input_edit" name="cont_4">
               <input type="text" id="Direccion" name="direccion_cl" onChange={handleChange} className="input_insert_edit input_insert_direccion"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Nº Telefono</p>
            <input type="text" value={telefono_cl} className="input_data_edit input_form_edit_phone" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="5">Editar</button>
            <div className="container_input_edit" name="cont_5">
               <input type="text" id="Nº Telefono" name="telefono_cl" onChange={handleChange} className="input_insert_edit input_insert_phone"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">E-mail</p>
            <input type="text" value={email_cl} className="input_data_edit input_form_edit_email" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="6">Editar</button>
            <div className="container_input_edit" name="cont_6">
               <input type="text" id="e-mail" name="email_cl" onChange={handleChange} className="input_insert_edit input_insert_email"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Fecha Ingreso</p>
            <input type="text" value={fecha_ingreso_cl} className="input_data_edit input_form_edit_email" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="7">Editar</button>
            <div className="container_input_edit" name="cont_7">
               <input type="text" id="Fecha Ingreso" onChange={handleChange} name="fecha_ingreso_cl" className="input_insert_edit input_insert_email"/>
            </div>
         </div>

         <div className="div-form-edit">
            <p className="text_form_input">Regimen</p>
            <input type="text" value={facturacion} className="input_data_edit input_form_edit_facturacion" disabled/>
            <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="8">Editar</button>
            <div className="container_input_edit" name="cont_8">
               
               <select name="facturacion" id="Regimen" onChange={handleChange} className="select_edit input_insert_edit select_insert_facturacion">
                  <option value="" className="option_select_factiacion">Seleccionar Regimen</option>
                  <option value="Responsable Inscripto" className="option_select_factiacion">Responsable Inscripto</option>
                  <option value="Regimen Simplificado" className="option_select_factiacion">Regimen Simplificado</option>
                  <option value="Consumidor Final" className="option_select_factiacion">Consumidor Final</option>
               </select>

            </div>
         </div>

         <button className="rounded_button btn_edit" onClick={btnEdit} >Editar</button>
      </div>
      
      </>
   
   )


}


const editPersonalFn = ({apellido,cargo,direccion,fecha_ingreso,nombre,telefono,handleChange,btnEdit,handleClick}) =>{

   return(
      
      <>

         <div className="form_edit_container">
            <div className="div-form-edit">
               <p className="text_form_input">Nombre</p>
               <input type="text" value={nombre} className="input_data_edit input_form_edit_name" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="1">Editar</button>
               <div className="container_input_edit" name="cont_1">
                  <input type="text" id="Nombre" name="nombre" onChange={handleChange} className="input_insert_edit input_insert_name"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Apellido</p>
               <input type="text" value={apellido} className="input_data_edit input_form_edit_surname" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="2">Editar</button>
               <div className="container_input_edit" name="cont_2">
                  <input type="text" id="Apellido" name="apellido" onChange={handleChange} className="input_insert_edit input_insert_surname"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Cargo</p>
               <input type="text" value={cargo} className="input_data_edit input_form_edit_role" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="3">Editar</button>
               <div className="container_input_edit" name="cont_4">

                  <select name="cargo" id="Cargo" onChange={handleChange} className="select_edit input_insert_edit select_insert_role">
                     <option value="" className="option_form_role">Seleccionar Cargo</option>
                     <option value="Director" className="option_form_role">Director</option>
                     <option value="Gerente" className="option_form_role">Gerente</option>
                     <option value="Administrador" className="option_form_role">Administrador</option>
                     <option value="Cajero" className="option_form_role">Cajero</option>
                     <option value="Operario" className="option_form_role">Operario</option>
                  </select>

               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Direccion</p>
               <input type="text" value={direccion} className="input_data_edit input_form_edit_direction" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="4">Editar</button>
               <div className="container_input_edit" name="cont_5">
                  <input type="text" id="Direccion" name="direccion" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">Nº Telefono</p>
               <input type="text" value={telefono} className="input_data_edit input_form_edit_phone" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="5">Editar</button>
               <div className="container_input_edit" name="cont_6">
                  <input type="text" id="Nº Telefono" name="telefono" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>

            <div className="div-form-edit">
               <p className="text_form_input">E-mail</p>
               <input type="text" value="" className="input_data_edit input_form_edit_email" disabled/>
               <button className="btn_arrow btn_arrow_style" onClick={handleClick} name="6">Editar</button>
               <div className="container_input_edit" name="cont_7">
                  <input type="text" id="e-mail" name="email" onChange={handleChange} className="input_insert_edit input_insert_cuit"/>
               </div>
            </div>


            <button className="rounded_button btn_edit" onClick={btnEdit} >Editar</button>
         </div>
      </>
      
   );
     // main_form_edit.innerHTML = structur;

}


const editComponent = {
   gastos : editGastosFn,
   compras : editComprasFn,
   comercios : editComerciosFn,
   proveedores : editProveedoresFn,
   cajas : editVentasFn,
   clientes : editClienteFn,
   personal : editPersonalFn,

}


export default editComponent;