// Primer modificacion
// Variables
const formulario = document.querySelector('#formulario');
const usuario = document.querySelector('#usuario');
const clave = document.querySelector('#clave');
const btnIngresar = document.querySelector('#ingresar');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Eventos
formulario.addEventListener('submit', validarFormulario);

// Funciones
function validarFormulario(evento) {
    // Detener submit
    evento.preventDefault();

    // Validar si algun campo esta vacio:
    if (usuario.value === '' || clave.value === '') {
        mostrarMsj('Debe completar todos los campos', 'error');
        return;
    }

    // Validar email usando una expresion regular:
    else if (!er.test(usuario.value)) {
        mostrarMsj('Debe ingresar un correo válido', 'error');
        return;
    }

    // Validar email usando .includes() si el campo usuario incluye '@':
    // else if(!usuario.value.includes('@')) {
    //     mostrarMsj('El campo Usuario debe incluir el @')
    //     return;
    // }


    // Si pasa la validacion:
    mostrarMsj('Ingresando...', 'correcto');
}

function mostrarMsj(msj, tipo) {
    // Limpiar html
    limpiarHtml();

    // Agregar contenido a divMsj
    const divMsj = document.createElement('div');
    divMsj.classList.add('border', 'rounded', 'my-3', 'p-3', 'text-center');
    divMsj.innerHTML = `
        <span class = 'font-600 text-capitalize'>${tipo}!</span>
        <p class = 'my-0 py-0'>${msj}</p>
    `

    // Agregar clases para 'error':
    if (tipo === 'error') {
        divMsj.classList.add('border-danger', 'text-danger');
    }
    
    // Agregar clases para 'correcto':
    else {
        divMsj.classList.add('border-success', 'text-success');
        usuario.disabled = true;
        clave.disabled = true;
        usuario.classList.add('text-muted');
        clave.classList.add('text-muted');

        // Eliminar dsp de 2 segundos
        setTimeout(function () {
            formulario.reset();
            usuario.disabled = false;
            clave.disabled = false;
            usuario.classList.remove('text-muted');
            clave.classList.remove('text-muted');
        }, 2000);
    }

    // Agregar al HTML
    mensaje.appendChild(divMsj);

    //Eliminar dsp de 2 segundos
    setTimeout(function () {
        divMsj.remove();
    }, 2000);
}

function limpiarHtml() {
    while (mensaje.firstChild) {
        mensaje.removeChild(mensaje.firstChild);
    }
}