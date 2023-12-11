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
    static crearDesdeJSON(jsonMonstruo) {
        const { id, nombre, tipo, alias, miedo, defensa, imagen } = jsonMonstruo;
        const idEntero = parseInt(id, 10);
        return new Monstruo(idEntero, nombre, tipo, alias, miedo, defensa, imagen);
    }
}
/*
const monstruos = [
    new Monstruo(1, "Drácula", "Vampiro", "Conde Drácula", "90", "Medio", "imagenes/dracula.webp"),
    new Monstruo(2, "Frankenstein", "No-muerto", "Frankie", "70", "Alto", "imagenes/frankestein.png"),
    new Monstruo(3, "Hombre Lobo", "Licántropo", "Lobo", "80", "Alto", "imagenes/hombrelobo.avif"),
    new Monstruo(4, "Fantasma", "Espíritu", "Casper", "50", "Bajo", "imagenes/fantasma.png"),
    new Monstruo(5, "Momia", "No-muerto", "Imhotep", "60", "Medio", "imagenes/momia.jpg"),
    new Personaje(6, "Nuevito", "Genérico")
    // Agrega más monstruos según tus necesidades
];*/
let monstruos=[];
//const opcionesTipo = ['Esqueleto', 'Zombie', 'Vampiro', 'Fantasma', 'Bruja', 'Hombre Lobo'];
//localStorage.setItem('opcionesTipo', JSON.stringify(opcionesTipo));

// Recuperar opcionesTipo del localStorage o usar un array vacío si no hay datos
const opcionesTipo = JSON.parse(localStorage.getItem('opcionesTipo')) || [];


function mostrarListaMonstruosTabla() {
    const listaMonstruosElement = document.getElementById('listaMonstruosTabla');

    // Construir la tabla
    const tablaHTML = `
        <table class="monstruos-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Alias</th>
                    <th>Miedo</th>
                    <th>Defensa</th>
                </tr>
            </thead>
            <tbody>
                ${monstruos.map(monstruo => `
                    <tr class="monstruo-row" onclick="cargarDatosEnFormulario(${monstruo.id})">
                        <td>${monstruo.nombre}</td>
                        <td>${monstruo.tipo}</td>
                        <td>${monstruo.alias}</td>
                        <td>${monstruo.miedo}</td>
                        <td>${monstruo.defensa}</td>
                        <td>
                            <button class="baja-button" onclick="bajaMonstruo(${monstruo.id})">Baja</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Establecer el contenido de listaMonstruosElement con la tabla HTML
    listaMonstruosElement.innerHTML = tablaHTML;
}
function cargarDatosEnFormulario(id) {
    const monstruo = monstruos.find(monstruo => monstruo.id === id);

    if (monstruo) {
        document.getElementById('nombre').value = monstruo.nombre;
        document.getElementById('tipo').value = monstruo.tipo;
        document.getElementById('alias').value = monstruo.alias;
        document.getElementById('miedo').value = monstruo.miedo;
        document.getElementById('imagen').value = monstruo.imagen;

        // Cargar el valor del radio button de defensa
        const radioDefensa = document.querySelectorAll('input[name="defensa"]');
        radioDefensa.forEach(radio => {
            if (radio.value === monstruo.defensa) {
                radio.checked = true;
            }
        });
    }
}




function mostrarFormularioAlta() {
    // Llama a la función para generar el formulario
    generarFormulario();
    
    // Muestra el formulario de alta
    document.getElementById('formularioAlta').style.display = 'block';

    // Oculta el botón "Alta"
    document.getElementById('btnAlta').style.display = 'none';
}

function ocultarFormularioAlta() {
    // Oculta el formulario de alta
    document.getElementById('formularioAlta').style.display = 'none';

    // Limpia el formulario al ocultarlo
    document.getElementById('altaForm').innerHTML = '';

    // Muestra el botón "Alta"
    document.getElementById('btnAlta').style.display = 'block';
}

function actualizarTipo(id, nuevoTipo) {
    const monstruo = monstruos.find(monstruo => monstruo.id === id);

    if (monstruo) {
        monstruo.tipo = nuevoTipo;
        // Guardar en el localStorage
        localStorage.setItem(`tipo-${id}`, nuevoTipo);
    }
}
function altaMonstruoDesdeFormulario() {
    // Obtén los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const alias = document.getElementById('alias').value;
    const miedo = document.getElementById('miedo').value;
    const defensa = document.querySelector('input[name="defensa"]:checked')?.value;
    const imagen = document.getElementById('imagen').value;

    // Validaciones
    if (!nombre || !tipo || !alias || !miedo || !defensa || !imagen) {
        // Si falta algún campo, muestra un mensaje de error y no realiza la acción
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Lógica para agregar el monstruo a la lista
    const nuevoMonstruo = new Monstruo(
        monstruos.length + 1,  // ID único, puedes ajustar esto según tu lógica
        nombre,
        tipo,
        alias,
        miedo,
        defensa,
        imagen
    );

    // Agrega el nuevo monstruo a la lista
    monstruos.push(nuevoMonstruo);
    enviarDatosALaAPI(nuevoMonstruo);

    // Limpia el formulario y oculta
    ocultarFormularioAlta();

    // Actualiza la lista de monstruos en la página
    mostrarListaMonstruosTabla();
}

function generarFormulario() {
    const campos = ["Nombre", "Tipo", "Alias", "Miedo", "Defensa", "Imagen"];

    // Obtén el formulario
    const formulario = document.getElementById('altaForm');

    // Limpiar contenido anterior del formulario
    formulario.innerHTML = '';

    // Genera dinámicamente los campos del formulario
    campos.forEach(campo => {
        const label = document.createElement('label');
        label.innerText = campo + ':';
        label.classList.add('halloween-label'); // Agrega clase para estilo Halloween

        let input;

        if (campo === 'Miedo') {
            input = createRangeInput();
            input.classList.add('halloween-input'); // Agrega clase para estilo Halloween
        } else if (campo === 'Defensa') {
            input = createRadioButtonInput(campo.toLowerCase());
        } else if (campo === 'Tipo') {
            input = createSelectInput(campo.toLowerCase(), true);
            input.classList.add('halloween-select'); // Agrega clase para estilo Halloween
        } else {
            input = createTextInput(campo.toLowerCase());
            input.classList.add('halloween-input'); // Agrega clase para estilo Halloween
        }

        formulario.appendChild(label);
        formulario.appendChild(input);
        formulario.appendChild(document.createElement('br')); // Agrega un salto de línea entre los campos
    });
}

function createRadioButtonInput(id) {
    const radioContainer = document.createElement('div');
    radioContainer.id = id;

    ["Bajo", "Medio", "Alto"].forEach(opcion => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = id;
        radio.value = opcion.toLowerCase();

        const label = document.createElement('label');
        label.innerText = opcion;

        radioContainer.appendChild(radio);
        radioContainer.appendChild(label);
    });

    return radioContainer;
}

function createSelectInput(id, esTipo) {
    const select = document.createElement('select');
    select.id = id;
    select.required = true;
    select.classList.add('halloween-select'); // Agrega clase para estilo Halloween

    // Agrega opciones al elemento select
    const opciones = esTipo ? opcionesTipo : ["Bajo", "Medio", "Alto"];
    opciones.forEach(opcion => {
        const option = document.createElement('option');
        option.value = opcion.toLowerCase();
        option.text = opcion;
        select.appendChild(option);
    });

    return select;
}

function createTextInput(id) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.placeholder = id.charAt(0).toUpperCase() + id.slice(1); // Convierte la primera letra a mayúscula
    input.required = true;
    return input;
}

function createRangeInput() {
    const input = document.createElement('input');
    input.type = 'range';
    input.id = 'miedo';
    input.min = '1';
    input.max = '100';
    input.value = '50'; // Valor inicial (puedes ajustarlo según tus necesidades)
    input.classList.add('halloween-input'); // Agrega clase para estilo Halloween
    return input;
}
function bajaMonstruo(id) {
    // Encuentra el índice del monstruo con el ID proporcionado
    const indice = monstruos.findIndex(monstruo => monstruo.id === id);
    console.log(indice);
    // Si se encontró el monstruo, elimínalo del array y luego de la API
    if (indice !== -1) {
        const monstruoEliminado = monstruos.splice(indice, 1)[0]; // Extrae el monstruo eliminado

        // Borra el monstruo de la API
        borrarDatosApi(id)
            .then(() => {
                // Actualiza la lista de monstruos en la página solo después de borrar de la API
                mostrarListaMonstruosTabla();
            })
            .catch(error => {
                console.error('Error al borrar datos en la API:', error.message);
                // Si hay un error, podrías revertir la eliminación del monstruo en el array
                monstruos.splice(indice, 0, monstruoEliminado);
            });
    }
}

/*
function modificarMonstruo(id) {
    // Encuentra el índice del monstruo con el ID proporcionado
    const indice = monstruos.findIndex(monstruo => monstruo.id === id);

    // Si se encontró el monstruo, obtén los nuevos valores del formulario y modifica en la API
    if (indice !== -1) {
        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const alias = document.getElementById('alias').value;
        const miedo = document.getElementById('miedo').value;
        const defensa = document.getElementById('defensa').value;
        const imagen = document.getElementById('imagen').value;

        // Validaciones
        if (!nombre || !tipo || !alias || !miedo || !defensa || !imagen) {
            // Si falta algún campo, muestra un mensaje de error y no realiza la acción
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Crea un nuevo objeto con los nuevos valores
        const nuevoMonstruo = new Monstruo(id, nombre, tipo, alias, miedo, defensa, imagen);

        // Modifica el monstruo en la API
        modificarObjetoEnApi(id, nuevoMonstruo)
            .then(() => {
                // Limpia el formulario y oculta
                ocultarFormularioAlta();
                // Actualiza la lista de monstruos en la página solo después de modificar en la API
                mostrarListaMonstruosTabla();
            })
            .catch(error => {
                console.error('Error al modificar datos en la API:', error.message);
            });
    }
}
*/
const url = 'https://650c46d147af3fd22f67653e.mockapi.io/Monstruos';

const enviarDatosALaAPI = async (monstruo) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monstruo)
        });

        if (!response.ok) {
            throw new Error('Error al enviar datos a la API');
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('Error:', error.message);
    }

};

const borrarDatosApi = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al borrar datos en la API');
        }

        const data = await response.json();
        console.log('Datos borrados en la API:', data);

        return data; // Devuelve los datos borrados

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const modificarObjetoEnApi = async (id, objeto) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        });

        if (!response.ok) {
            throw new Error('Error al modificar datos en la API');
        }

        const data = await response.json();
        console.log('Datos modificados en la API:', data);

        return data; // Devuelve los datos modificados

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const obtenerDatosDeAPI = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const guardarDatosEnArray = async () => {
    try {
        const datosAPI = await obtenerDatosDeAPI();
        monstruos.length = 0;  // Limpia el array existente

        datosAPI.forEach(jsonMonstruo => {
            const monstruo = Monstruo.crearDesdeJSON(jsonMonstruo);
            monstruos.push(monstruo);
        });

        console.log('Monstruos obtenidos de la API y almacenados en un array:', monstruos);
        return monstruos;
    } catch (error) {
        console.error('Error al guardar datos en un array:', error.message);
    }
};

guardarDatosEnArray()
    .then(monstruos => {
        console.log('Monstruos obtenidos:', monstruos);
        mostrarListaMonstruosTabla();  // Llama a mostrarListaMonstruosTabla después de obtener los datos
    })
    .catch(error => {
        console.error('Hubo un error al obtener los datos de la API:', error.message);
    });


const cargarYMostrarMonstruos = async () => {
    try {
        await guardarDatosEnArray();
        mostrarListaMonstruosTabla();
    } catch (error) {
        console.error('Hubo un error al cargar y mostrar los datos:', error.message);
    }
};

cargarYMostrarMonstruos();
