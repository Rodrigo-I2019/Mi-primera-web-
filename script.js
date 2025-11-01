// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMessage");
  const remember = document.getElementById("remember");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Autorrellenar si el usuario marcó "remember me"
  const savedUser = localStorage.getItem("melamine_user");
  if (savedUser) {
    try {
      const data = JSON.parse(savedUser);
      usernameInput.value = data.username || "";
      remember.checked = true;
    } catch (e) {}
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validaciones simples
    if (!username || !password) {
      msg.style.color = "#ffb3b3";
      msg.textContent = "Completa usuario y contraseña.";
      return;
    }

    // Simulación de "base de datos" (esta parte reemplazar por llamada al backend)
    const fakeDB = [
      { user: "admin", pass: "12345", role: "admin" },
      { user: "vendedor", pass: "venta", role: "seller" }
    ];

    const found = fakeDB.find(u => u.user === username && u.pass === password);

    if (found) {
      msg.style.color = "#b8f5c6";
      msg.textContent = "Acceso correcto. Redirigiendo...";
      // Guardar remember
      if (remember.checked) {
        localStorage.setItem("melamine_user", JSON.stringify({ username }));
      } else {
        localStorage.removeItem("melamine_user");
      }

      // Animación o transición
      setTimeout(() => {
        // Aquí rediriges a la página que simule el panel admin
        window.location.href = "../index.html"; // cambia por tu dashboard
      }, 900);
    } else {
      msg.style.color = "#ff9b9b";
      msg.textContent = "Usuario o contraseña incorrectos.";
      // efecto shake opcional:
      const card = document.querySelector(".login-card");
      card.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" }
      ], { duration: 300 });
    }
  });

  // Link de "Forget" para demostración
  const forgot = document.getElementById("forgotLink");
  forgot.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Función de recuperación no implementada aún. Próximamente: recuperación por correo o SMS.");
  });
});
