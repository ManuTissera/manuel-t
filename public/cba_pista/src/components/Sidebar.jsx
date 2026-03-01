import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.svg'
import arrowRight from '../assets/arrow-right-clean.svg'
import '../Files_CSS/sidebar.css'

const Sidebar = ({ isOpen, onClose }) => {
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
          <h4>Manuel Tissera</h4>
          <p>Administrador</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" onClick={onClose}>Inicio</Link>
          <Link to="/pilots" onClick={onClose}>Pilotos</Link>
          <Link to="/new_record" onClick={onClose}>Asignaciones</Link>
          <Link to="/records_tires" onClick={onClose}>Registros</Link>
          {/* <Link to="/records_table" onClick={onClose}>Table</Link> */}
          <Link to="/add_pilot" onClick={onClose}>Nuevo Piloto</Link>
          <Link to="/" onClick={onClose}>Configuración</Link>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
