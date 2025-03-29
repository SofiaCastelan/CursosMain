// Simulación para tomar imagen (Manteniendo tu código original)
const profilePic = document.getElementById("profilePic");
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");

dropArea.addEventListener("click", () => fileInput.click());

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.style.borderColor = "#4CAF50";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.borderColor = "#aaa";
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.style.borderColor = "#aaa";
    const file = event.dataTransfer.files[0];
    uploadImage(file);
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    uploadImage(file);
});

function uploadImage(file) {
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profilePic.src = event.target.result;
            // Aquí podrías agregar una llamada a tu API para guardar la imagen
        };
        reader.readAsDataURL(file);
    } else {
        alert("Por favor selecciona una imagen válida");
    }
}

function removeImage() {
    profilePic.src = "https://via.placeholder.com/150";
    // Aquí podrías agregar una llamada a tu API para eliminar la imagen
}

// Cargar datos reales del usuario
document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos del usuario
    fetch('/api/perfil')
        .then(response => {
            if (!response.ok) {
                window.location.href = '/Proyecto-cursos-main/frontend/index.html';
                throw new Error('No autenticado');
            }
            return response.json();
        })
        .then(userData => {
            // Mostrar datos del usuario
            const nombreInput = document.querySelector('.derecha input[type="text"]:first-of-type');
            const emailInput = document.querySelector('.derecha input[type="text"]:last-of-type');
            
            nombreInput.value = userData.nombre || '';
            emailInput.value = userData.correo || '';
            
            // Eliminar placeholders
            nombreInput.placeholder = '';
            emailInput.placeholder = '';
            
            // Establecer avatar
            if (userData.avatar) {
                profilePic.src = userData.avatar;
            }

            // Cargar cursos del usuario (simulación - puedes reemplazar con datos reales)
            cargarCursos();
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/Proyecto-cursos-main/frontend/index.html';
        });

    // Función para cargar cursos (manteniendo tu simulación)
    function cargarCursos() {
        const cursos = [
            { titulo: "Introducción a Blender", persona: "Juan Carlos Pérez" },
            { titulo: "Introducción a Unreal Engine", persona: "Verónica Sánchez" },
            { titulo: "Introducción a Ilustration", persona: "Raúl Fernández" },
            { titulo: "Introducción REACT", persona: "Susana Gómez" }
        ];

        const contenedor = document.getElementById("cursos");
        contenedor.innerHTML = "";

        cursos.forEach(curso => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${curso.titulo}</h3>
                <p>Curso por: ${curso.persona}</p>
            `;
            contenedor.appendChild(card);
        });
    }
});