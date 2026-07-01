

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { infoPilot, getEvent, getCategories } from "../helpers/pilots.js";
import { addNewPilot } from "../helpers/add_info.js";

import ModalLoadRecord from '../components/ModalLoadRecord.jsx';
import ModalSuccesLoad from '../components/ModalSuccesLoad.jsx';
import AlertBanner from '../components/AlertBanner.jsx';

import '../Files_CSS/addPilots.css'

const AddPilotsElement = () => {
  const [showModalUnload, setShowModalUnload] = useState("");
  const [showModalSucces, setShowModalSucces] = useState("");

   const today = new Date().toISOString().split("T")[0];
   const [date, setDate] = useState(today);
   

   const [alertTitle, setAlertTitle] = useState('')
   const [alertMsg, setAlertMsg] = useState('')
   const [alertType, setAlertType] = useState(true); // Nuevo estado: true para success, false para error
   const [bannerStatus, setBannerStatus] = useState(false)


   const [categorySelect, setCategorySelected] = useState("");
   const [showToastErrors, setShowToastErrors] = useState(false); // Hay que cambiarlo
   const [isOpenClass, setIsOpenClass] = useState("");
   const [categories, setCategories] = useState([])
   const [namePilot, setNamePilot] = useState("");
   const [carModel, setCarModel] = useState("");
   const [numPilot, setNumPilot] = useState("");
   const [surname, setSurname] = useState("");


   useEffect(() => {

     const loadInfo = async () => {
       const dataCategories = await getCategories()
       setCategories(Array.isArray(dataCategories)?dataCategories:[])
     }
     loadInfo()
   },[] )


const submitDataFn = async () => {
  try {
    const payload = {
      name: namePilot,
      surname,
      car_model: carModel,
      category: categorySelect,
      number_pilot: numPilot,
      date,
    };
    
    console.log('Agregado correctamente creo')
    const response = await addNewPilot(payload);
    console.log(response.status)
    if(response.status == 201){
        setAlertType(true);
        setShowModalSucces(true);
        setAlertTitle('Piloto Agregado');
        setAlertMsg('El piloto fue cargado correctamente');
        setBannerStatus(prev => !prev);

        setTimeout(() => window.location.reload(), 4500);
    }
  
  } catch (err) {
    if (err.status == 409) {

        setAlertType(false);
        setShowModalSucces(true);
        setAlertTitle('Error');
        setAlertMsg(err.message || `El numero ${numPilot} ya esta asignado a otro piloto`);
        setBannerStatus(prev => !prev);


    } else {

        setAlertType(false);
        setShowModalSucces(true);
        setAlertTitle('Error');
        setAlertMsg(err.message || 'Error al agregar el piloto');
        setBannerStatus(prev => !prev);

    }
  }
};



   return(
      <>

               {/* Inserción del Banner con renderizado condicional */}
               {showModalSucces && (
                 <AlertBanner 
                  titleAlert={alertTitle} 
                  messageAlert={alertMsg} 
                  classNN={alertType} 
                  statusBanner = {bannerStatus}

                 />
               )}


          {/* <div className="back-ground-ui"></div> */}
          <div className="container-form-all">
          
            {/* <div className="header-card-form-nr">
              <h3 className="title-nr">Agregar Nuevo Piloto</h3>
              <Link to="/pilots" className="btn-head-form-records">Ver Pilotos</Link>
            </div> */}

            <div className="header-card-form-second">
              <h2 className="header-h2-form">Agergar Piloto</h2>
              <Link to="/pilots" className="action-btn btn-link">Ver Pilotos</Link>
              {/* <button className="header-form-btn">Ver Pilotos</button> */}
            </div>
            
            <div className="form-pilot">


              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input 
                  className="form-input"
                  onChange={(e) => setNamePilot(e.target.value)}
                  placeholder="Ingresar Nombre"
                  type="text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Apellido</label>
                <input 
                  className="form-input"
                  placeholder="Ingresar Apellido"
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
               />
              </div>
 
               <div className="form-group">
                 <label className="form-label">Categoria</label>
                 <select
                   className="form-input"
                   value={categorySelect}
                   onChange={(e) => setCategorySelected(e.target.value)}
                 >
                   <option value="">Seleccionar Categoria</option>
                   {categories.map((c) => (
                     <option key={c.id_category} value={c.id_category}>
                       {c.category_name || "Seleccionar"}
                     </option>
                   ))}
                 </select>
               </div>
                
               <label className="form-group">
                 <span className="form-label">Numero Pilot</span>
                 <input 
                   className="form-input"
                   placeholder="Ingresar Numero"
                   type="text"
                   onChange={(e) => setNumPilot(e.target.value)}
                />
               </label>

              <label className="form-group">
                <span className="form-label">Auto</span>
                <input 
                  className="form-input"
                  placeholder="Ingresar Auto"
                  type="text"
                  onChange={(e) => setCarModel(e.target.value)}
               />
              </label>

               <label className="form-group">
                 <span className="form-label">Fecha</span>
                 <input
                   className="form-input"
                   type="date"
                   value={date}
                   onChange={(e) => setDate(e.target.value)}
                 />
               </label>
                           

               <label className='label-buttons'>
                  <button
                     className="submit-btn"
                     // onClick={() => uploadDataFn()}
                     onClick={() => submitDataFn()}
                  >
                  Agregar
                  </button>
               </label>
               
            </div>
          </div>
      </>
   )
}



export default AddPilotsElement








