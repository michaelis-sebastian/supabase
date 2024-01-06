import { supabase } from "..//main";

document.getElementById('login-button').addEventListener('click', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const { user, session, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error(error.message);
            // Display an error message to the user (you can customize this part)
            alert('Invalid email or password');
        } else {
            console.log('Login Successful:', user); // Fix: change 'data' to 'user'

            // Add a short delay to allow the authentication state to update
            setTimeout(() => {
                // Redirect to another page or perform other actions after successful login
                window.location.href = 'home.html';

                // Check the user status after the login attempt
                console.log('User after login attempt:', supabase.auth.user());
            }, 500); // You can adjust the delay time as needed
        }
    } catch (error) {
        console.error('General Error:', error.message);
    }
});
