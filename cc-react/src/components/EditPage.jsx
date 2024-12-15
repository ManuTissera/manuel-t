
// Lucia Torres Operario 2019-06-14 011-1234-5678 Calle Independencia 807

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS-Files/EditPage.css'
import chebronBack from '../Assets/icons/chevron_back.svg'
import personEditIcon from '../Assets/icons/person_edit-40px.svg'
import editComponent from './StructureEditPage';

let URLhost = (window.location.hostname === 'localhost')?'http://localhost:3111':''


const EditPage = () => {

   const  tableConfig = {  
      personal:['apellido','cargo','direccion','fecha_ingreso','nombre','telefono'],
      cajas:['fecha','comercio','personal','venta_cuenta_corriente','venta_efectivo','venta_tarjeta'],
      clientes:['nombre_fantacia_cl','razon_social_cl','cuit_cl','direccion_cl','telefono_cl','email_cl','fecha_ingreso_cl','facturacion'],
      compras:['fecha','proveedor','descripcion','monto','forma_pago','tipo_factura','numero_factura','categoria'],
      gastos:['fecha','categoria','subcategoria','descripcion','monto','forma_pago','proveedor'],
      proveedores:['nombre_fantacia','razon_social','cuit','direccion','telefono','email'],
   }

   const [dataElement,setDataElement] = useState({})
   const [tableNameLoad,setTableNameLoad] = useState('');
   const [dataEdit,setDataEdit] = useState() // const [dataEdit,setDataEdit] = useState()
   const [previousElement,setPreviousElement] = useState(null)
   const [isVisibleModal,setIsVisibleModal] = useState('modal-hidden');
   const { tableName,id_column, id } = useParams(); 
   const navigate = useNavigate()
   const SelectedComponent  = editComponent[tableName]

   const dataConfirm = (dataEdit === undefined)?['Sin Modificaiones Realizadas']:Object.keys(dataEdit)


   const handleClick = (e) => {
      console.log('Button : ',e.target.name)

      const actualElement = e.target.nextElementSibling

      actualElement.classList.remove('container-close');
      actualElement.classList.add('container-open');

      if(previousElement !== null){
         previousElement.classList.remove('container-open')
         previousElement.classList.add('container-close')
      }

      // console.log('Actual Element = ',actualElement)
      // console.log('Previous Element = ',previousElement)
      setPreviousElement(actualElement)
   }

   const handleChange = (e) => {
      setDataEdit({
         ...dataEdit,
         [e.target.name]:e.target.value,
      })
   }

   const btnEdit = async () => {
      console.log(dataEdit)
      setIsVisibleModal('modal-visible')

   }

   const editFunction = async () => {
      setIsVisibleModal('modal-hidden')
      try{
         const result = await fetch(`${URLhost}/edit_element`,{
            method:'PATCH',
            body:JSON.stringify({
               "table": tableName,
               "dataChange": dataEdit,
               "idColumn": id_column,
               "id": id,
            }),
            headers: { 'Content-type':'application/json' }
         }).then(res=>res.text()).then(data=>data)
         console.log(result)
      }catch(err){
         console.error('Error fetch /edit_element ',err)
      }
   }

      
   const selectdStructureFn = () =>{
      const fields = tableConfig[tableName];
      if(!fields) return null;

      const props = fields.reduce((acc,field) => {
         acc[field] = dataElement[field] || '';
         return acc;
      },{});


      return <SelectedComponent {...props} handleChange={handleChange} btnEdit={btnEdit} handleClick={handleClick} /> 
   }

  

   useEffect(()=>{
      

      const getDataToEdit = async () =>{
            try{
               let result = await fetch(`http://localhost:3111/view_data_edit`,{
                  method:'POST',
                  body: JSON.stringify({
                     "table":tableName,
                     "column": id_column,
                     "id":id
                  }),
                  headers: {'Content-type':'application/json'}
               }).then(res=>res.json()).then(data=>data);
            
               setDataElement(result[0])
            }catch(err){
               console.error('Error en el fetch data ', err);
            }finally{
               setTableNameLoad(tableName)
            }
         }
      
         getDataToEdit();
      },[tableName]
   )

   const handleBack = () =>{
      navigate(`/table/${tableName}`);
   }
   
   if(dataElement.length === 0){
      return
   }

   return (
     <div>
           {/* -------   MODAL CONFIRMACION  ------ */}

            <div className={`background_opacity ${isVisibleModal}`}>
               <div className={`modal-confirm modal_confirm  ${isVisibleModal}`}>
                  <div className="circle-container-icon">
                     <img className="img_add_person" src={personEditIcon} alt=""/>
                  </div>
                  <h4 className="h4-modal-confirm">Datos Editar</h4>
                  <div className="container_data_change">
                     {dataConfirm.map((data,index) => {
                        console.log(data)
                        if(data === 'Sin Modificaiones Realizadas'){
                           return(
                              <p key={index} className="p_msg_edit p_msg_confirm_add_prov">
                                 {data}
                              </p>
                           )
                        }else{
                           return(
                              <p key={index} className="p_msg_edit p_msg_confirm_add_prov">
                                  <b>{data}: </b>{dataEdit[data]}
                              </p>
                           )
                        }
                        // console.log(dataEdit[data])
  
                     })}
                  </div>
                  <article className="article-btn-modal-confirm">
                     <button className="button-modal-confirm btn_cancel_edit"  >Cancelar</button>
                     <button className="button-modal-confirm btn_acept_edit" onClick={editFunction} >Agregar</button>
                  </article>       
               </div>
            </div>
            
         {/* -------     HEADER    -------- */}
            
         <header className="header-form">
            <div className="container-header-form">
               <h2 className="h2-header-form">Editar</h2>
            </div>
         </header>
            
         {/* ---------- FORM -------- */}
            
         <main className="main_form_edit">
         <div className="container_name_table">Personal</div>
         <section className="section_main_add_proveedor">
            <div onClick={handleBack} className="div_back_add_proveedor">
               <img src={chebronBack} alt=""/>
               <p className="p_back_add_proveedor">Volver</p>
            </div>
         </section>
            { selectdStructureFn()}
         </main>
       
     </div>
   );
 };
 

export default EditPage;


