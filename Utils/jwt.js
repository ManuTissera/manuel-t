// utils/jwt.js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

// Generar token
export const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    SECRET,
    { expiresIn: '8h' }
  );
};

// Verificar token
export const verificarToken = (token) => {
  return jwt.verify(token, SECRET);
};