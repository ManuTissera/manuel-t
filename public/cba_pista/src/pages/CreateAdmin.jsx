

import { Link } from 'react-router-dom';

const CreateNewAdmin = () => {


   return (

      <>

         <div className="container-form-all">
            <div className="header-card-form-second">
              <h2 className="header-h2-form">Nuevo Admin</h2>
              <Link to="/" className="header-form-btn">Ver Admin</Link>
            </div>


            <div className="form-pilot div-center">

            {/* Name */}
                 <label className="form-group">
                   <span className="form-label">Nombre</span>
                   <input 
                     className="form-input"
                     // onChange={(e) => setNamePilot(e.target.value)}
                     placeholder="Ingresar Nombre"
                     type="text"
                   />
                 </label>

            {/* Surname */}
                 <label className="form-group">
                   <span className="form-label">Surname</span>
                   <input 
                     className="form-input"
                     // onChange={(e) => setNamePilot(e.target.value)}
                     placeholder="Ingresar Apellido"
                     type="text"
                   />
                 </label>

            {/* Roll */}
                  <label className="form-group">
                    <span className="form-label">Roll</span>
                    <select
                      className="form-input"
                     //  value={categorySelect}

                    >
                      <option value="">Seleccionar Categoria</option>
                        <option >
                        </option>
                    </select>
                  </label>

            {/* Email */}
                 <label className="form-group">
                   <span className="form-label">Email</span>
                   <input 
                     className="form-input"
                     // onChange={(e) => setNamePilot(e.target.value)}
                     placeholder="Ingresar Nombre"
                     type="text"
                   />
                 </label>

            {/* UserName */}
                 <label className="form-group">
                   <span className="form-label">UserName</span>
                   <input 
                     className="form-input"
                     // onChange={(e) => setNamePilot(e.target.value)}
                     placeholder="Ingresar Nombre"
                     type="text"
                   />
                 </label>

            {/* Password */}
                 <label className="form-group">
                   <span className="form-label">Password</span>
                   <input 
                     className="form-input"
                     // onChange={(e) => setNamePilot(e.target.value)}
                     placeholder="Ingresar Nombre"
                     type="text"
                   />
                 </label>

               <div className="actions">
                  <label className='label-buttons'>
                     <button
                        className="btn-add btn-submit"
                     >
                     Agregar
                     </button>
                  </label>
               </div>
            </div>
         </div>
      </>
   )
}



export default CreateNewAdmin



