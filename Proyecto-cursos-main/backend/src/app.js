require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Configuración mejorada de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5500',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración mejorada de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto-de-desarrollo',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // true en producción si usas HTTPS
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 día
  },
  name: 'sid' // Nombre personalizado para la cookie
}));

// Passport (asegúrate que el archivo passport.js está correcto)
require('./auth/passport');
app.use(passport.initialize());
app.use(passport.session());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Middleware de autenticación reusable
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'No autenticado' });
};

// API para datos del usuario
app.get('/api/perfil', isAuthenticated, (req, res) => {
  res.json({
    nombre: req.user.nombre,
    correo: req.user.correo,
    avatar: req.user.avatar_url || 'https://via.placeholder.com/150',
    provider: req.user.provider || 'local'
  });
});

// Ruta para el perfil
app.get('/perfil', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/Perfil/perfil.html'));
});

// Ruta de verificación de salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor en http://localhost:${PORT}`);
  console.log(`🔑 Configuración de GitHub OAuth:`);
  console.log(`   - Client ID: ${process.env.GITHUB_CLIENT_ID ? '✅ Configurado' : '❌ Faltante'}`);
  console.log(`   - Callback URL: http://localhost:${PORT}/auth/github/callback`);
});