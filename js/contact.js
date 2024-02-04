document.addEventListener("DOMContentLoaded", function() {
    // Wait for the DOM to be fully loaded before attaching the event listener
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this);

        fetch('contact.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Display the response from the server
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending the message.');
        });
    });
});
