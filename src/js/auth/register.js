import { supabase } from "..//main";


document.getElementById('form_register').addEventListener('click', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;

    try {
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
            data: { firstname, lastname }
        });
        
        if (error) {
            console.error(error.message);
        } else {
            console.log(user, session);
            window.location.href = "index.html";
        }
    } catch (error) {
        console.error(error.message);
    }
});