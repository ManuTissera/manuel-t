
import { useState } from "react"

let URLhost = (window.location.hostname === 'localhost')?'http://localhost:3111':''


// Listo el CSS y servidor
const strAddProveedor = () => {

   const [formData,setFormData] = useState({
         nombre_fantacia: '',
         razon_social: '',
         cuit: '',
         direccion: '',
         telefono: '',
         email: ''
       
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }
   const addData = async () => {

      console.log(formData);

      try{
         const result = await fetch(`http://localhost:3111/add_proveedor`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-type': 'application/json' },
         }).then(res=>res.text()).then(data=>data);
         console.log(result)

      }catch(err){
         console.error('Error fetch /add_proveedor')
      }

   }
   
   return(
      <>
      <div className="form_add_element">
         <div className="div-form-add-proveedor">
            <p className="text_form_input">Nombre</p>
            <input type="text" name="nombre_fantacia" onChange={handleChange} className="input_add input_form_prov_name"/>
         </div>
         <div className="div-form-add-proveedor">
            <p className="text_form_input">Razon Social</p>
            <input type="text" name="razon_social" onChange={handleChange} className="input_add input_form_prov_razon"/>
         </div>
         <div className="div-form-add-proveedor">
            <p className="text_form_input">CUIT</p>
            <input type="text" name="cuit" onChange={handleChange} className="input_add input_form_prov_cuit"/>
         </div>
         <div className="div-form-add-proveedor">
            <p className="text_form_input">Direccion</p>
            <input type="text" name="direccion" onChange={handleChange} className="input_add input_form_prov_direction"/>
         </div>
         <div className="div-form-add-proveedor">
            <p className="text_form_input">Nº Telefono</p>
            <input type="text" name="telefono" onChange={handleChange} className="input_add input_form_prov_phone"/>
         </div>
         <div className="div-form-add-proveedor">
            <p className="text_form_input">E-mail</p>
            <input type="text" name="email" onChange={handleChange} className="input_add input_form_prov_email"/>
         </div>
         <button className="rounded_button btn_add_element" onClick={addData}>Agregar</button>
      </div>
   </>
   )
}

// Listo el CSS y sevidor 
const strAddClient = () => {

   const [formData,setFormData] = useState({
      name:'',
      razon:'',
      cuit:'',
      regimen:'',
      direction:'',
      phone:'',
      email:'',
      dateIng:'',
   })

   const handleChange = (e) =>{
      setFormData({
         ...formData,
         [e.target.name]:e.target.value,
      })
   }

   const addData = async () =>{
      console.log('data',formData)

      try{
         const result = await fetch(`${URLhost}/add_cliente`,{
            method:'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-type':'application/json' }
         }).then(res=>res.text()).then(data=>data)
         console.log(result)
      }catch(err){
         console.error('Error fetch /add_cliente',err)
      }
   }

   return(
      
         <>

            <div className="form_add_element">

               <div className="div-form-add-cliente">
                  <p className="text_form_input">Fecha Ingreso</p>
                  <input type="date" name="dateIng" onChange={handleChange} className="input_add input_form_add_dateIng"/>
               </div>

               <div className="div-form-add-cliente">
                  <p className="text_form_input">Nombre Fantasia</p>
                  <input type="text" name="name" onChange={handleChange} className="input_add input_form_add_name"/>
               </div>
               <div className="div-form-add-cliente">
                  <p className="text_form_input">Razon Social</p>
                  <input type="text" name="razon" onChange={handleChange} className="input_add input_form_add_razon"/>
               </div>
               <div className="div-form-add-cliente">
                  <p className="text_form_input">CUIT</p>
                  <input type="text" name="cuit" onChange={handleChange} className="input_add input_form_add_cuit"/>
               </div>
               <div className="div-form-add-cliente">
                  <p className="text_form_input">Regimen</p>
                  <select id="" name="regimen" onChange={handleChange} className="select_add select_form_add_regimen">
                     <option value="Responsable Inscripto" className="option_select_add">Responsable Inscripto</option>
                     <option value="Regimen Simplificado" className="option_select_add">Regimen Simplificado</option>
                     <option value="Consumidor Final" className="option_select_add">Consumidor Final</option>
                  </select>
               </div>
               <div className="div-form-add-cliente">
                  <p className="text_form_input">Direccion</p>
                  <input type="text" name="direction" onChange={handleChange} className="input_add input_form_add_direction"/>
               </div>
               <div className="div-form-add-cliente">
                  <p className="text_form_input">Nº Telefono</p>
                  <input type="text" name="phone" onChange={handleChange} className="input_add input_form_add_phone"/>
               </div>
               <div className="div-form-add-cliente">
                  <p className="text_form_input">E-mail</p>
                  <input type="text" name="email" onChange={handleChange} className="input_add input_form_add_email"/>
               </div>


               <button className="rounded_button btn_add_element" onClick={addData}>Agregar</button>
            </div>
      </>
   )
}

// Listo el CSS y servidor 
const strAddCompras = () => {

   const [dataForm,setDataForm] = useState({
      fecha : '',
      proveedor : '',
      categoria : '',
      descripcion : '',
      monto : '',
      forma_pago : '',
      tipo_factura : '',
      numero_factura : '',
   })

   const handleChange = (e) => {
      setDataForm({
         ...dataForm,
         [e.target.name]: e.target.value,
      
      })
   }

   const addData = async () => {
      console.log(dataForm)

      try{
         const result = await fetch(`${URLhost}/add_compra`,{
            method:'POST',
            body: JSON.stringify(dataForm),
            headers: { 'Content-type':'application/json' }
         }).then(res=>res.text()).then(data=>data)
         console.log(result)
      }catch(err){
         console.error('Erro fetch /add_compra ',err);
      }
   }


   return(

      <>
      <div className="form_add_element">
         <div className="div-form-add-compras">
            <p className="text_form_input">Fecha </p>
            <input type="date" name="fecha" onChange={handleChange} className="input_add input_form_add_date"/>
         </div>

         <div className="div-form-add-compras">
            <p className="text_form_input">Proveedor</p>
            <select  id="" name="proveedor" onChange={handleChange} className="select_add select_form_add_proveedor">
               <option value="" className="option_select_add">Selecciona Proveedor</option>
               <option value="Los Locos" className="option_select_add">Los Locos</option>
               <option value="Bebidas" className="option_select_add">Bebidas</option>
               <option value="Bebidas" className="option_select_add">Bebidas</option>

            </select>
         </div>

         <div className="div-form-add-compras">
            <p className="text_form_input">Categoria</p>
            <select  id="" name="categoria" onChange={handleChange} className="select_add select_form_add_categoria">
               <option value="" className="option_select_add">Seleccionar Categoria</option>
               <option value="Bebidas" className="option_select_add">Bebidas</option>
               <option value="Lacteos" className="option_select_add">Lacteos</option>
               <option value="Alimentos" className="option_select_add">Alimentos</option>
               <option value="Productos Frescos" className="option_select_add">Productos Frescos</option>
               <option value="Limpieza" className="option_select_add">Limpieza</option>
            </select>
         </div>

         <div className="div-form-add-compras">
            <p className="text_form_input">Descripcion</p>
            <input type="text" name="descripcion" onChange={handleChange} className="input_add input_form_add_descripcion"/>
         </div>
         
         <div className="div-form-add-compras">
            <p className="text_form_input">Monto</p>
            <input type="text" name="monto" onChange={handleChange} className="input_add input_form_add_monto"/>
         </div>

         <div className="div-form-add-compras">
            <p className="text_form_input">Metodo de pago</p>
            <select id="" name="forma_pago" onChange={handleChange} className="select_add select_form_add_metodo">
               <option value="" className="option_select_add">Selecciona Metodo de Pago</option>
               <option value="Efectivo" className="option_select_add">Efectivo</option>
               <option value="Tarjeta" className="option_select_add">Tarjeta</option>
               <option value="Cheque" className="option_select_add">Cheque</option>
               <option value="Transferencia" className="option_select_add">Transferencia</option>
               <option value="Cuenta Corriente" className="option_select_add">Cuenta Corriente</option>
            </select>
         </div>

         <div className="div-form-add-compras">
         <p className="text_form_input">Factura</p>
            <select id="" name="tipo_factura" onChange={handleChange} className="select_add select_form_add_factura">
               <option value="" className="option_select_add">Seleccionar Factura</option>
               <option value="Factura A" className="option_select_add">Factura A</option>
               <option value="Factura B" className="option_select_add">Factura B</option>
               <option value="Factura C" className="option_select_add">Factura C</option>
               <option value="Factura M" className="option_select_add">Factura M</option>
            </select>
         </div>

         <div className="div-form-add-compras">
            <p className="text_form_input">Nº Factura</p>
            <input type="text" name="numero_factura" onChange={handleChange} className="input_add input_form_add_num_fact"/>
         </div>
         
         <button className="rounded_button btn_add_element" onClick={addData} >Agregar</button>
      </div>
   </>

   )
}

// Listo el CSS y servidor
const strAddPersonal = () =>{

   const [formData,setFormData] = useState({
      date : '',
      namePersonal : '',
      surname : '',
      role : '',
      phone : '',
      direction : '',
   })

   const handleChange = (e) =>{
      setFormData({
         ...formData,
         [e.target.name]:e.target.value
      })
   }

   const addData = async () =>{
      console.log(formData)

      try{
         const result = await fetch(`${URLhost}/add_personal`,{
            method: 'POST',
            body:JSON.stringify(formData),
            headers: { 'Content-type':'application/json' }
         }).then(res=>res.text()).then(data=>data);
         console.log(result)
      }catch(err){
         console.error('Error fetch /add_personal',err)
      }
   }


   return( 
      <>

         <div className="form_add_element">

            <div className="div-form-add-personal">
               <p className="text_form_input">Fecha Ingreso</p>
               <input type="date" name="date" onChange={handleChange} className="input_add input_form_add_dateIng"/>
            </div>

            <div className="div-form-add-personal">
               <p className="text_form_input">Nombre</p>
               <input type="text" name="namePersonal" onChange={handleChange} className="input_add input_form_add_nombre"/>
            </div>

            <div className="div-form-add-personal">
               <p className="text_form_input">Apellido</p>
               <input type="text" name="surname" onChange={handleChange} className="input_add input_form_add_apellido"/>
            </div>

            <div className="div-form-add-personal">
               <p className="text_form_input">Cargo</p>
               <select id="" name="role" onChange={handleChange} className="select_add select_form_add_cargo">
                  <option value="" className="option_select_add">Seleccionar Cargo</option>
                  <option value="Director" className="option_select_add">Director</option>
                  <option value="Administrador" className="option_select_add">Administrador</option>
                  <option value="Cajero" className="option_select_add">Cajero</option>
                  <option value="Operario" className="option_select_add">Operario</option>
               </select>
            </div>

            <div className="div-form-add-personal">
               <p className="text_form_input">Nº Telefono</p>
               <input type="text" name="phone" onChange={handleChange} className="input_add input_form_add_phone"/>
            </div>

            <div className="div-form-add-personal">
               <p className="text_form_input">Direccion</p>
               <input type="text" name="direction" onChange={handleChange}  className="input_add input_form_add_direction"/>
            </div>

            <button className="rounded_button btn_add_element" onClick={addData} >Agregar</button>
         </div>
      </>
   )

}

// Listo el CSS y servidor
const strAddGastos = () =>{

   const [formData,setFormData] = useState({

      date : '',
      category : '',
      subCategory : '',
      description : '',
      amount : '',
      method : '',
      proveedor : '',

   })

   const handleChange = (e) =>{
      setFormData({
         ...formData,
         [e.target.name]:e.target.value,
      })
   }

   const addData = async () =>{
      console.log(formData)

      try{
         const result = await fetch(`${URLhost}/add_gasto`,{
            method: 'POST',
            body:JSON.stringify(formData),
            headers: { 'Content-type':'application/json' }
         }).then(res=>res.text()).then(data=>data);
         console.log(result)
      }catch(err){
         console.error('Error fetch /add_gasto',err)
      }
   }

   return( 
      <>

         <div className="form_add_element">

            <div className="div-form-add-gastos">
               <p className="text_form_input">Fecha</p>
               <input type="date" name="date" onChange={handleChange} className="input_add input_form_add_fecha"/>
            </div>

            <div className="div-form-add-gastos">
               <p className="text_form_input p_form_add_gasto">Categoria</p>
               <select className="select_add select_category" onChange={handleChange}  name="category" id="category">
                  <option value="" className="option_category">Seleccionar Categoria</option>
                  <option value="Impuestos y Tasas" className="option_category">Impuestos y Tasas</option>
                  <option value="Gastos de Oficina" className="option_category">Gastos de Oficina</option>
                  <option value="Gastos Operativos" className="option_category">Gastos Operativos</option>
                  <option value="Marketing y Publicidad" className="option_category">Marketing y Publicidad</option>
                  <option value="Gastos Financieros" className="option_category">Gastos Financieros</option>
                  <option value="Otros" className="option_category">Otros</option>
               </select>
            </div>

            <div className="div-form-add-gastos">
               <p className="text_form_input p_form_add_gasto">Sub Categoria</p>
               <select className="select_add select_sub_categoria" onChange={handleChange} name="subCategory" id="subCategory">
                  <option value="IVA" className="option_sub_categoria">Seleccionar Sub Categoria</option>
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

            <div className="div-form-add-gastos">
               <p className="text_form_input p_form_add_gasto">Descripcion</p>
               <input name="description" onChange={handleChange} className="input_add input_form_description" type="text"/>
            </div>

            <div className="div-form-add-gastos">
               <p className="text_form_input p_form_add_gasto">Monto</p>
               <input name="amount" onChange={handleChange} className="input_add input_form_amount" type="text"/>
            </div>

            <div className="div-form-add-gastos">
               <p className="text_form_input p_form_add_gasto">Forma Pago</p>
               <select name="method" id="" onChange={handleChange} className="select_add select_element">
                  <option value="" className="option_select_element">Seleccionar element</option>
                  <option value="Efectivo" className="option_select_element">Efectivo</option>
                  <option value="Tarjeta" className="option_select_element">Tarjeta</option>
                  <option value="Transferencia" className="option_select_element">Transferencia</option>
                  <option value="Cheque" className="option_select_element">Cheque</option>
               </select>
            </div>

            <div className="div-form-add-compras">
            <p className="text_form_input">Proveedor</p>
            <select  id="" name="proveedor" onChange={handleChange} className="select_add select_form_add_proveedor">
               <option value="" className="option_select_add">Selecciona Proveedor</option>
               <option value="Los Locos" className="option_select_add">Los Locos</option>
               <option value="Bebidas" className="option_select_add">Bebidas</option>
               <option value="Bebidas" className="option_select_add">Bebidas</option>

            </select>
         </div>

            <button className="rounded_button btn_add_element" onClick={addData} >Agregar</button>
         </div>
      </>
   )

}

// Listo el CSS y servidor
const strAddCajas = () =>{

      const [formData,setFormData] = useState({
         date : '',
         turno : '',
         titular : '',
         comercio : '',
         efectivo : '',
         tarjeta : '',
         ctaCte : '',
      })

      const handleChange = (e) => {
         setFormData({
            ...formData,
            [e.target.name]:e.target.value,
         })
      }

      const addData = async () => {
         console.log(formData)

         try{
            const result = await fetch(`${URLhost}/add_cajas`,{
               method: 'POST',
               body:JSON.stringify(formData),
               headers: { 'Content-type':'application/json' }
            }).then(res=>res.text()).then(data=>data);
            console.log(result)
         }catch(err){
            console.error('Error fetch /add_cajas',err)
         }

      }

   return( 
      <>

         <div className="form_add_element">

            <div className="div-form-add-cajas">
               <p className="text_form_input">Fecha</p>
               <input type="date" name="date" onChange={handleChange} className="input_add input_form_add_fecha"/>
            </div>

            {/* <div className="div-form-add-cajas">
               <p className="text_form_input p_form_add_caja">Turno</p>
               <div className="div_form_turn">
                  <input id="M" value="M" name="turno" type="radio"/>
                  <label for="M">Mañana</label>
                  <input id="T" value="T" name="turno" type="radio"/>
                  <label for="T">Tarde</label>
               </div>
            </div> */}


            <div className="div-form-add-cajas">
               <p className="text_form_input p_form_add_caja">Titular</p>
               <select onChange={handleChange} className="select_add select_form_cajas_titular" name="titular" id="titular">
                  <option value="">Seleccione Responsable</option>
                  <option value="Juan">Juan</option>
                  <option value="María">María</option>
                  <option value="Carlos">Carlos</option>
                  <option value="Laura">Laura</option>
                  <option value="Roberto">Roberto</option>
                  <option value="Ana">Ana</option>
               </select>
            </div>

            <div className="div-form-add-cajas">
               <p className="text_form_input p_form_add_caja">Comercios</p>
               <select onChange={handleChange} className="select_add select_form_cajas_comercio" name="comercio" id="comercio">
                  <option value="">Seleccione Comercio</option>
                  <option value="Carnicería El Corte">Carnicería El Corte</option>
                  <option value="La Buena Carne">La Buena Carne</option>
                  <option value="Supermercado Los Vecinos">Supermercado Los Vecinos</option>
                  <option value="Minimercado El Ahorro">Minimercado El Ahorro</option>
                  <option value="Mercado del Barrio">Mercado del Barrio</option>
                  <option value="Super Chicos">Super Chicos</option>
               </select>
            </div>

            <div className="div-form-add-cajas">
               <p className="text_form_input p_form_add_caja">Efectivo</p>
               <input name="efectivo" onChange={handleChange} className="input_add input_form_caja_efectivo" type="text"/> 
            </div>

            <div className="div-form-add-cajas">
               <p className="text_form_input p_form_add_caja">Tarjeta</p>
               <input name="tarjeta" onChange={handleChange} className="input_add input_form_cajas_tarjeta" type="text"/>
            </div>

            <div className="div-form-add-cajas">
               <p className="text_form_input p_form_add_caja">Cuenta Corriente</p>
               <input name="ctaCte" onChange={handleChange} className="input_add input_form_cta_cte" type="text"/>
            </div>

            <button className="rounded_button btn_add_element" onClick={addData} >Agregar</button>
         </div>
      </>
   )
}


const selectedStrAdd = {
   clientes: strAddClient,
   personal: strAddPersonal,
   proveedores: strAddProveedor,
   compras: strAddCompras,
   gastos: strAddGastos,
   cajas: strAddCajas,
}

export default selectedStrAdd;