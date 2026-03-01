


const CreateNewAdmin = () => {


   return (

      <>
         <h1> New Admin</h1>

         <div className="form-new-admin">
            <div className="field-na">
               <span className="span-na">Nombre</span>
               <input 
               type="text"
               className="input"

               />
            </div>

            <div className="field-na">
               <span className="span-na">Apellido</span>
               <input 
               type="text"
               className="input"

               />
            </div>

            <div className="field-na">
               <span className="span-na">Position</span>
               <input 
               type="text"
               className="input"

               />
            </div>

            <div className="actions">
               <button className="btn-add btn-submit">
                  Agregar
               </button>
            </div>
         </div>
      </>
   )
}



export default CreateNewAdmin



