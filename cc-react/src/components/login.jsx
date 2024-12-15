
import '../CSS-Files/login.css';
import logoControlCommerce from '../Assets/Loco Comercee.png';
import { Link } from 'react-router-dom';

const LoginStructure = () => {

   return(
      <div className="container_log_in_page">
      <section className="container_logo">
         <img className="img_logo_log_in" src={logoControlCommerce} alt=""/>
      </section>
      <section className="container_log_in_form">
         <input type="text" className="inp_form log_in_user" placeholder="Usuario"/>
         <input type="text" className="inp_form log_in_password" placeholder="Contraseña"/>
         {/* <p className="p_form_result log_in_result">La contraseña es incorrecta</p> */}
         <button className="rounded_button btn_log_in">
            <Link to="/inicio"className="btn_log_in" >Log In</Link>
         </button>
         <button className="rounded_button btn_sing_up">Sing Up</button>
      </section>
   </div>
   )

}

export default LoginStructure;
