

import { logout } from '../helpers/add_info.js'
import { getActiveUsers } from '../helpers/pilots.js'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.svg'
import arrowRight from '../assets/arrow-right-clean.svg'
import '../Files_CSS/sidebar.css'
import { useState, useEffect } from 'react'


const Sidebar = ({ isOpen, onClose }) => {

  const [userActive, setUserActive] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const loadActiveUser = async () => {
      const data = await getActiveUsers()
      setUserActive(data);
    };
    loadActiveUser()
  },[]);

  // console.log('siderbar', userActive);

  const logOutFn = async () => {
          const result = await logout();
          if (result.success) {
            navigate('/login');
          } else {
            console.error(result.error);
          }
  }

  return (

   <>
      <div
          className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
          onClick={onClose}
        />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img
            className="sidebar-close"
            src={arrowRight}
            alt="Close sidebar"
            onClick={onClose}
          />

          <img src={avatar} alt="User avatar" />
          <h4>{`${userActive?.first_name} - ${userActive?.second_name}`}</h4>
          <p>{userActive?.user_rol}</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" onClick={onClose}>Inicio</Link>
          <Link to="/pilots" onClick={onClose}>Pilotos</Link>
          <Link to="/new_record" onClick={onClose}>Asignaciones</Link>
          <Link to="/records_tires" onClick={onClose}>Registros</Link>
          <Link to="/current_record" onClick={onClose}>Registro Abierto</Link>
          {/* <Link to="/records_table" onClick={onClose}>Table</Link> */}
          <Link to="/add_pilot" onClick={onClose}>Nuevo Piloto</Link>
        </nav>
          <Link 
            to="/new_admin" 
            onClick={onClose}
            className='btn-siderbar'
            >Agregar Administrador</Link>
        {(userActive == 'Usuario no autenticado')
                    ?
                        <button 
                          className="submit-btn btn-login"
                          onClick={async () => {
                            navigate('/login');
                          }}>
                          Iniciar Sesion
                        </button>
                    :
                        <button 
                          className="btn-logout"
                          onClick={() => logOutFn()}>
                          Cerrar sesión
                        </button>
                    }
      </aside>
    </>
  )
}

export default Sidebar
