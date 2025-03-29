const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account' // 👈 Opcional: fuerza selección de cuenta
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login?error=auth_failed',
    successRedirect: '/perfil' // 👈 Mejor redirigir a perfil
  })
);

// GitHub OAuth (¡FALTABA EL CALLBACK!)
router.get('/github',
  passport.authenticate('github', { 
    scope: ['user:email'] 
  })
);

// 🔥 Añade este callback para GitHub
router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login?error=github_failed',
    successRedirect: '/perfil'
  })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.clearCookie('connect.sid'); // Limpia la cookie de sesión
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    req.session.destroy(() => {
      res.redirect('/?logout=success');
    });
  });
});

// Ruta de prueba
router.get('/test', (req, res) => {
  res.json({ 
    status: 'Todas las rutas de auth funcionan',
    endpoints: {
      google: '/auth/google',
      github: '/auth/github',
      logout: '/auth/logout'
    }
  });
});

module.exports = router;