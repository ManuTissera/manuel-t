import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo_cba_pista from '../assets/Logo_cba_pista_rend.png';

const LogIn = () => {
  const [username, setUsername] = useState('');  // email → username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getBaseUrl = () => {
  // Si estamos en localhost con Vite (puerto 5173), usar backend local
  if (window.location.origin.includes('localhost:5173')) {
    return 'http://localhost:3210';
  }
  // En producción (Heroku), usar el mismo origen
  return window.location.origin;
};


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

      try {
        const response = await fetch(`${getBaseUrl()}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/home');
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container-log-in">
      <div className="container-header-login">
        <div className="content-logo-log-in">
          <img src={Logo_cba_pista} alt="Cba Pista" className="log-in-logo"/>
        </div>
        <h4 className="h4-log-id">Sign In</h4>
      </div>

      <form onSubmit={handleLogin}>   {/* ✅ conectado */}
        <div className="card-log-in">
          <div className="field-login">
<input
  className="input-card-login"
  type="text"            // ❌ era type="email"
  placeholder="User"
  value={username}       // ❌ era value={email}
  onChange={(e) => setUsername(e.target.value)}  // ❌ era setEmail
  required
/>
          </div>
          <div className="field-login">
            <input
              className="input-card-login"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
        </div>
        <button type="submit" className="btn-log-in">Continuar</button>  {/* ✅ submit real */}
      </form>

      <Link to="/login" className="link-new-admin">Olvidaste la contraseña</Link>
      {/* <Link to="/signup" className="link-new-admin">Crear Cuenta</Link> */}
      <p to="/signup" className="link-new-admin">Crear Cuenta</p>
    </div>
  );
};

export default LogIn;