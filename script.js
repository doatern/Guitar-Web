// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        console.log('Hamburger clicked, active:', hamburger.classList.contains('active'));
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Handle form submission with email sending
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const fromName = document.getElementById('from_name').value;
        const fromEmail = document.getElementById('from_email').value;
        const message = document.getElementById('message').value;
        const statusMessage = document.getElementById('statusMessage');
        const submitButton = contactForm.querySelector('.submit-button');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Clear previous status message
        statusMessage.classList.remove('success', 'error');
        statusMessage.textContent = '';
        
        // Send email via FormSubmit service (no setup required)
        fetch('https://formsubmit.co/ajax/doatern@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: fromName,
                email: fromEmail,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email sent successfully:', data);
            
            // Show success message
            statusMessage.classList.add('success');
            statusMessage.textContent = `Thank you, ${fromName}! Your message has been sent successfully.`;
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            
            // Show error message
            statusMessage.classList.add('error');
            statusMessage.textContent = 'Failed to send message. Please try again or contact us directly.';
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
}

// Smooth scroll for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
