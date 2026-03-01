
import { Link } from 'react-router-dom';
import Logo_cba_pista from '../assets/Logo_cba_pista.png';

const LogIn = () => {

   return(
      <>
         <div className="container-log-in">
            <div className="container-header-login">
               <div className="content-logo-log-in">
                  <img src={Logo_cba_pista} alt="Cba Pista" className="log-in-logo"/>
               </div>
               <h4 className="h4-log-id">Sing In</h4>
               <span className="heper-text-login">
                  No existen credenciales habilitadas aun. Dando click en "Continue" se puede ingresar
               </span>
            </div>
            <div className="card-log-in">
               <div className="field-login">
                  {/* <span className="span-card-login">User</span> */}
                  <input className="input-card-login" type="text" placeholder='User'/>
               </div>
               <div className="field-login">
                  {/* <span className="span-card-login">Password</span> */}
                  <input className="input-card-login" type="text" placeholder='Password'/>
               </div>
            </div>
            {/* <button className="btn-log-in">Continuar</button> */}
            <Link to="/" className="btn-log-in">Continuar</Link>
            <Link to="/login" className="link-new-admin">Olvidaste la contrasena</Link>
            <Link to="/login" className="link-new-admin">Crear Cuenta</Link>
         </div>
      </>
   )
}

export default LogIn;


