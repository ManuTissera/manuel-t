
import { getPilotsNum } from "../helpers/pilots.js";
import { useEffect, useState } from "react";

const SelectPilots = ({ category,onChagePilot,nameClass, pilotNumber }) => {

   //const label_class = (nameClass == 'records_form') ? 'label' : 'form-labe'
   const select_class = (nameClass == 'records_form')?'input':'form-input'

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

      
      console.log('Name Class Pilots Select',nameClass)

    

   return(

      
      //<label className={`label-select-${nameClass}`}>
      <div className="form-group">
         {(nameClass == 'records_form')
         ?<span className="ca-label">Numero Piloto</span>
         :<label className="form-label">Numero Piloto</label>
         }

         <select
            className={`${select_class}`} 
            value={pilotNumber} onChange={(e) => onChagePilot(Number(e.target.value))}>
            <option>Numero</option>
            {pilotsArr.map((p) => (
               <option value={p.id} key={p.id}>{p.number_pilot}</option>
            ))}
         </select>
      </div>

   )
}

export default SelectPilots;




