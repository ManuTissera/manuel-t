

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { infoPilot, getEvent, getCategories } from "../helpers/pilots.js";
import { addNewPilot } from "../helpers/add_info.js";

import ModalLoadRecord from '../components/ModalLoadRecord.jsx';
import ModalSuccesLoad from '../components/ModalSuccesLoad.jsx';
import ToastSuccesPilot from '../components/ToastSuccesPilot.jsx';
import ToastErrorPilot from '../components/ToastErrorPilot.jsx';

import '../Files_CSS/addPilots.css'

const AddPilotsElement = () => {

   const today = new Date().toISOString().split("T")[0];
   const [date, setDate] = useState(today);
   
   const [categorySelect, setCategorySelected] = useState("");
   const [showModalUnload, setShowModalUnload] = useState("");
   const [showModalSucces, setShowModalSucces] = useState("");
   const [showToastSucces, setShowToastSucces] = useState(false);
   const [showToastErrors, setShowToastErrors] = useState(false);
   const [isOpenClass, setIsOpenClass] = useState("");
   const [categories, setCategories] = useState([])
   const [namePilot, setNamePilot] = useState("");
   const [errorComment, setErrorComment] = useState("")
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
          setShowToastSucces(true)
        }
      
      } catch (err) {
        if(err.status == 409){
          setErrorComment(`El numero ${numPilot} ya esta asignado a otro piloto`)
          setShowToastErrors(true)
        }
        console.log("status:", err.status);
        console.log("message:", err.message);
      }
    };




   return(
      <>

            <div className="header-card-form-nr">
              <h3 className="title-nr">Agregar Nuevo Piloto</h3>
              <Link to="/pilots" className="btn-head-form-records">Ver Pilotos</Link>
            </div>


            <div className="form-pilot">

              {showToastErrors && (
                <ToastErrorPilot
                  errorText={errorComment}
                  isOpen={showToastErrors}
                  onClose={() => setShowToastErrors(false)}
                />
              )}


              {showToastSucces && <ToastSuccesPilot
                pilotName={namePilot}
                surnamePilot={surname}
                onClose={() => setShowToastSucces(false)}
              />}



              <label className="form-group">
                <span className="form-label">Nombre</span>
                <input 
                  className="form-input"
                  onChange={(e) => setNamePilot(e.target.value)}
                  placeholder="Ingresar Nombre"
                  type="text"
                />
              </label>

              <label className="form-group">
                <span className="form-label">Apellido</span>
                <input 
                  className="form-input"
                  placeholder="Ingresar Apellido"
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
               />
              </label>
 
               <label className="form-group">
                 <span className="form-label">Categoria</span>
                 <select
                   className="form-input"
                   value={categorySelect}
                   onChange={(e) => setCategorySelected(e.target.value)}
                 >
                   <option value="">Seleccionar Categoria</option>
                   {categories.map((c) => (
                     <option key={c.category} value={c.category}>
                       {c.category || "Seleccionar"}
                     </option>
                   ))}
                 </select>
               </label>
                
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
                     className="btn-add btn-submit"
                     // onClick={() => uploadDataFn()}
                     onClick={() => submitDataFn()}
                  >
                  Agregar
                  </button>
               </label>
               
            </div>

      </>
   )
}



export default AddPilotsElement








