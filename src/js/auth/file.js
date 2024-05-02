import { supabase } from "../main";
import QRCode from 'qrcode'
// 
//import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";


supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        // User is signed in
        // console.log("User is signed in. Session:", session);
        const userId = session.user.id;
        // console.log("User ID:", userId);
        // const userInfo = loginUser(userId);
        loginUser(userId);
    } else if (event === 'SIGNED_OUT') {
        // User is signed out
        console.log("User is signed out.");
    }
});

async function loginUser(userId) {
    try {
        const userInfo = await supabase.
        from('user_info').
        select('*').
        eq('user_id', userId);



        // console.log(userInfo.data[0]);
        // return userInfo
        const id_qrcode = document.getElementById('id_qrcode');
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        if (userInfo) {

            QRCode.toString(userInfo.data[0].user_id, {type:'terminal'}, function (err, url) {
                // console.log(url)
                id_qrcode.innerHTML= url;
            })
            firstname.innerText = userInfo.data[0].firstname;
            lastname.innerText = userInfo.data[0].lastname;
        } else {
            console.error('User info not found.');
        }
        // console.log(userInfo);
        // firstname.innerHTML = `${userInfo.data[0].firstname}`;
    } catch (error) {
        console.error("Error viewing error:", error.message);
    }
}
// loginUser();