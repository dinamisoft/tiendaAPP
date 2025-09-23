document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegación de la barra lateral (hacer los enlaces activos y mostrar secciones)
    const enlacesBarraLateral = document.querySelectorAll('.sidebar .menu a, .topbar .cart-link');
    const seccionesPagina = document.querySelectorAll('.page-section');
    
    // Almacén de datos del carrito
    let carrito = [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalMonto = document.getElementById('total-monto');

    // Función para ocultar todas las secciones y quitar la clase 'active' de los enlaces
    const reiniciarSeccionesYEnlaces = () => {
        seccionesPagina.forEach(seccion => {
            seccion.style.display = 'none'; // Ocultar todas las secciones
        });
        enlacesBarraLateral.forEach(enlace => {
            enlace.classList.remove('active'); // Quitar la clase 'active' de todos los enlaces
        });
    };

    // Manejar la carga inicial y los cambios de hash para la navegación impulsada por CSS
    const mostrarSeccionDesdeHash = () => {
        const hash = window.location.hash;
        if (hash) {
            reiniciarSeccionesYEnlaces();
            const seccionObjetivo = document.querySelector(hash);
            if (seccionObjetivo) {
                seccionObjetivo.style.display = 'block';
                enlacesBarraLateral.forEach(enlace => {
                    if (enlace.getAttribute('href') === hash) {
                        enlace.classList.add('active');
                    }
                });
            } else {
                document.getElementById('compras-section').style.display = 'block';
                const enlaceInicio = document.querySelector('.sidebar .menu a[href="#compras-section"]');
                if (enlaceInicio) {
                    enlaceInicio.classList.add('active');
                }
            }
        } else {
            document.getElementById('compras-section').style.display = 'block';
            const enlaceInicio = document.querySelector('.sidebar .menu a[href="#compras-section"]');
            if (enlaceInicio) {
                enlaceInicio.classList.add('active');
            }
        }
    };

    mostrarSeccionDesdeHash();
    window.addEventListener('hashchange', mostrarSeccionDesdeHash);

    // 2. Funcionalidad de calificación de estrellas INTERACTIVA
    const contenedorEstrellasCalificacion = document.getElementById('estrellas-calificacion');
    let calificacionActual = 0;

    if (contenedorEstrellasCalificacion) {
        const estrellas = contenedorEstrellasCalificacion.querySelectorAll('.star');

        const actualizarEstrellasVisualmente = (calificacion) => {
            estrellas.forEach((estrella, index) => {
                if (index < calificacion) {
                    estrella.classList.add('selected');
                } else {
                    estrella.classList.remove('selected');
                }
            });
        };

        estrellas.forEach(estrella => {
            estrella.addEventListener('mouseover', () => {
                const valorHover = parseInt(estrella.dataset.value);
                actualizarEstrellasVisualmente(valorHover);
            });

            contenedorEstrellasCalificacion.addEventListener('mouseout', () => {
                actualizarEstrellasVisualmente(calificacionActual);
            });

            estrella.addEventListener('click', () => {
                calificacionActual = parseInt(estrella.dataset.value);
                actualizarEstrellasVisualmente(calificacionActual);
                alert(`Has calificado este producto con ${calificacionActual} estrellas.`);
            });
        });
    }

    // 3. Manejo de alertas de contacto (si aplica)
    const formularioContacto = document.getElementById('contact-form');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado. ¡Gracias por contactarnos!');
            formularioContacto.reset();
        });
    }

    // 4. Funcionalidad para los botones de configuración
    const botonAnadirMetodoPago = document.querySelector('#configuracion-section .card:last-of-type .btn-config');
    if (botonAnadirMetodoPago) {
        botonAnadirMetodoPago.addEventListener('click', () => {
            alert('Funcionalidad para añadir nuevo método de pago aún no implementada.');
        });
    }

    const botonCambiarContrasena = document.querySelector('#configuracion-section .card:first-of-type .btn-config');
    if (botonCambiarContrasena) {
        botonCambiarContrasena.addEventListener('click', () => {
            alert('Funcionalidad para cambiar contraseña aún no implementada.');
        });
    }

    // 5. Búsqueda de productos
    const campoBusqueda = document.querySelector('.topbar .search input');
    const tarjetasProductos = document.querySelectorAll('.product-card');
    
    campoBusqueda.addEventListener('keyup', (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        tarjetasProductos.forEach(tarjeta => {
            const nombreProducto = tarjeta.querySelector('h3').textContent.toLowerCase();
            if (nombreProducto.includes(textoBusqueda)) {
                tarjeta.style.display = 'block';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });

    // 6. Funcionalidad del carrito de compras
    const botonCarrito = document.querySelector('.topbar .cart-link');
    const productosEnLaPagina = document.querySelectorAll('.product-card');

    const actualizarContadorCarrito = () => {
        const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        botonCarrito.textContent = `🛒 Mis Compras (${totalItems})`;
    };

    const mostrarCarrito = () => {
        listaCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            carrito.forEach(producto => {
                const li = document.createElement('li');
                const precioFormateado = producto.precio.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                li.innerHTML = `<span>${producto.nombre}</span> - <span>$${precioFormateado}</span> x <span>${producto.cantidad}</span>`;
                listaCarrito.appendChild(li);
                total += producto.precio * producto.cantidad;
            });
        }
        totalMonto.textContent = total.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    productosEnLaPagina.forEach(tarjeta => {
        const botonAgregar = tarjeta.querySelector('button');
        botonAgregar.addEventListener('click', () => {
            const nombre = tarjeta.querySelector('h3').textContent;
            const precioTexto = tarjeta.querySelector('p strong').textContent;
            const precio = parseFloat(precioTexto.replace('$', '').replace('.', '').replace(',', '.'));

            const productoExistente = carrito.find(p => p.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                const productoAgregado = {
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                };
                carrito.push(productoAgregado);
            }
            
            alert(`${nombre} ha sido agregado al carrito.`);
            actualizarContadorCarrito();
            mostrarCarrito();
        });
    });

    const botonPagar = document.getElementById('boton-pagar');
    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            if (carrito.length > 0) {
                alert('¡Gracias por tu compra! La funcionalidad de pago está en desarrollo.');
                carrito = [];
                actualizarContadorCarrito();
                mostrarCarrito();
            } else {
                alert('Tu carrito está vacío. ¡Agrega productos para poder pagar!');
            }
        });
    }

    const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
    if (botonVaciarCarrito) {
        botonVaciarCarrito.addEventListener('click', () => {
            if (carrito.length > 0) {
                const confirmacion = confirm('¿Estás seguro de que quieres vaciar el carrito?');
                if (confirmacion) {
                    carrito = [];
                    actualizarContadorCarrito();
                    mostrarCarrito();
                    alert('El carrito ha sido vaciado.');
                }
            } else {
                alert('El carrito ya está vacío.');
            }
        });
    }
});