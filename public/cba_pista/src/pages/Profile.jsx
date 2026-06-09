import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileUser = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    joinDate: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Simular carga de datos - luego conectar con API
    setProfile({
      name: 'Juan Administrador',
      email: 'juan.admin@cbapista.com',
      role: 'Administrador',
      joinDate: '15 de enero, 2024'
    });

    setFormData(prev => ({
      ...prev,
      name: 'Juan Administrador',
      email: 'juan.admin@cbapista.com'
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar perfil
    console.log('Actualizar perfil:', {
      name: formData.name,
      email: formData.email
    });
    setProfile({
      ...profile,
      name: formData.name,
      email: formData.email
    });
    setIsEditing(false);
    alert('Perfil actualizado correctamente');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (formData.newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    // Aquí iría la lógica para cambiar contraseña
    console.log('Cambiar contraseña');
    alert('Contraseña actualizada correctamente');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h1 className="profile-title">Mi Perfil</h1>
          <p className="profile-date">
            Información de la cuenta
          </p>
        </div>
      </div>

      {/* Información del usuario */}
      <div className="info-section">
        <div className="info-item">
          <span className="info-label">Nombre</span>
          <span className="info-value">{profile.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Email</span>
          <span className="info-value">{profile.email}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Rol</span>
          <span className="info-value">{profile.role}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Fecha de registro</span>
          <span className="info-value">{profile.joinDate}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="profile-actions">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="action-btn"
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      {/* Formulario de edición */}
      {isEditing && (
        <div className="edit-section">
          <h3 className="edit-title">Editar información</h3>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Guardar cambios
            </button>
          </form>
        </div>
      )}

      {/* Cambiar contraseña */}
      <div className="password-section">
        <h3 className="password-title">Cambiar contraseña</h3>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label className="form-label">Contraseña actual</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmar nueva contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUser;