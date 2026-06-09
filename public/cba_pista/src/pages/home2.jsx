import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage2 = () => {
  const [stats, setStats] = useState({
    totalPilots: 0,
    totalRecords: 0,
    recentActivities: []
  });

  // Simular carga de datos - luego conectar con API
  useEffect(() => {
    // Datos de ejemplo
    setStats({
      totalPilots: 24,
      totalRecords: 156,
      recentActivities: [
        { id: 1, action: 'Nuevo piloto agregado', pilot: 'Juan Pérez', date: '2024-01-15' },
        { id: 2, action: 'Registro de neumáticos', pilot: 'Carlos López', date: '2024-01-14' },
        { id: 3, action: 'Actualización de auto', pilot: 'Miguel Rodríguez', date: '2024-01-13' },
        { id: 4, action: 'Nuevo registro de tiempo', pilot: 'Ana Martínez', date: '2024-01-12' }
      ]
    });
  }, []);

  const quickActions = [
    { to: '/add_pilot', icon: '👨‍✈️', title: 'Agregar Piloto', color: '#3a9fd1', bg: 'rgba(58, 159, 209, 0.1)' },
    { to: '/new_record', icon: '📝', title: 'Nuevo Registro', color: '#4caf50', bg: 'rgba(76, 175, 80, 0.1)' },
    { to: '/pilots', icon: '📋', title: 'Ver Pilotos', color: '#ff9800', bg: 'rgba(255, 152, 0, 0.1)' },
    { to: '/records_table', icon: '🏁', title: 'Ver Registros', color: '#9c27b0', bg: 'rgba(156, 39, 176, 0.1)' }
  ];

  const statsCards = [
    { label: 'Pilotos Activos', value: stats.totalPilots, icon: '👥', color: '#3a9fd1' },
    { label: 'Registros Totales', value: stats.totalRecords, icon: '📊', color: '#4caf50' },
    { label: 'Categorías', value: '7', icon: '🏎️', color: '#ff9800' },
    { label: 'Este Mes', value: '23', icon: '📅', color: '#9c27b0' }
  ];

  return (
    <div className="home-container">
      {/* Bienvenida */}
      <div className="welcome-section">
        <div className="welcome-text">
          <h1 className="welcome-title">
            ¡Bienvenido, Administrador!
          </h1>
          <p className="welcome-subtitle">
            Panel de control - Gestión de Pilotos y Registros
          </p>
        </div>
        <div className="welcome-date">
          <span className="date-icon">📅</span>
          <span className="date-text">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderBottomColor: stat.color }}>
            <div className="stat-header">
              <span className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                {stat.icon}
              </span>
              <span className="stat-value">{stat.value}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">
          <span className="title-icon">⚡</span>
          Acciones Rápidas
        </h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <Link to={action.to} key={index} className="action-card" style={{ backgroundColor: action.bg, borderColor: action.color }}>
              <span className="action-icon" style={{ color: action.color }}>{action.icon}</span>
              <span className="action-title">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Actividades Recientes */}
      <div className="recent-section">
        <h2 className="section-title">
          <span className="title-icon">🔄</span>
          Actividades Recientes
        </h2>
        <div className="recent-list">
          {stats.recentActivities.map((activity) => (
            <div key={activity.id} className="recent-item">
              <div className="recent-icon">📌</div>
              <div className="recent-content">
                <div className="recent-action">{activity.action}</div>
                <div className="recent-pilot">{activity.pilot}</div>
              </div>
              <div className="recent-date">{activity.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips o información adicional */}
      <div className="tips-section">
        <div className="tip-card">
          <span className="tip-icon">💡</span>
          <div className="tip-content">
            <h3 className="tip-title">Consejo Rápido</h3>
            <p className="tip-text">
              Recuerda mantener actualizados los datos de los pilotos y los registros de neumáticos para un mejor seguimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage2;