const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar autenticación con Google
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

module.exports = router;