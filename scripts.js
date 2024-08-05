document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var mailtoLink = "mailto:vintagexandy@gmail.com" +
                     "?subject=" + encodeURIComponent("Contact Form Submission") +
                     "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);

    window.location.href = mailtoLink;
    alert('Thank you for your message. We will get back to you shortly.');
});
