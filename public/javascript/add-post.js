async function addpost(event) {
  event.preventDefault();

  const title = document.getElementById('title-post').value;
  const content = document.getElementById('content-post').value;

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' }
  });

  if(response.ok) {
    document.location.replace('/dashboard');
  }
  else {
    alert(response.statusText);
  }
}

document.getElementById('new-post-form').addEventListener('submit', addpost);
