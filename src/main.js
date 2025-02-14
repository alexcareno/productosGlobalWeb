
// Variables
const carrito = document.querySelector('#carrito');
const listaTeclados = document.querySelector('#lista-teclados');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {

	document.addEventListener('DOMContentLoaded', () => {
		articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
		carritoHTML();
	});

	// Dispara cuando se presiona "Agregar Carrito"
	listaTeclados.addEventListener('click', agregarTeclado);

	carrito.addEventListener('click', eliminarTeclado);

	// Al Vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		vaciarCarrito();
		articulosCarrito = [];
		localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
	});



}


function agregarTeclado(e) {
	e.preventDefault();
	// Delegation para agregar-carrito
	if (e.target.classList.contains('agregar-item')) {
		const teclado = e.target.parentElement.parentElement;
		leerDatosTeclado(teclado);
	}
}

function sincronizarItems() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
	carritoHTML();
}


function leerDatosTeclado(teclado) {
	const infTeclado = {
		imagen: teclado.querySelector('img').src,
		titulo: teclado.querySelector('h4').textContent,
		precio: teclado.querySelector('.precio span').textContent,
		id: teclado.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	};


	if (articulosCarrito.some(teclado => teclado.id === infTeclado.id)) {
		const teclados = articulosCarrito.map(teclado => {
			if (teclado.id === infTeclado.id) {
				teclado.cantidad++;
				return teclado;
			} else {
				return teclado;
			}
		});
		articulosCarrito = [...teclados];
	} else {
		articulosCarrito = [...articulosCarrito, infTeclado];
	}
	sincronizarItems();
	carritoHTML();
}


function eliminarTeclado(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-teclado')) {
		// e.target.parentElement.parentElement.remove();
		const tecId = e.target.getAttribute('data-id');

		// Eliminar del arreglo del carrito
		articulosCarrito = articulosCarrito.filter(teclado => teclado.id !== tecId);
		sincronizarItems();
		carritoHTML();
	}
}


function carritoHTML() {

	vaciarCarrito();
	articulosCarrito.forEach(teclado => {
		const row = document.createElement('tr');
		row.innerHTML = `
			  <td>  
				   <img src="${teclado.imagen}" width=100>
			  </td>
			  <td>${teclado.titulo}</td>
			  <td>${teclado.precio}</td>
			  <td>${teclado.cantidad} </td>
			  <td>
				   <a href="#" class="borrar-teclado" data-id="${teclado.id}">X</a>
			  </td>
		 `;
		contenedorCarrito.appendChild(row);
	});

}

function vaciarCarrito() {
	// forma rapida (recomendada)
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

function cambiarPagina(url) {
	window.location.href = url;
}