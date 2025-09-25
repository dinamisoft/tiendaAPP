// cerrar sesión CLIENTE.HTML y ADMIN.HTML

document.getElementById('confirm').onclick = function() {
    window.location.href = 'login.html';
};
document.getElementById('cancel').onclick = function() {
    window.location.hash = '#welcome-section';
};
document.querySelector('.confirm-btn').addEventListener('click', function() {
    // Aquí puedes agregar la lógica para cerrar la sesión, como limpiar cookies o almacenamiento local
    alert('Sesión cerrada. Redirigiendo a la página de inicio de sesión.');
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
}); 

