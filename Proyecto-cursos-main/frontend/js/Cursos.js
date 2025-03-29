document.addEventListener("DOMContentLoaded", function () {
    const cursos = [
        { titulo: "Introducción al Desarrollo Web", persona: "Juan Pérez", imagen: "https://img.freepik.com/foto-gratis/ingeniero-ti-haciendo-codigo_1098-21512.jpg?t=st=1743111739~exp=1743115339~hmac=58fc9ea11af098784c6095a03c903a52022ae0b7867c48588640d03cc807b4f3&w=900" },
        { titulo: "Introducción a Python", persona: "Ana Gómez", imagen: "https://img.freepik.com/foto-gratis/persona-trabajando-html-computadora_23-2150040424.jpg?t=st=1743111854~exp=1743115454~hmac=dda60e8f25c8da9cdda1a91e56cac7e654e517cbba0041f007a60f17dc367192&w=1380" },
        { titulo: "Introducción a JavaScript (animación)", persona: "Luis Martínez", imagen: "https://img.freepik.com/foto-gratis/programador-trabajando-codigo-programacion-pc-escritorio_158595-5214.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción al Diseño Web", persona: "Marta Sánchez", imagen: "https://img.freepik.com/foto-gratis/laboratorio-computacion-moderno-equipado_23-2149241226.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a WordPress", persona: "Carlos Rodríguez", imagen: "https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010125.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a openFrameworks", persona: "Laura Fernández", imagen: "https://img.freepik.com/foto-gratis/concepto-collage-html-css-persona_23-2150062008.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción apps para ¡Phone", persona: "José López", imagen: "https://img.freepik.com/foto-gratis/vista-posterior-programador-trabajando-toda-noche_1098-18697.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a PHP", persona: "Pedro García", imagen: "https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010144.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a UX", persona: "Sofía Fernández", imagen: "https://img.freepik.com/foto-gratis/imagen-primer-plano-programador-trabajando-su-escritorio-oficina_1098-18707.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a IA con Python", persona: "Ricardo Jiménez", imagen: "https://img.freepik.com/foto-gratis/coding-man_1098-18084.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Diseño tipográfico", persona: "Elena Martínez", imagen: "https://img.freepik.com/vector-gratis/composicion-isometrica-disenadores-ui-ux-personas-pequenas-que-crean-diseno-personalizado-ilustracion-vectorial-3d-sitio-web_1284-68939.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a HTML", persona: "David Pérez", imagen: "https://img.freepik.com/foto-gratis/collage-fondo-programacion_23-2149901789.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a CSS", persona: "Rosa García", imagen: "https://img.freepik.com/vector-gratis/ilustracion-concepto-programacion_114360-1351.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Motion Desing", persona: "Andrés López", imagen: "https://img.freepik.com/foto-gratis/persona-frente-computadora-trabajando-html_23-2150038835.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Modelos GPT", persona: "Cristina Rodríguez", imagen: "https://img.freepik.com/foto-gratis/concepto-humano-versus-ia_1194-617312.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Diseño Responsive", persona: "Javier Sánchez", imagen: "https://img.freepik.com/vector-gratis/ilustracion-concepto-interfaz_114360-22213.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Figma", persona: "Lucía Martínez", imagen: "https://img.freepik.com/vector-gratis/coleccion-elementos-degradados-ui-ux_79603-1923.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Objeros gráficos", persona: "José Rodríguez", imagen: "https://img.freepik.com/vector-gratis/gestion-inteligente-hogar_23-2148607362.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Unity", persona: "Fernando López", imagen: "https://img.freepik.com/vector-gratis/jugadores-que-usan-diferentes-dispositivos-juegan-telefonos-moviles-tabletas-computadoras-portatiles-consolas-ilustracion-dibujos-animados_74855-14380.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Pixel Art", persona: "María García", imagen: "https://img.freepik.com/vector-gratis/fondo-mistico-arte-pixel_52683-87349.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Blender", persona: "Juan Carlos Pérez", imagen: "https://img.freepik.com/vector-gratis/coleccion-elementos-pixel-art-diseno-plano_23-2150177553.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Unreal Engine", persona: "Verónica Sánchez", imagen: "https://img.freepik.com/vector-gratis/juego-joystick-tecnologia-deportiva_138676-2045.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción a Ilustration", persona: "Raúl Fernández", imagen: "https://img.freepik.com/vector-gratis/elementos-juego-videojuegos-dibujados-mano_23-2150310081.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" },
        { titulo: "Introducción REACT", persona: "Susana Gómez", imagen: "https://img.freepik.com/vector-gratis/ilustracion-cuantica-abstracta-creativa_23-2149236239.jpg?ga=GA1.1.1469482797.1742149973&semt=ais_hybrid" }
    ];
    

    const contenedor = document.getElementById("cursos");

    // Función para mostrar todos los cursos
    function mostrarCursos() {
        contenedor.innerHTML = ""; // Limpiar el contenedor de cursos
        cursos.forEach(curso => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${curso.imagen}" alt="${curso.titulo}" loading="lazy">
                <h3>${curso.titulo}</h3>
                <p>Curso por: ${curso.persona}</p>
                <button>Comprar</button>
            `;
            contenedor.appendChild(card);
        });
    }

    // Función para obtener una lista aleatoria de cursos
    function obtenerCursosAleatorios(cantidad) {
        const cursosAleatorios = [];
        const cursosCopia = [...cursos]; // Hacemos una copia del array original para no modificarlo directamente

        // Seleccionar aleatoriamente cursos sin repetir
        while (cursosAleatorios.length < cantidad && cursosCopia.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * cursosCopia.length);
            cursosAleatorios.push(cursosCopia.splice(indiceAleatorio, 1)[0]); // Extraemos un curso aleatorio
        }

        return cursosAleatorios;
    }

    // Función para mostrar cursos aleatorios (Top cursos)
    function mostrarTopCursos() {
        contenedor.innerHTML = ""; // Limpiar el contenedor
        const topCursos = obtenerCursosAleatorios(8); // Obtener 8 cursos aleatorios
        topCursos.forEach(curso => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${curso.imagen}" alt="${curso.titulo}" loading="lazy">
                <h3>${curso.titulo}</h3>
                <p>Curso por: ${curso.persona}</p>
                <button>Comprar</button>
            `;
            contenedor.appendChild(card);
        });
    }

    // Función para mostrar cursos recientes
    function mostrarRecienAgregados() {
        contenedor.innerHTML = ""; // Limpiar el contenedor
        const recientes = cursos.slice(-10); // Suponiendo que los últimos 3 cursos son los más recientes
        recientes.forEach(curso => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${curso.imagen}" alt="${curso.titulo}" loading="lazy">
                <h3>${curso.titulo}</h3>
                <p>Curso por: ${curso.persona}</p>
                <button>Comprar</button>
            `;
            contenedor.appendChild(card);
        });
    }

    // Agregar eventos a cada item del menú
    document.getElementById("todosCursos").addEventListener("click", mostrarCursos);
    document.getElementById("topCursos").addEventListener("click", mostrarTopCursos);
    document.getElementById("recienAgregados").addEventListener("click", mostrarRecienAgregados);

    // Mostrar todos los cursos al cargar la página
    mostrarCursos();
});