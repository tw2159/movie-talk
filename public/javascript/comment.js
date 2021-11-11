async function comment(event) {
  event.preventDefault();
  
  const comment_text = document.getElementById('comment').value.trim();
  const post_id = window.location.toString().split('/').pop();

  if(comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ post_id, comment_text }),
      headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
      document.location.reload();
    }
    else {
      alert(response.statusText);
    }
  }
}

document.getElementById('comment-form').addEventListener('submit', comment);
