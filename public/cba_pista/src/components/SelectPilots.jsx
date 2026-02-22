
import { getPilotsNum } from "../helpers/pilots.js";
import { useEffect, useState } from "react";

const SelectPilots = ({ category,onChagePilot,nameClass, pilotNumber }) => {

   // const select_class = (nameClass == 'records_form')?'input':'label-select'
   // const label_class = nameClass == 'records_form' ? 'field' : 'label-select'

   const [ pilotsArr, setPilotsArr ] = useState([])

   useEffect(() => {
      if(category == '') return;
      if(category == 'select'){
         setPilotsArr([])
      }else{  
         const load = async () => {
            
            const data = await getPilotsNum(category)
            setPilotsArr(Array.isArray(data)? data : [])
         }
         load()
      }
      },[category])

      
      //console.log(name_class)

    

   return(

      // <label className={`${name_class}-label`}>
      <label className={`label-select-${nameClass}`}>
         <span className={`span-${nameClass}`}>Numero Piloto:</span>
         <select
            className={`select-${nameClass}`} 
            value={pilotNumber} onChange={(e) => onChagePilot(Number(e.target.value))}>
            <option>Numero</option>
            {pilotsArr.map((p) => (
               <option value={p.id} key={p.id}>{p.number_pilot}</option>
            ))}
         </select>
      </label>

   )
}

export default SelectPilots;




