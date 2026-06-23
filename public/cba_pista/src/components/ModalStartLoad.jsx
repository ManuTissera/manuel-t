

import { useEffect, useState } from "react";
import { infoPilot, getEvent } from "../helpers/pilots.js";
import { newActivity, finishRunRecord } from "../helpers/add_info.js";
import { checkLoadStatus } from "../helpers/tires_registry.js";

import ModalSuccesLoad from "./ModalSuccesLoad.jsx";
import AlertBanner from "./AlertBanner.jsx";


const ModalLoadStartRecord = ({ onCancel, statusData }) => {

   const [eventData, setEventData] = useState([]);
   const [selectedEvent, setSelectedEvent] = useState("");
   const [alertTitle, setAlertTitle] = useState('')
   const [alertMsg, setAlertMsg] = useState('')
   const [showModalSucces, setShowModalSucces] = useState(false); // Cambiado a false para que empiece oculto
   const [alertType, setAlertType] = useState(true); // Nuevo estado: true para success, false para error
   const [loadStatus, setloadStatus] = useState([])



   const [dateTime, setDateTime] = useState(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  });


      const statusLoader = (statusData[0]?.is_locked == undefined) ? true : false; 
      const eventOpen = eventData.find(e => e.id_event == statusData[0]?.id_event)
      

      useEffect(() => {

            const fetchStatus = async () => {
              try {
                const data = await checkLoadStatus(); 
                setloadStatus(data); // Guardamos los datos en el estado
              
              } catch (error) {
                console.error("Error al obtener el status:", error);
              }
            };
      

            const loadPilotInfo = async () => {
            // const data = await infoPilot(category, pilotNumber);
            const data = await getEvent();
            setEventData(data);
         };
         loadPilotInfo();
         fetchStatus();


      },[]);


      // if(statusLoader){
        
      //   console.log('Status load --------> ', statusLoader)
      // }else{
      //   console.log('Status load =====> Ronda abierta - FINALIZAR')
      // }

      // -----------------------------------------------

      const onSubmit = async () => {
        const payLoad = {
          "event_selected": selectedEvent
        }
     
        const result = await newActivity(payLoad);
        console.log('Resultado del backend:', result);
        
        if (result.ok) {
            // Éxito
            setAlertType(true); // Setea tipo éxito
            setShowModalSucces(true);
            setAlertTitle('Iniciado Exitoso');
            setAlertMsg('Ronda iniciada correctamente');
            // Agregamos un delay corto antes de cerrar el modal principal para que el usuario llegue a ver la animación del banner
            setTimeout(() => {
              onCancel(); // Cerrar modal principal
            }, 5000);
        } else {
            // Error
            setAlertType(false); // Setea tipo error
            setShowModalSucces(true);
            setAlertTitle('Error');
            setAlertMsg(result.error || 'Error al iniciar ronda');
        }
      }

        
      const getFinish = async () => {
          const result = await finishRunRecord();
          console.log('Resultado del backend:', result);
      
          if (result.ok) {
              // Éxito
              setAlertType(true);
              setShowModalSucces(true);
              setAlertTitle('Finalizado Exitoso');
              setAlertMsg('Ronda finalizada correctamente');
              setTimeout(() => {
                  onCancel();
              }, 4000);
          } else {
              // Error
              setAlertType(false);
              setShowModalSucces(true);
              setAlertTitle('Error');
              setAlertMsg(result.error || 'Error al finalizar ronda');
          }
      }


             
        
        
        
      return(
      <>


               {/* Inserción del Banner con renderizado condicional */}
               {showModalSucces && (
                 <AlertBanner 
                   titleAlert={alertTitle} 
                   messageAlert={alertMsg} 
                   classNN={alertType} 
                 />
               )}




            <div className="modal-overlay" onClick={onCancel}>

               <div 
                  //className="container-modal container-modal-download"
                  className="container-modal midium-modal"
                  onClick={(e) => e.stopPropagation()}
               >
                  

                  <div className="modal-header">
                      { statusLoader  ? <h4 className="h4-modal-header">Iniciar Ronda de Registros</h4>
                                    : <h4 className="h4-modal-header">Finalizar Ronda de Registros</h4>
                      }

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

                  {!statusLoader ? (
                    <>
                    
                  <span className="label">Fecha Abierta</span>
                    <input
                      value={`${eventOpen?.event || ''} - ${eventOpen?.name_circuits || ''}`}
                      type="text"
                      disabled
                      className="input category_select select_event"
                    />
                    
                    </>
                  ) : (
                    <>
                      <span className="label">Seleccionar Fecha</span>
                      
                      <select
                        className="input category_select select_event"
                        value={selectedEvent} // Descomentado para mantener el estado sincronizado
                        onChange={(e) => setSelectedEvent(e.target.value)}
                      >
                        <option value="">Seleccionar Evento</option>
                        {eventData.map((c) => (
                          <option key={c.id_event} value={c.id_event}>
                            {`${c.event} - ${c.name_circuits}`}
                          </option>
                        ))}
                      </select>
                    
                    </>
                  )}
                </label>


      
                <div className="modal-actions">
                  <button 
                    className={`action-btn btn-cancel ${statusLoader ? '' : 'action-close'}`} 
                    onClick={onCancel}
                  >Cancelar</button>

                  <button 
                    className={`submit-btn btn-link ${statusLoader ? '' : 'submit-close'}`} 
                    onClick={statusLoader ? onSubmit : getFinish} // Lógica invertida corregida
                    //={!statusLoader && !selectedEvent} // Evita "Iniciar" si no hay evento elegido
                  >
                    {statusLoader ? 'Iniciar' : 'Finalizar'}
                  </button>
                
                </div>


                </div>
             </div>
      </>
   )
}



export default ModalLoadStartRecord;

