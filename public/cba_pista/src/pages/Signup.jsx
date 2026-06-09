import { Link } from 'react-router-dom';
import Logo_cba_pista from '../assets/Logo_cba_pista_rend.png';

const SignUp = () => {
   return(
      <>
         <div className="container-register">
            <div className="container-header-register">
               <div className="content-logo-register">
                  <img src={Logo_cba_pista} alt="Cba Pista" className="register-logo"/>
               </div>
               <h4 className="h4-register-id">Create Account</h4>
               <span className="helper-text-register">
                  Completa los siguientes datos para crear una nueva cuenta
               </span>
            </div>
            <div className="card-register">
               <div className="field-register">
                  <input className="input-card-register" type="text" placeholder='Full Name'/>
               </div>
               <div className="field-register">
                  <input className="input-card-register" type="email" placeholder='Email'/>
               </div>
               <div className="field-register">
                  <input className="input-card-register" type="text" placeholder='User'/>
               </div>
               <div className="field-register">
                  <input className="input-card-register" type="password" placeholder='Password'/>
               </div>
               <div className="field-register">
                  <input className="input-card-register" type="password" placeholder='Confirm Password'/>
               </div>
            </div>
            <Link to="/" className="btn-register">Registrarse</Link>
            <Link to="/login" className="link-to-login">
               ¿Ya tienes cuenta? <span>Inicia Sesión</span>
            </Link>
         </div>
      </>
   )
}

export default SignUp;