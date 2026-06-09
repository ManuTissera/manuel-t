import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddPilots2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    categoria: '',
    numero: '',
    auto: '',
    fecha: ''
  });

  const categorias = [
    'Clase 1',
    'Clase 2',
    'Clase 3',
    'Clase 4',
    'Turismo Nacional',
    'TC Pista',
    'TC'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el piloto
    console.log('Datos del piloto:', formData);
    // Mostrar mensaje de éxito y redirigir o limpiar formulario
    alert('Piloto agregado correctamente');
    // Limpiar formulario después de enviar
    setFormData({
      nombre: '',
      apellido: '',
      categoria: '',
      numero: '',
      auto: '',
      fecha: ''
    });
  };

  return (
    <div className="container-add-pilot">
      <div className="header-add-pilot">
        <h2 className="title-add-pilot">Agregar Nuevo Piloto</h2>
        <Link to="/pilots" className="btn-view-pilots">
          <span className="icon-table">📋</span>
          Ver Tabla de Pilotos
        </Link>
      </div>

      <form className="form-add-pilot" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido" className="form-label">
              Apellido <span className="required">*</span>
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese el apellido"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="categoria" className="form-label">
              Categoría <span className="required">*</span>
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numero" className="form-label">
              Número de Piloto <span className="required">*</span>
            </label>
            <input
              type="number"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej: 157"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="auto" className="form-label">
              Auto <span className="required">*</span>
            </label>
            <input
              type="text"
              id="auto"
              name="auto"
              value={formData.auto}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej: Ford Focus, Chevrolet Cruze, etc."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fecha" className="form-label">
              Fecha <span className="required">*</span>
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            <span className="btn-icon">💾</span>
            Guardar Piloto
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                nombre: '',
                apellido: '',
                categoria: '',
                numero: '',
                auto: '',
                fecha: ''
              });
            }}
            className="btn-clear"
          >
            <span className="btn-icon">🗑️</span>
            Limpiar Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPilots2;