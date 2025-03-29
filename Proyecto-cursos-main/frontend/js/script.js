// Función que agrega la clase 'visible' a los paneles al cargarse la página
window.addEventListener('load', function() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panel.classList.add('visible');  // Añade la clase 'visible' al cargar
    });
});

window.addEventListener('load', function() {
    console.log('La página se ha cargado');
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panel.classList.add('visible');  // Añade la clase 'visible' al cargar
    });
});

const loginLink = document.getElementById('loginLink');
const loginForm = document.getElementById('loginForm');
const uno = document.querySelector('.todo'); // Selecciona el contenedor con clase .uno
const closeBtn = document.getElementById('closeBtn');

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    // Alterna la visibilidad del formulario
    if (loginForm.style.display === 'none' || loginForm.style.display === '') {
        loginForm.style.display = 'block';
        uno.classList.add('blurred'); // Aplica el efecto de desenfoque a la clase .uno
    } else {
        loginForm.style.display = 'none';
        uno.classList.remove('blurred'); // Elimina el desenfoque
    }
});

closeBtn.addEventListener('click', function() {
    loginForm.style.display = 'none';
    uno.classList.remove('blurred'); // Elimina el desenfoque al cerrar el formulario
});
// Login tradicional
document.getElementById('loginFormTraditional').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            window.location.href = '/perfil'; // Redirige tras login exitoso
        } else {
            alert(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    }
});
// 1. Login Tradicional
document.getElementById('loginFormTraditional').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await fetch('http://localhost:3000/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      
      if (response.ok) {
        window.location.href = '/perfil.html'; // Redirige tras login
      } else {
        alert(data.message || 'Error en credenciales');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  });
  
  // 2. Login con Google
  document.getElementById('googleLoginBtn').addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/auth/google';
  });
  
  // 3. Login con GitHub
  document.getElementById('githubLoginBtn').addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/auth/github';
  });
  
  // 4. Verificar estado de autenticación al cargar la página
  (async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user');
      const user = await response.json();
      
      if (user && !window.location.pathname.includes('/login')) {
        // Mostrar datos del usuario en la UI
        document.getElementById('userName').textContent = user.nombre;
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'block';
      }
    } catch (error) {
      console.log('Usuario no autenticado');
    }
  })();