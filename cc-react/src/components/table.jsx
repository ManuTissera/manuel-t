
import { useEffect, useState, useCallback, memo } from 'react'; 
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS-Files/tables.css'
import printIcon from '../Assets/icons/print.svg'
import downloadIcon from '../Assets/icons/download.svg'
import filterIcon from '../Assets/icons/filter_2.svg'
import deleteIcon from '../Assets/icons/delete_caja.svg'
import warningIcon from '../Assets/icons/circle_warning.svg'

let URLhost = (window.location.hostname === 'localhost')?'http://localhost:3111':''

// let dataTableStructure = { 
//    personal:['Nombre','Apellido','Cargo','Fecha Ingreso','Telefono','Direccion'],
//    cajas:['Fecha','Turno','Titular','Comercio','Eft Sis','Tar Sis','CCa Sis'],
//    clientes:['Nombre Fantasia','Razon Social','CUIT','Direccion','N° Telefono','E-mail','Ingreso','Regimen'],
//    compras:['Fecha','Proveedor','Descripcion','Monto','Metodo','Fact.','Num. Fact.','Categoria'],
//    gastos:['Fecha','Categoria','Subcategoria','Descripcion','Monto','Metodo Pago','Proveedor'],
//    personal:['Nombre','Apellido','Cargo','Fecha Ingreso','Telefono','Direccion'],
//    proveedores:['Nombre Fantasia','Razon Social','CUIT','Direccion','N° Telefono','E-mail'],

// }



let dataTableStructure = {   
      inicio:{
         header:[],
         body:[],
      },

      personal:{
         header:['Nombre','Apellido','Cargo','Fecha Ingreso','Telefono','Direccion'],
         body:['nombre','apellido','cargo','fecha_ingreso','telefono','direccion'],
         id:'id_personal',
         fecha:'fecha_ingreso',
      },
      cajas:{
         header:['Fecha','Titular','Comercio','Eft Sis','Tar Sis','CCa Sis'],
         body:['fecha','personal','comercio','venta_efectivo','venta_tarjeta','venta_cuenta_corriente'],
         id:'id',
         fecha:'fecha'
      },
      clientes:{
         header:['Nombre Fantasia','Razon Social','CUIT','Direccion','N° Telefono','E-mail','Ingreso','Regimen'],
         body:['nombre_fantacia_cl','razon_social_cl','cuit_cl','direccion_cl','telefono_cl','email_cl','fecha_ingreso_cl','facturacion'],
         id:'id_cliente',
         fecha:'fecha_ingreso_cl',
      },
      compras:{ 
         header:['Fecha','Proveedor','Descripcion','Monto','Metodo','Fact.','Num. Fact.','Categoria'],
         body:['fecha','proveedor','descripcion','monto','forma_pago','tipo_factura','numero_factura','categoria'],
         id:'id_compra',
         fecha:'fecha'
      },
   
      gastos:{
         header:['Fecha','Categoria','Subcategoria','Descripcion','Monto','Metodo Pago','Proveedor'],
         body:['fecha','categoria','descripcion','forma_pago','monto','proveedor','subcategoria'],
         id:'id_gasto',
         fecha:'fecha',
      },
   
      proveedores:{
         header:['Nombre Fantasia','Razon Social','CUIT','Direccion','N° Telefono','E-mail'],
         body:['nombre_fantacia','razon_social','cuit','direccion','telefono','email'],
         id:'id_prov',
      },

}


const dateFn = (fullDate) =>{
   const date = new Date(fullDate);

   const formattedDate = date.toISOString().split('T')[0];

   return formattedDate; 
}


const StructureTable = memo(( {classCSS} ) =>{ 



   const { tableName }= useParams();
   
   const [resultData,setResultData] = useState([]);
   const [isLoading,setIsLoading] = useState(true);
   const [selectedIds, setSelectedIds] = useState([]);
   const [nameTable,setNameTable] = useState('');
   const [isVisible,setIsVisible] = useState('modal-hidden')

   const handleCheckboxChange = (e,id) => {
      if(e.target.checked) {
         setSelectedIds((prev) => [...prev, id]);
      }else{
         setSelectedIds((prev) => prev.filter((item) => item !== id));
      }
   }

   const modalConfirm = () => {
      
      if(isVisible === 'modal-hidden'){
         setIsVisible('modal-visible')
      }else{
         setIsVisible('modal-hidden')
      }
      console.log(selectedIds)

   }

   const handleDelete = async () => {
      console.log("IDs seleccionados para eliminar:", selectedIds);

      console.log(dataTableStructure[tableName]['id'])
      console.log(tableName)
      console.log(selectedIds)

      try{
         const result = await fetch(`${URLhost}/delete_element`,{
            method: 'DELETE',
            body: JSON.stringify({
               "idDelete": selectedIds,
               "idColumn": dataTableStructure[tableName]['id'],
               "tabla": tableName,
            }),
            headers: { 'Content-type': 'application/json' }
         }).then(res=>res.text()).then(data=>data);
         console.log(result)
         setIsVisible('modal-hidden')
      }catch(err){
         console.error('Error fetch /delete_element')
      }
   };
      


   useEffect(() => {
  
      if (tableName === 'inicio' || tableName === '' ) {
         setResultData([]);
         setIsLoading(false);
        return;
      }
    
         setNameTable(tableName)
   

    
         const dataFetch = async () => {
            setIsLoading(true)
              try {
                  const resultFetch = await fetch(`${URLhost}/view_${tableName}`).then((res) =>
                    res.json()
                  );
                  setResultData(resultFetch)

              } catch (err) {
                  console.error(err);
              }finally{
                  setIsLoading(false);
              }
         };
    
         dataFetch();
    }, [tableName])

      if (isLoading) {
           return <p>Cargando datos...</p>;
      }

      if(nameTable === '' || tableName !== nameTable){
         console.log('No hay datos disponibles para la tabla seleccionada.')
         return 
      }
      else{

         let dataTable = dataTableStructure[tableName]

   return(

      <>
            <div className={`background_opacity_modal ${isVisible}`}>
               <div className={`modal-confirm modal_confirm ${isVisible}`}>
                  <div className="circle-warning">
                     <img className="img-circle-warning" src={warningIcon} alt=""/>
                 </div>
                 <h4 className="h4-modal-confirm">Desea Eliminar</h4>
                 <p className="p-msg-confirm">{`ID: ${selectedIds.join(' - ')}`}</p>
                 <article className="article-btn-modal-confirm">
                     <button className="button-modal-confirm btn_cancel_del" onClick={modalConfirm} >Cancelar</button>
                     <button className="button-modal-confirm btn-modal-del" onClick={handleDelete} >Eliminar</button>
                 </article>       
               </div>
            </div>
            <div className={`container_table container_${tableName}`}>
               <section className="header_table_container">
                  <Link to={`/table/add/${tableName}`} className="btn-all-rounded btn_add_personal">Agregar</Link>
                  <article className="article_header_table">
                     <img className="img_header_table btn_del_personal" onClick={modalConfirm} src={deleteIcon} alt=""/>
                     <img className="img_header_table" src={printIcon} alt=""/>
                     <img className="img_header_table" src={downloadIcon} alt=""/>
                     <img className="img_header_table" src={filterIcon} alt=""/>
                  </article>
               </section>
               <div className="container_content_table">
                  <section className={`container_header_table header_${tableName}`}>

                     {dataTable['header'].map((header,index)=>{

                        return(
                           <div key={index} className="div_header_table div_table_caja">{header}</div>
                        )
                     })}
                  </section>
                  <section className="container_body_table">
                     {console.log('renderizado')}
                     {resultData.map((result,index)=>{
                        // console.log(result[dataTable['id']])
                        return(
                           <li key={result[dataTable['id']]} className={`row_body_table body_${tableName}`}>
                              <div className="div_row_table">
                                    <input 
                                       value={`${result[dataTable['id']]}`} 
                                       name="checkPersonal"
                                       type="checkbox"
                                       onChange={(e) => handleCheckboxChange(e, result[dataTable['id']])}
                                    />
                              </div>
                              {dataTable['body'].map((data,index)=>{
                                    if(data === `${dataTable['fecha']}`){
                                       return (
                                          <div key={index}className="div_row_table">{dateFn(result[dataTable['fecha']])}</div>
                                       )
                                    }else{
                                       return(
                                          <div key={index}className="div_row_table">{result[data]}</div>
                                       )
                                    }
                                 })
                              }
                              <Link to={`/edit/${tableName}/${dataTable['id']}/${result[dataTable['id']]}`} className="div_row_table">
                                 <img src="/src/Assets/icons/edit_caja.svg" alt="Editar" />
                              </Link>
                           </li>
                        )
                     })}
                  </section>
               </div>
               </div> 
        
      </>
   )
}
})

export default StructureTable



