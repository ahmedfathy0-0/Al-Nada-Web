<?php
// Check if the request is an AJAX request
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    // Assuming you're sending data with method="POST"
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Process the form data here (e.g., email it, save it to a database, etc.)
    // For example, to email the form data (make sure to configure mail settings):
    $to = 'nada.scientific@yahoo.com'; // Change this to your own email address
    $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";

    if(mail($to, $subject, $body, "From: $email")) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    // Handle direct access to this script, not via ajax
    echo 'This script should only be accessed via AJAX.';
}
?>
