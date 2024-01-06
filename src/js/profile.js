const user = supabase.auth.user;
    
        if (user) {
            // Display user information
            document.getElementById("email").innerText = "Email: " + user.email;
            document.getElementById("firstname").innerText = "First Name: " + user.user_metadata.firstname;
            document.getElementById("lastname").innerText = "Last Name: " + user.user_metadata.lastname;
        } else {
            alert("User data not found. Please log in.");
            window.location.href = "login.html";
        }