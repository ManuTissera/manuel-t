
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
         <div className="form-group">
            <label className="form-label">Categoria</label>
            {/* <span className={`span-${nameClass}`}>Categorias:</span> */}
            <select 
               value={value}
               onChange={(e) => onChangeFn(e.target.value)}
               // className={`select-${nameClass}`}
               className="form-input"
               >
               <option value="">Categoria</option>
               {categoriesArr.map((c) => (
                  <option key={c.id_category} value={c.id_category}>{c.category_name}</option>
               ))}
            </select>
         </div>
      </>
   )
}


export default SelectSarchCategory;



