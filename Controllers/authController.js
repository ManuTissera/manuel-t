// controllers/authController.js
import bcrypt from 'bcrypt';
import pool from '../Routes/connectionBBDD.js';
import { generarToken } from '../utils/jwt.js';

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }
  
  try {
    const result = await pool.query(
      'SELECT id_admin, email, password_hash, user_rol FROM users_admin WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const usuario = result.rows[0];
    
    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    
    if (!passwordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = generarToken(usuario);
    
    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id_admin,
        email: usuario.email,
        rol: usuario.user_rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Registro (solo Manager)
export const registrar = async (req, res) => {
  const { email, password, first_name, second_name, users_name, user_rol } = req.body;
  
  const rolesPermitidos = ['Administrador', 'Auditor', 'Publico'];
  if (!rolesPermitidos.includes(user_rol)) {
    return res.status(400).json({ error: 'Rol no válido' });
  }
  
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO users_admin (first_name, second_name, user_rol, email, users_name, password_hash) VALUES ($1, $2, $3, $4, $5, $6)',
      [first_name, second_name, user_rol, email, users_name, passwordHash]
    );
    
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};