document.addEventListener('DOMContentLoaded', function () {
    var gifElement = document.getElementById('miGif');
    gifElement.style.display = 'block';

    // Mostrar el gif durante 2 segundos
    setTimeout(function () {
        gifElement.style.display = 'none';

        // Ahora carga el resto de la página después de que se oculta el gif
        cargarRestoPagina();
    }, 2000);
    
    // Definición de la clase Personaje
    class Personaje {
        constructor(id, nombre, tipo) {
            this.id = id;
            this.nombre = nombre;
            this.tipo = tipo;
        }
    }

    // Definición de la clase Monstruo que hereda de Personaje
    class Monstruo extends Personaje {
        constructor(id, nombre, tipo, alias, miedo, defensa, imagen) {
            super(id, nombre, tipo);
            this.alias = alias;
            this.miedo = miedo;
            this.defensa = defensa;
            this.imagen = imagen;
        }
        mostrarMoustruo() {
            return `El monstruo ${this.nombre}`;
        }
    }

    const monstruos = [
        new Monstruo(1, "Drácula", "Vampiro", "Conde Drácula", "90", "Medio", "imagenes/dracula.webp"),
        new Monstruo(2, "Frankenstein", "No-muerto", "Frankie", "70", "Alto", "imagenes/frankestein.png"),
        new Monstruo(3, "Hombre Lobo", "Licántropo", "Lobo", "80", "Alto", "imagenes/hombrelobo.avif"),
        new Monstruo(4, "Fantasma", "Espíritu", "Casper", "50", "Bajo", "imagenes/fantasma.png"),
        new Monstruo(5, "Momia", "No-muerto", "Imhotep", "60", "Medio", "imagenes/momia.jpg"),
        new Personaje(6, "Nuevito", "Genérico")
        // Agrega más monstruos según tus necesidades
    ];

    function mostrarListaMonstruos() {
        const listaMonstruosElement = document.getElementById('listaMonstruos');

        // Iterar sobre la lista de monstruos y construir el HTML
        monstruos.forEach(monstruo => {
            const monstruoHTML = `
            <div>
              <img src="${monstruo.imagen}" alt="${monstruo.nombre}">
              <p>${monstruo.mostrarMoustruo()}</p>
              <p>Tipo: ${monstruo.tipo}</p>
              <p>Alias: ${monstruo.alias}</p>
              <p>Miedo: ${monstruo.miedo}</p>
              <p>Defensa: ${monstruo.defensa}</p>
            </div>
          `;
            listaMonstruosElement.innerHTML += monstruoHTML;
        });
    }

    function cargarRestoPagina() {
        // Llama a la función para cargar el resto de la página
        mostrarListaMonstruos();
        // Agrega aquí cualquier otra lógica de carga que necesites
    }
});
