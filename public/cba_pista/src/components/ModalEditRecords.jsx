
import { useState, useEffect, useRef } from "react";

import { getRecordsTires, editRecordTires } from "../helpers/tires_registry.js";

import editIcon from "../assets/edit.svg";


const ModalEditRecords = ({ onCancel, onConfirm, recdEd }) => {

   // console.log('IDs seleccionados',recdEd)
   const [fileName, setFileName] = useState("Records");
   const [enabledInputs, setEnabledInputs] = useState([]);

   const [newTireValues, setNewTireValues] = useState({});

   

   // Handler para cambios en inputs
   const handleTireChange = (index, value) => {
     const tireKey = `N${index + 1}`;
     setNewTireValues(prev => ({
       ...prev,
       [tireKey]: value
     }));
   };

   const handleConfirm = async () => {
   const tires = Object.entries(newTireValues)
        .filter(([_, value]) => value !== '')
        .map(([position, value]) => ({
          position,
          tire_number: Number(value)
           }));
       
         if (tires.length === 0) return; // nada que enviar
       
      const result = await editRecordTires(recdEd.id, tires);
      onConfirm(result);
    };

   console.log(newTireValues)

   const dataTires = [
      ['N1',recdEd.tire_n1],['N2',recdEd.tire_n2],['N3',recdEd.tire_n3],['N4',recdEd.tire_n4],['N5',recdEd.tire_n5],['N6',recdEd.tire_n6],
   ]
      // Funcionamiento del input edit
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
                  <div className="info-modal-col col-2">{recdEd.event}</div>
                  <div className="info-modal-col col-1">Circuito:</div>
                  <div className="info-modal-col col-2">{recdEd.name_circuits}</div>
                  <div className="info-modal-col col-1">Fecha:</div>
                  <div className="info-modal-col col-2">{recdEd.event_date.split("T")[0]}</div>
                  <div className="info-modal-col col-1">Auditor:</div>
                  <div className="info-modal-col col-2">{recdEd.auditor_name}</div>
                  <div className="info-modal-col col-1">Piloto:</div>
                  <div className="info-modal-col col-2">{recdEd.pilot_name + ' ' + recdEd.surname}</div>
                  <div className="info-modal-col col-1">Categoria:</div>
                  <div className="info-modal-col col-2">{recdEd.category}</div>
                  {/* <div className="info-modal-col col-1">Auto:</div>
                  <div className="info-modal-col col-2">Fiat Palio</div> */}
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
                          value={newTireValues[`N${index + 1}`] || ''}
                          onChange={(e) => handleTireChange(index, e.target.value)}
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
                  {/* <button className="submit-btn btn-link" onClick={() => onConfirm(fileName)}>Editar</button> */}
                  {/* <button className="submit-btn btn-link" onClick={() =>console.log(newTireValues)}>Editar</button> */}
                  <button className="submit-btn btn-link" onClick={handleConfirm}>Editar</button>
               </div>
            </div>
         </div>
      
      </>
   )
}


export default ModalEditRecords;






