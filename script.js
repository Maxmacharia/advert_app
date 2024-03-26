const log = document.getElementById('login_form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Prepare data object (adjust based on your API requirements)
  let input = {
    email: email,
    password: password
  };

  //(async()=>{
    const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set appropriate content type
        },
        body: JSON.stringify(input) // Convert data to JSON string
      });    
      console.log(response)

//})()
if (response.ok) {
  window.location.replace("http://127.0.0.1:5500/map.html");
  console.log('Account created successfully!');
  // You can also display a success message to the user here
} else {
  console.error('Error creating account:', response.statusText);
  // Handle errors appropriately, e.g., display an error message to the user
}
});