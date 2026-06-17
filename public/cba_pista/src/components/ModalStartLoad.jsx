

import { useEffect, useState } from "react";
import { infoPilot, getEvent, getCategories } from "../helpers/pilots.js";



const ModalLoadStartRecord = ({ onCancel }) => {

   const [categories, setCateogries] = useState([]);
   const [category, setCategory] = useState("");
   const [eventData, setEventData] = useState([])


  

      useEffect(() => {
         const loadPilotInfo = async () => {
         // const data = await infoPilot(category, pilotNumber);
         const data = await getEvent();
         setEventData(data);
      };
      loadPilotInfo();
   },[]);
   
   console.log(eventData)

   return(
      <>
            <div className="modal-overlay" onClick={onCancel}>
               <div 
                  //className="container-modal container-modal-download"
                  className="container-modal midium-modal"
                  onClick={(e) => e.stopPropagation()}
               >

                  <div className="modal-header">
                     <h4 className="h4-modal-header">Iniciar Ronda de Registros</h4>
                     {/* <img src={fileDownload} alt="Download" /> */}
                  </div>
                  <div className="content-info-modal">
                     <div className="info-modal-col col-1">Titular:</div>
                     <div className="info-modal-col col-2">Manuel Tissera</div>
                     <div className="info-modal-col col-1">Fecha:</div>
                     <div className="info-modal-col">
                       {new Date().toLocaleDateString('es-ES', { 
                         weekday: 'long', 
                         day: 'numeric', 
                         month: 'long', 
                         year: 'numeric' 
                       })}
                     </div>
                  </div>


                  <label className="field">
                    <span className="label">Fecha</span>
                    <select
                      className="input category_select"
                     //  value={category}
                     //  onChange={(e) => setEvent(e)}
                    >
                      <option value="">Seleccionar Evento</option>
                      {eventData.map((c) => (
                        <option key={c.id_event} value={c.name_circuits}>
                          {c.name_circuits || "Seleccionar"}
                        </option>
                      ))}
                    </select>
                  </label>

         
                  
                     {/* <input
                       type="text"
                       value={fileName}
                       onChange={(e) => setFileName(e.target.value)}
                     /> */}
      
      
                     <div className="modal-actions">
                       <button className="action-btn btn-cancel" >Cancelar</button>
                       <button className="submit-btn btn-link" >Editar</button>
                     </div>
                </div>
             </div>
      </>
   )
}



export default ModalLoadStartRecord;

