document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    loginSinBD();
  });
});

function loginSinBD() {
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;

  //login sin base de datos
  if(usuario === 'admin' && contraseña === 'admin123') {
    alert('Inicio de sesión exitoso (Admin)');
    window.location.href = 'admin.html';
  } else if(usuario === 'user' && contraseña === 'user123') {
    alert('Inicio de sesión exitoso (User)');
    window.location.href = 'cliente.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}