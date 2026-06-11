// controllers/authController.js
import bcrypt from 'bcrypt';
import pool from '../Routes/connectionBBDD.js'; // Ajustá la ruta a tu conexión
import { generarToken } from '../utils/jwt.js';

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }
  
  try {
    // Buscar usuario en BD (ajustá nombre de tabla)
    const result = await pool.query(
      'SELECT id, email, password_hash, rol FROM usuarios WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const usuario = result.rows[0];
    
    // Comparar password
    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    
    if (!passwordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Generar token
    const token = generarToken(usuario);
    
    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Registro (solo Manager)
export const registrar = async (req, res) => {
  const { email, password, rol } = req.body;
  
  // Validar rol permitido
  const rolesPermitidos = ['Administrador', 'Auditor', 'Publico'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol no válido' });
  }
  
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO usuarios (email, password_hash, rol) VALUES ($1, $2, $3)',
      [email, passwordHash, rol]
    );
    
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};