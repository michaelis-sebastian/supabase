// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import Router
import { setRouter } from "./router/router.js";


import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient("https://slkkhitupragtasufodb.supabase.co",  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2toaXR1cHJhZ3Rhc3Vmb2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMTg4ODUsImV4cCI6MjAxNTU5NDg4NX0.OtX8GDMPi3DI6UMpx4pmW1KGdjISm9bCizg102GNIIo")

// Set Router
setRouter();

// Success Notification
function successNotification(message, seconds = 0) {
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("d-block");
    document.querySelector(".alert-success").innerHTML = message;
  
    if (seconds != 0) {
      setTimeout(function () {
        document.querySelector(".alert-success").classList.remove("d-block");
        document.querySelector(".alert-success").classList.add("d-none");
      }, seconds * 1000);
    }
  }
  
  // Error Notification
  function errorNotification(message, seconds = 0) {
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector(".alert-danger").classList.add("d-block");
    document.querySelector(".alert-danger").innerHTML = message;
  
    if (seconds != 0) {
      setTimeout(function () {
        document.querySelector(".alert-danger").classList.remove("d-block");
        document.querySelector(".alert-danger").classList.add("d-none");
      }, seconds * 1000);
    }
  }

  // Logout Function
  async function doLogout() {
    // Supabase Logout
    let { error } = await supabase.auth.signOut();
  
    if (error == null) {
      // successNotification("Logout Successfully!");
  
      // Clear local Storage
      localStorage.clear();
  
      // Redirect to login page
      window.location.pathname = "/index.html";
    } else {
      // errorNotification("Logout Failed!", 15);
    }
  }
  

  export { supabase, successNotification, errorNotification, doLogout };
