document.addEventListener("DOMContentLoaded", function () {

    const headerElement = document.querySelector(".header-container");

    if (headerElement) {

        fetch("/frontend/views/components/header.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error cargando el header");
                }
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;

                const header = headerElement.querySelector('.header');
                if (!header) return;

                const userIcon     = header.querySelector('.user-icon');
                const userDropdown = header.querySelector('.user-dropdown');
                const overlay      = document.querySelector('.overlay');

                if (!userIcon || !userDropdown || !overlay) {
                    console.warn("No se encontraron algunos elementos del menú de usuario");
                    if (!userIcon) console.warn("→ No se encontró .user-icon");
                    if (!userDropdown) console.warn("→ No se encontró .user-dropdown");
                    if (!overlay) console.warn("→ No se encontró .overlay");
                    return;
                }

                // ← Agregado para depurar: confirma que el ícono existe
                console.log("Ícono del usuario encontrado correctamente:", userIcon);

                function toggleUserMenu() {
                    userDropdown.classList.toggle('show');
                    overlay.classList.toggle('show');
                }

                userIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // ← Agregado para depurar: confirma que el clic se detecta
                    console.log("Clic detectado en el ícono del usuario");
                    toggleUserMenu();
                });

                overlay.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleUserMenu();
                });

                document.addEventListener('click', function (event) {
                    if (!header.contains(event.target)) {
                        userDropdown.classList.remove('show');
                        overlay.classList.remove('show');
                    }
                });

                userDropdown.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            })
            .catch(error => {
                console.error("Error al cargar header:", error);
            });
    }
});