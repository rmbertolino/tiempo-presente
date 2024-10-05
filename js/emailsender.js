const form = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío normal del formulario

    const formData = new FormData(form); // Obtiene los datos del formulario
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true; // Desactiva el botón para evitar múltiples envíos
    submitButton.innerHTML = "Enviando..."; // Cambia el texto del botón

    // Convierte FormData a JSON
    const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    _subject: "Nuevo mensaje desde tiempopresente.com.ar!", // Asunto personalizado
    _template: "table" // Usar template de tabla en el correo
    };

    fetch('https://formsubmit.co/ajax/rmbertolino@outlook.com', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(data) // Convierte los datos a formato JSON
    })
    .then(response => {
    if (response.ok) {
        return response.json(); // Convierte la respuesta a JSON si el envío es exitoso
    } else {
        throw new Error('Error sending the message');
    }
    })
    .then(data => {
    // Si el envío es exitoso, muestra un mensaje de éxito
    responseMessage.innerHTML = `<div class="d-none" id="submitSuccessMessage">
                        <div class="text-center text-white mb-3">
                            <div class="fw-bolder">Mensaje enviado correctamente.</div>
                        </div>
                    </div>`;
    form.reset(); // Limpia el formulario
    })
    .catch(error => {
    // Si ocurre un error, muestra un mensaje de error
    responseMessage.innerHTML = `<div class="d-none" id="submitErrorMessage">
                        <div class="text-center text-danger mb-3">Error enviando mensaje!</div>
                    </div>`;
    })
    .finally(() => {
    // Restaura el botón al estado original
    submitButton.disabled = false;
    submitButton.innerHTML = "Send";
    });
});