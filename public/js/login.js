async function loginFormHandler(event) {
    event.preventDefault();

    // Get values from email and password input fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if email and password have values
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // Check for successful response and redirect to the dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

// Submit the '.login-form' element
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);