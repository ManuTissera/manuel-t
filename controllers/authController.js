// controllers/authController.js
import bcrypt from 'bcrypt';
import pool from '../Routes/connectionBBDD.js';
import { generarToken } from '../utils/jwt.js';
 
// ── Login ────────────────────────────────────────────────────────────────────
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
 
    const token = generarToken({
      id: usuario.id_admin,
      email: usuario.email,
      rol: usuario.user_rol,
    });
 
    await pool.query(
      `INSERT INTO user_activity (id_user, activity, detail) VALUES ($1, $2, $3)`,
      [usuario.id_admin, 'Log In', `Login exitoso - email: ${usuario.email}`]
    );
 
    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id_admin,
        email: usuario.email,
        rol: usuario.user_rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
 
// ── Register (Manager only) ───────────────────────────────────────────────────
export const registrar = async (req, res) => {
  const { email, password, first_name, second_name, users_name, user_rol } = req.body;
 
  // Validate all required fields
  if (!email || !password || !first_name || !second_name || !users_name || !user_rol) {
    return res.status(400).json({ error: 'All fields are required' });
  }
 
  const rolesPermitidos = ['Administrador', 'Auditor', 'Publico'];
  if (!rolesPermitidos.includes(user_rol)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
 
  try {
    // Check if email already exists
    const existing = await pool.query(
      'SELECT id_admin FROM users_admin WHERE email = $1',
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }
 
    const passwordHash = await bcrypt.hash(password, 10);
 
    const inserted = await pool.query(
      `INSERT INTO users_admin (first_name, second_name, user_rol, email, users_name, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_admin`,
      [first_name, second_name, user_rol, email, users_name, passwordHash]
    );
 
    // Log activity — uses the Manager's id from the token
    await pool.query(
      `INSERT INTO user_activity (id_user, activity, detail) VALUES ($1, $2, $3)`,
      [
        req.usuario.id,
        'Create Account',
        `Manager ${req.usuario.email} created account for ${email} with role ${user_rol}`,
      ]
    );
 
    res.status(201).json({
      message: 'Account created successfully',
      id: inserted.rows[0].id_admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
 
// ── Logout ───────────────────────────────────────────────────────────────────
export const logout = async (req, res) => {
  const { id, email } = req.usuario;
 
  try {
    await pool.query(
      `INSERT INTO user_activity (id_user, activity, detail) VALUES ($1, $2, $3)`,
      [id, 'Log Out', `Logout - email: ${email}`]
    );
 
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
 