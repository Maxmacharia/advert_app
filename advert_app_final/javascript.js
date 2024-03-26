let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
 
signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});
 
login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login_form");
  const signupForm = document.getElementById("signup_form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("password_login").value;

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await fetch('https://fastapiapp-production.up.railway.app/docs#/login/login_login_post', {
          method: 'POST',
          body: formData,
      });
      const data = await response.json(); // Extract JSON response
      if (response.ok) {
          // Store token securely
          localStorage.setItem('token', data.access_token);
          
          // Check if token is successfully stored
          if(localStorage.getItem('token')) {
              console.log('Token stored successfully:', localStorage.getItem('token'));
              window.location.replace("https://github.com/Maxmacharia/advert_app/blob/master/advert_app_final/polygon.html");
              console.log('logged in successfully!');
          } else {
              console.error('Error storing token.');
          }
      } else {
          console.error('Error creating account:', response.statusText);
      }
  } catch (error) {
      console.error('Error:', error);
  }
});  

// Function to get stored token
function getToken() {
    return localStorage.getItem('token');
}

// Function to fetch data with JWT token
url = 'https://fastapiapp-production.up.railway.app/docs#/login/login_login_post'
async function fetchData(url) {
    const token = getToken();
    if (!token) {
        console.error('Token not found');
        return null;
    }

    try {
        const response = await fetch('https://fastapiapp-production.up.railway.app/docs#/login/login_login_post', {
            headers: {
                'Authorization': `Bearer ${token}` // Set token in Authorization header
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


  signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;

      if (password !== confirmPassword) {
          console.log("Passwords do not match");
          return; // Prevent further execution if passwords don't match
      }

      const data = {
          username: username,
          email: email,
          password: password,
          confirm_password: confirmPassword
      };

      try {
          const response = await fetch('https://fastapiapp-production.up.railway.app/users/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
          console.log(response);
          if (response.ok) {
              window.location.replace("https://github.com/Maxmacharia/advert_app/blob/master/advert_app_final/polygon.html");
              console.log('Account created successfully!');
          } else {
              console.error('Error creating account:', response.statusText);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
});
