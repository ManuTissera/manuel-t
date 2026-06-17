import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalPilots: 0,
    totalRecords: 0
  });

  useEffect(() => {
    // Datos de ejemplo - luego conectar con API
    setStats({
      totalPilots: 24,
      totalRecords: 156
    });
  }, []);

  return (
    <div className="home-container">
      {/* Header simple */}
      <div className="home-header">
        <div>
          <h1 className="home-title">Bienvenido</h1>
          <p className="home-date">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats cards - solo 2 */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-label">Fecha Numero</span>
          {/* <span className="stat-number">{stats.totalPilots}</span> */}
          <span className="stat-number">Iniciar</span>
          
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.totalRecords}</span>
          <span className="stat-label">Registros Totales</span>
        </div>
      </div>

      {/* Acciones principales - solo 3 botones */}
      <div className="actions-section">
        <Link to="/pilots" className="action-link">
          <span className="action-link-icon">→</span>
          Ver Pilotos
        </Link>
        <Link to="/add_pilot" className="action-link">
          <span className="action-link-icon">→</span>
          Agregar Piloto
        </Link>
        <Link to="/new_record" className="action-link">
          <span className="action-link-icon">→</span>
          Nuevo Registro
        </Link>
      </div>

      {/* Resumen simple */}
      <div className="summary-card">
        <h3 className="summary-title">Resumen Rápido</h3>
        <p className="summary-text">
          Sistema de gestión de pilotos y registros. 
          Utilice el menú o los accesos directos para navegar.
        </p>
      </div>
    </div>
  );
};

export default HomePage;