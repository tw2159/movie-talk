async function deletePost(event) {
  event.preventDefault();
  
  const post_id = window.location.toString().split('/').pop();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ post_id: post_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  if(response.ok) {
    document.location.replace('/dashboard/');
  }
  else {
    alert(response.statusText);
  }
}

document.getElementById('delete-button').addEventListener('click', deletePost);
