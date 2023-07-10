async function commentFormHandler(event) {
    event.preventDefault();

    // Get value from comment input field
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Extract post ID from current URL
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check for successful response and load the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

// Submit the '.comment-form' element
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);