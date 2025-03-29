const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../database');

// Estrategia Local corregida
passport.use(new LocalStrategy(
  { usernameField: 'correo' }, // Cambiado de 'email' a 'correo'
  async (correo, password, done) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
      
      if (!rows.length) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      // Devuelve solo los datos necesarios
      return done(null, {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
      });
    } catch (error) {
      return done(error);
    }
  }
));

// Estrategia Google optimizada
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      
      // Busca usuario por google_id o correo
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE google_id = ? OR correo = ?', 
        [profile.id, email]
      );

      if (rows.length) {
        const user = rows[0];
        
        // Actualiza google_id si no estaba establecido
        if (!user.google_id) {
          await pool.query(
            'UPDATE usuarios SET google_id = ? WHERE id = ?',
            [profile.id, user.id]
          );
        }

        return done(null, {
          id: user.id,
          nombre: user.nombre || profile.displayName,
          correo: user.correo,
          provider: 'google'
        });
      }

      // Crea nuevo usuario
      const [result] = await pool.query(
        'INSERT INTO usuarios SET ?', 
        {
          google_id: profile.id,
          nombre: profile.displayName,
          correo: email,
          password: '' // Contraseña vacía para usuarios OAuth
        }
      );

      return done(null, {
        id: result.insertId,
        nombre: profile.displayName,
        correo: email,
        provider: 'google'
      });
    } catch (error) {
      console.error('Google Auth Error:', error);
      return done(error);
    }
  }
));

// Estrategia GitHub optimizada
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
  scope: ['user:email'], // Solicitar acceso a emails
  passReqToCallback: true // Para debugging
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log('GitHub Profile:', profile); // Debugging

    // Obtener el email primario (puede requerir una llamada adicional a la API)
    let email;
    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails.find(e => e.primary)?.value || profile.emails[0].value;
    } else {
      // Si no hay emails, intentar obtenerlos de la API
      try {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: { 'Authorization': `token ${accessToken}` }
        });
        const emails = await res.json();
        if (emails && emails.length > 0) {
          email = emails.find(e => e.primary)?.email || emails[0].email;
        }
      } catch (apiError) {
        console.error('Error fetching GitHub emails:', apiError);
      }
    }

    // Si después de todo no hay email, crear uno basado en el username
    if (!email) {
      email = `${profile.username}@users.noreply.github.com`;
    }

    // Buscar usuario existente
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE github_id = ? OR correo = ?',
      [profile.id, email]
    );

    if (rows.length > 0) {
      const user = rows[0];
      
      // Actualizar github_id si no estaba
      if (!user.github_id) {
        await pool.query(
          'UPDATE usuarios SET github_id = ? WHERE id = ?',
          [profile.id, user.id]
        );
      }

      return done(null, {
        id: user.id,
        nombre: user.nombre || profile.displayName || profile.username,
        correo: user.correo,
        provider: 'github'
      });
    }

    // Crear nuevo usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios SET ?', 
      {
        github_id: profile.id,
        nombre: profile.displayName || profile.username,
        correo: email,
        password: '',
        avatar: profile.photos?.[0]?.value // Opcional: guardar avatar
      }
    );

    return done(null, {
      id: result.insertId,
      nombre: profile.displayName || profile.username,
      correo: email,
      provider: 'github'
    });
  } catch (error) {
    console.error('GitHub Auth Error:', error);
    return done(error);
  }
}
));