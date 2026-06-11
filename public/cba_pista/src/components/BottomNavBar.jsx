

import homeIcon from '../assets/home.svg';
import profileIcon from '../assets/profile-icon.svg';
import addRecordIcon from '../assets/add-record.svg';
import registerIcon from '../assets/registry.svg';


import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // Determinar tab activo según la ruta actual
    const path = location.pathname;
    if (path === '/home' || path === '/') return 'buscar';
    if (path === '/postulaciones') return 'postulaciones';
    if (path === '/avisos') return 'avisos';
    if (path === '/favoritos') return 'favoritos';
    return 'buscar';
  });

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  const tabs = [
    { id: 'home', label: 'Home', path: '/home', icon: <img className="bar-home-icon" src={homeIcon} alt="Buscar" /> },
    { id: 'add', label: 'Nuevo Reg.', path: '/new_record', icon: <img className="bar-home-icon" src={addRecordIcon} /> },
    { id: 'register', label: 'Registro', path: '/records_tires', icon: <img className="bar-home-icon" src={registerIcon} /> },
    { id: 'perfil', label: 'Perfil', path: '/profile', icon: <img className="bar-home-icon" src={profileIcon} /> }
  ];

  return (
    <nav className="bottom-navbar">
      {tabs.map((tab) => (
        // <button
        //   key={tab.id}
        //   className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
        //   onClick={() => handleTabClick(tab.id, tab.path)}
        // >
        //   <span className="bottom-nav-icon">{tab.icon}</span>
        //   <span className="bottom-nav-label">{tab.label}</span>
        // </button>
        <Link to={tab.path}
          key={tab.id}
          className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id, tab.path)}
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavBar;