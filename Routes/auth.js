// Routes/auth.js
import express from 'express';
import { login, registrar } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';
import { roleCheck } from '../middleware/roleCheck.js';

const router = express.Router();

// Login público
router.post('/login', login);

// Registro solo para Manager
router.post('/registro', authMiddleware, roleCheck(['Manager']), registrar);

export default router;