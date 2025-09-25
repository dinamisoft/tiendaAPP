// Validación para LOGIN.HTML
document.addEventListener('DOMContentLoaded', function () {
  // LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const usuario = document.getElementById('usuario').value.trim();
      const contraseña = document.getElementById('contraseña').value.trim();
      if (!usuario || !contraseña) {
        alert('Por favor, completa todos los campos.');
        return;
      }
      // Aquí iría la lógica de autenticación real
      alert('Inicio de sesión exitoso');
       window.location.href = 'cliente.html';
    });
  }

  // REGISTRO
  const registroForm = document.querySelector('form[action="registro"]') || 
                       (window.location.pathname.toLowerCase().includes('registro') ? document.querySelector('form') : null);
  if (registroForm) {
    registroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
     // const tipoDoc = document.getElementById('tipoDoc').value;
      const id = document.getElementById('ID').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const contraseña = document.getElementById('contraseña').value;
      const confirmar = document.getElementById('confirmarContraseña').value;
      const telefono = document.getElementById('telefono').value.trim();
      const sexo = document.getElementById('sexo').value;
//agregar validacion de tipo de documento | !tipoDoc |//
      if (!nombre || !id || !correo || !contraseña || !confirmar || !telefono || !sexo) {
        alert('Por favor, completa todos los campos.');
        return;
      }
      if (contraseña !== confirmar) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      // Aquí iría la lógica de registro real
      alert('Registro exitoso');
      // window.location.href = 'login.html';
    });
  }

  // OLVIDASTE CONTRASEÑA
  const olvidasteForm = document.querySelector('form[action="olvidaste"]') || 
                        (window.location.pathname.toLowerCase().includes('olvidaste') ? document.querySelector('form') : null);
  if (olvidasteForm) {
    olvidasteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      if (!email) {
        alert('Por favor, ingresa tu correo electrónico.');
        return;
      }
      // Aquí iría la lógica de recuperación real
      alert('Se ha enviado un correo para recuperar tu contraseña.');
      // window.location.href = 'login.html';
    });
  }
})