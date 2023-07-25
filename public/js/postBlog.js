const newFormHandler = async (event) => {
    event.preventDefault();
  
    // create html classes
    const title = document.querySelector('#blogpost-name').value.trim();
    const description = document.querySelector('#blogpost-desc').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blogpost-list')
    .addEventListener('click', delButtonHandler);
  