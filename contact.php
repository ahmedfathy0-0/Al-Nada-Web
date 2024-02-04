<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract and sanitize the form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Here you can implement your data processing logic, like sending an email
    // For demonstration, we'll just respond with a simple message

    // Always ensure to validate and sanitize input data before processing.

    echo "Thank you, $name. Your message has been sent.";
} else {
    // If not a POST request, respond with an error
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
