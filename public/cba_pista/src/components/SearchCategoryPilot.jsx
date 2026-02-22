
import { useEffect, useState } from 'react';
import { getCategories, getEvent } from "../helpers/pilots.js";



const SelectSarchCategory = ({onChangeFn, value, nameClass}) => {

   const [ categoriesArr, setCategorisArr ] = useState([])

   const classLabel = (nameClass == 'rec')? 'rec-label-select':'label-select select-category'

   useEffect(() => {
      const loadCategories = async () => {
         const data = await getCategories()
         setCategorisArr(Array.isArray(data) ? data : [])
      }
      loadCategories()
   },[])

   return(
      <>
         <label className={`label-select-${nameClass}`}>
            <span className={`span-${nameClass}`}>Categorias:</span>
            <select 
               value={value}
               onChange={(e) => onChangeFn(e.target.value)}
               className={`select-${nameClass}`}
               >
               <option value="">Categoria</option>
               {categoriesArr.map((c) => (
                  <option key={c.category}>{c.category}</option>
               ))}
            </select>
         </label>
      </>
   )
}


export default SelectSarchCategory;



