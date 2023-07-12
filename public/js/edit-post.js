async function editFormHandler(event) {
    event.preventDefault();

    // Get values from input fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('input[name="body"]').value;

    // Extract post ID from current URL
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // PUT request to '/api/post/{id}'
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check for successful response and redirect to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

// Submit the '.edit-post-form' element
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);