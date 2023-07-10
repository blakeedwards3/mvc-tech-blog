async function deleteFormHandler(event) {
    event.preventDefault();

    // Extract post ID from current URL
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // Send DELETE request to '/api/post/{id}
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
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

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);