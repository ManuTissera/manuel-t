
import { useState, useEffect } from "react";

import { getRecordsTires } from "../helpers/tires_registry.js";

import fileDownload from "../assets/file-download.svg";


const ModalDownloadsRecords = ({ onClose, onConfirm }) => {

   const [fileName, setFileName] = useState("Records");



   return(
      <>
         <div className="modal-overlay" onClick={onClose}>
            <div 
               className="container-modal container-modal-download"
               onClick={(e) => e.stopPropagation()}
            >

               <div className="modal-header">
                  <img src={fileDownload} alt="Download" />
               </div>

               <h4>Descargar Registros</h4>
               <p>Nombre Registro:</p>
               <input
                 type="text"
                 value={fileName}
                 onChange={(e) => setFileName(e.target.value)}
               />


               <div className="conteiner-modal-download-btn">
                 <button onClick={() => onConfirm(fileName)}>Descargar</button>
                 <button onClick={onClose}>Cancelar</button>
               </div>
            </div>
         </div>
      
      </>
   )
}


export default ModalDownloadsRecords






