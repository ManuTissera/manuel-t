import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo_cba_pista from '../assets/Logo_cba_pista_rend.png';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //  console.log('email->',email);
  //  console.log('pass ->',password);
  //   e.preventDefault();
  //   const response = await fetch('http://localhost:3210/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password })
  //   });
  //   const data = await response.json();
  //   if (response.ok) {
  //     localStorage.setItem('token', data.token);
  //     navigate('/home');
  //   } else {
  //     alert(data.error);
  //   }
  // };



  return(
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
      {/* <form onSubmit={handleLogin}> */}
      <form >
        <div className="card-log-in">
          <div className="field-login">
            <input className="input-card-login" type="email" placeholder='User' onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="field-login">
            <input className="input-card-login" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
          </div>
        </div>
        {/* <button type="submit" className="btn-log-in">Continuar</button> */}
      </form>
      <Link to="/home" className="btn-log-in">Continuar</Link>
      <Link to="/login" className="link-new-admin">Olvidaste la contrasena</Link>
      <Link to="/signup" className="link-new-admin">Crear Cuenta</Link>
    </div>
  )
}

export default LogIn;