
import { useState, useEffect, useRef } from "react";

import { getRecordsTires } from "../helpers/tires_registry.js";

import editIcon from "../assets/edit.svg";


const ModalEditRecords = ({ onCancel, onConfirm }) => {

   const [fileName, setFileName] = useState("Records");
   const [enabledInputs, setEnabledInputs] = useState([]);

   const dataTires = [
      ['N1','405'],['N2','406'],['N3','407'],['N4','408'],['N5','409'],['N6','410'],
   ]
//const inputRef = useRef(null);
const inputRefs = useRef([]);

const handleClickInp = (index) => {
   setEnabledInputs(prev => [...prev, index]);
  inputRefs.current[index]?.focus();
};


   return(
      <>
         <div className="modal-overlay" onClick={onCancel}>
            <div 
               //className="container-modal container-modal-download"
               className="container-modal midium-modal"
               onClick={(e) => e.stopPropagation()}
            >

               <div className="modal-header">
                  <h4 className="h4-modal-header">EDITAR REGISTRO</h4>
                  {/* <img src={fileDownload} alt="Download" /> */}
               </div>
               <div className="content-info-modal">
                  <div className="info-modal-col col-1">EventoN°:</div>
                  <div className="info-modal-col col-2">Fecha N° 4</div>
                  <div className="info-modal-col col-1">Circuito:</div>
                  <div className="info-modal-col col-2">Oscar Cabalen</div>
                  <div className="info-modal-col col-1">Fecha:</div>
                  <div className="info-modal-col col-2">03/04/2025</div>
                  <div className="info-modal-col col-1">Auditor:</div>
                  <div className="info-modal-col col-2">Manuel Tissera</div>
                  <div className="info-modal-col col-1">Piloto:</div>
                  <div className="info-modal-col col-2">Lucas Dalto</div>
                  <div className="info-modal-col col-1">Categoria:</div>
                  <div className="info-modal-col col-2">Clase 1</div>
                  <div className="info-modal-col col-1">Auto:</div>
                  <div className="info-modal-col col-2">Fiat Palio</div>
               </div>
               <div className="content-data-modal">
                  <div className="content-modal-data-header">
                     <div>N°</div>
                     <div>Actual</div>
                     <div>Nuevo</div>
                     <div></div>
                  </div>
                  {dataTires.map((m, index) => (
                    <div key={index} className="content-modal-data-row">
                      <span className="col-1-modal-data">{m[0]}</span>
                      <span className="col-1-modal-data">{m[1]}</span>
                      <input 
                      type="text" 
                      ref={el => inputRefs.current[index] = el}  
disabled={!enabledInputs.includes(index)}
                      />
                      <button className="btn-edit-modal" onClick={() => handleClickInp(index)}>
                        <img src={editIcon} alt="" />
                      </button>
                    </div>
                  ))}
               </div>

         
               {/* <input
                 type="text"
                 value={fileName}
                 onChange={(e) => setFileName(e.target.value)}
               /> */}


               <div className="modal-actions">
                 <button className="action-btn btn-cancel" onClick={onCancel}>Cancelar</button>
                 <button className="submit-btn btn-link" onClick={() => onConfirm(fileName)}>Editar</button>
               </div>
            </div>
         </div>
      
      </>
   )
}


export default ModalEditRecords;






