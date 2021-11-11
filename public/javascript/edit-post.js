async function editPost(event) {
  event.preventDefault();
  
  const title = document.getElementById('title-post').value.trim();
  const content = document.getElementById('content-post').value.trim();
  const post_id = window.location.toString().split('/').pop();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({ post_id, title, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  if(response.ok) {
    document.location.replace('/dashboard/');
  }
  else {
    alert(response.statusText);
  }
}

document.getElementById('edit-post-form').addEventListener('submit', editPost);
