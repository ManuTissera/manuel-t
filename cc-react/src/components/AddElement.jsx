
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS-Files/AddElement.css';
import selectedStrAdd from './StructureAddElement';

const StructureAdd = () => {
   
   const [tableSelect,setTableSelect] = useState([]);
   const navigate = useNavigate()
   const { tableName } = useParams();
   const SelectAdd = selectedStrAdd[tableName]


   useEffect(() => {
         setTableSelect(tableName)
   },[])



   
   const handleBack = () => {
      navigate(`/table/${tableName}`)
   }

   if(tableSelect.length === 0){
      return
   }else{

      return ( 
         <>
         <header className="header-form">
            <div className="container-header-form">
               <h2 className="h2-header-form">{`${tableName}`}</h2>
            </div>
         </header>

         <main className="main_add_element">
         <section className="section_main_add_element">
               <a onClick={handleBack} className="div_back_add_element">
                  <img src="src/Assets/icons/chevron_back.svg" alt=""/>
                  <p className="p_back_add_element">Volver</p>
               </a>
            </section>
            <SelectAdd/>
         </main>
      </>
      )
   }

}

export default StructureAdd;