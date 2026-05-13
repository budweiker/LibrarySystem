📚 Contexto del Proyecto: BookStore POO Architect
Este documento establece las reglas y la arquitectura para que la IA actúe como Senior Tech Lead en el desarrollo de la tienda virtual de libros.  

🛠️ Stack Tecnológico
Lenguaje: JavaScript Moderno (ES6+) con Programación Orientada a Objetos (POO).  

Interfaz: HTML5 / CSS3 (Flexbox o Grid).  

Manipulación del DOM: Métodos nativos y creación de elementos dinámicos.  

🎯 Objetivos de la Hackathon
Desarrollar una librería interactiva que permita:

Renderizar el Catálogo: Generar las "cards" de libros dinámicamente desde un array de objetos.  

Gestión del Carrito: Agregar libros, eliminar unidades específicas, calcular el total y vaciar la lista.  

Persistencia: (Opcional) Mantener los datos al recargar la página.

Filtros: Filtrar el catálogo por categorías (ej: Ficción, Programación, Manga).  

🏗️ Arquitectura de Clases (UML)
Clase Libro: Modelo de datos con id, titulo, autor, precio, imagen y categoria.  

Clase Carrito: Lógica de negocio. Debe incluir los métodos agregarProducto, eliminarProducto, calcularTotal, vaciarCarrito y renderizar.  

Clase Tienda: Controlador principal para el manejo del catálogo y la lógica de filtrado.  

⚡ Reglas de Código y Manipulación del DOM
Creación Dinámica: Queda prohibido usar HTML estático para los productos. Se debe usar document.createElement o innerHTML controlado para generar el catálogo.  

Eventos: Implementar Event Delegation en el contenedor del catálogo para gestionar los botones de "Agregar al carrito" de manera eficiente.  

Seguridad: Usar .textContent para los títulos y autores de libros para prevenir XSS.

Estilo de Código: Uso estricto de const y let. Nombres de métodos en camelCase y descriptivos.  

🤖 Instrucciones para el Copiloto
Genera código orientado a objetos, evitando funciones sueltas que no pertenezcan a una clase.  

Al sugerir cambios en el CSS, prioriza diseños responsive que utilicen variables para los colores de la marca.  

Enfócate en la sincronización: cada vez que el estado del array de articulos cambie, el DOM del carrito debe actualizarse automáticamente.