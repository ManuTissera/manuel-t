import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo_cba_pista from '../assets/Logo_cba_pista_rend.png';

const Header2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/home':
        return 'Inicio';
      case '/pilots':
        return 'Pilotos';
      case '/new_admin':
        return 'Nuevo Administrador';
      case '/records_table':
        return 'Registros';
      case '/add_pilot':
        return 'Agregar Piloto';
      case '/records_tires':
        return 'Registro de Neumáticos';
      case '/new_record':
        return 'Nuevo Registro';
      default:
        return 'Dashboard';
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <span className="menu-icon">☰</span>
          </button>
          
          <div className="header-logo">
            <img src={Logo_cba_pista} alt="Cba Pista" className="header-logo-img" />
          </div>
          
          <h1 className="header-title">{getPageTitle()}</h1>
          
          <div className="header-actions">
            <Link to="/login" className="logout-btn">
              <span className="logout-icon">🚪</span>
              <span className="logout-text">Salir</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <img src={Logo_cba_pista} alt="Cba Pista" className="sidebar-logo" />
              <button className="sidebar-close" onClick={toggleSidebar}>✕</button>
            </div>
            <nav className="sidebar-nav">
              <Link to="/home" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">🏠</span>
                <span>Inicio</span>
              </Link>
              <Link to="/pilots" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">👨‍✈️</span>
                <span>Pilotos</span>
              </Link>
              <Link to="/add_pilot" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">➕</span>
                <span>Agregar Piloto</span>
              </Link>
              <Link to="/records_table" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">📋</span>
                <span>Registros</span>
              </Link>
              <Link to="/records_tires" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">🛞</span>
                <span>Neumáticos</span>
              </Link>
              <Link to="/new_record" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">📝</span>
                <span>Nuevo Registro</span>
              </Link>
              <Link to="/new_admin" className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">👑</span>
                <span>Nuevo Admin</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header2;