async function upvote(event) {
  event.preventDefault();

  const post_id = window.location.toString().split('/').pop();
  const response = await fetch('/api/posts/upvote', {
    method: 'PUT',
    body: JSON.stringify({ post_id: post_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  if(response.ok) {
    document.location.reload();
  }
  else {
    alert(response.statusText);
  }
}
  
document.getElementById('like-button').addEventListener('click', upvote);
