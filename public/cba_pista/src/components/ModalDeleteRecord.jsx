
import { useState, useEffect } from "react";

import { getRecordsTires } from "../helpers/tires_registry.js";
import { getPilots } from "../helpers/pilots.js";

import equisDel from "../assets/delete-equis.svg";
import { data } from "react-router-dom";

const ModalDeleteRecord = ({ ids = [], onConfirm, onCancel, dataDetail }) => {


   const [ arrRcords, setArrRecords ] = useState([])

   console.log(dataDetail)
   console.log('IDs selected:',ids)
   
   useEffect(() => {
     const load = async () => {
       let data = [];

       if (dataDetail === "Records") {
         data = await getRecordsTires("", "", "");
       } else if (dataDetail === "Pilots") {
         data = await getPilots({});
       }

       setArrRecords(Array.isArray(data) ? data : []);
       console.log(data)
     };

     load();
   }, [dataDetail]);


  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="container-modal container-modal-delete" onClick={(e) => e.stopPropagation()}>
        {/* <button className="modal-close" onClick={onCancel}>
          <img src={equisDel} alt="Cerrar" />
        </button> */}
         <div className="modal-header">
            <img src={equisDel} alt="Equis" />
         </div>

        <h4>Eliminar Elementos</h4>
        <p>Elementos a eliminar:</p>
        <div className='list-elements-delete'>
         {ids.length 
            // ? ids.map(d => (<p key={d}> - {d}</p>))
            ? ids.map(d => {
               const user = arrRcords.find(u => u.id == d)
               const user_name =
                 dataDetail === "Records"
                   ? [user?.pilot_name, user?.surname].filter(Boolean).join(" ")
                   : [user?.name, user?.surname].filter(Boolean).join(" ");

               const fecha = dataDetail === "Records" ? user?.event : "";
               return(
                  <p key={d}>{`${fecha} - ${user_name}`}</p>
               )
            })
            : <p>No se agregaron registros</p>}
        </div>

        <div className="conteiner-modal-delete-btn">
          <button onClick={() => onConfirm(ids)}>Eliminar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteRecord;





