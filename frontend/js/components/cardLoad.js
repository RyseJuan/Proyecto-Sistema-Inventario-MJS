document.addEventListener("DOMContentLoaded", function () {

    const cardElement = document.querySelector(".card-component");

    if (cardElement) {

        fetch("/frontend/views/components/card.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error cargando la card");
            }
            return response.text();
        })
        .then(data => {
            cardElement.innerHTML = data;
        })
        .catch(error => {
            console.error("Error al cargar card:", error);
        });

    }

});