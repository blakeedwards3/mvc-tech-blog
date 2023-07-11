async function newFormHandler(event) {
    event.preventDefault();

    // Get values from input fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('input[name="post-body"]').value;

    // POST request to '/api/posts'
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check for successful response and redirect to dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// Submit the '.new-post-form' element
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);