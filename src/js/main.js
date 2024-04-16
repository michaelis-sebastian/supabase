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

// document.addEventListener('DOMContentLoaded', function () {
//     var currentSlide = 0; // Track the current active slide.
//     var passedImages = []; // Store the IDs of passed images.
//     var likedImages = []; // Store the IDs of liked images;
//     var likedImageDescriptions = {}; // Store the descriptions of liked images.
//     var carousel = document.getElementById('tinderCarousel');

//     // Load the liked items from local storage
//     var cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Function to add a liked item to the table and save it to local storage
//     function addToTable(imageId, description) {
//         var table = document.getElementById('likedItemsTable'); // Use the table's ID
//         var row = table.querySelector('tbody').insertRow(-1); // Target the tbody within the table
//         var cell1 = row.insertCell(0);
//         var cell2 = row.insertCell(1);
//         cell1.innerHTML = `<img src="assets/imgs/${imageId}.jpg" alt="${imageId}">`;
//         cell2.innerHTML = description;
    
//         // Save the liked item to local storage
//         var likedItem = {
//             imgSrc: `assets/imgs/${imageId}.jpg`,
//             description: description,
//         };
//         var cart = JSON.parse(localStorage.getItem('cart')) || [];
//         cart.push(likedItem);
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }

//     document.querySelector('#btn-pass').addEventListener('click', function () {
//         var imageId = "image" + (currentSlide + 1); // Construct the image ID
//         if (!likedImages.includes(imageId) && !passedImages.includes(imageId)) {
//             passedImages.push(imageId);
//             hideImage(imageId);
//             // Apply the swipe right animation class to the active slide (override the left swipe)
//             var activeSlide = carousel.querySelector('.carousel-item.active');
//             activeSlide.classList.add('carousel-item-swipe-right');
//             // Show the next slide
//             $(carousel).carousel('next');
//             // Check if there are no more images
//             if (currentSlide === (carousel.querySelectorAll('.carousel-item').length - 1)) {
//                 showEndMessage();
//             }
//         }
//     });

//     document.querySelector('#btn-like').addEventListener('click', function () {
//         var imageId = "image" + (currentSlide + 1); // Construct the image ID
//         if (!likedImages.includes(imageId) && !passedImages.includes(imageId)) {
//             likedImages.push(imageId);
//             var description = document.querySelector('.image-description.' + imageId + '-description').textContent;
//             likedImageDescriptions[imageId] = description;
//             hideImage(imageId);
//             // Apply the swipe left animation class to the active slide (override the right swipe)
//             var activeSlide = carousel.querySelector('.carousel-item.active');
//             activeSlide.classList.add('carousel-item-swipe-left');
//             // Show the next slide
//             $(carousel).carousel('next');
//             // Check if there are no more images
//             if (currentSlide === (carousel.querySelectorAll('.carousel-item').length - 1)) {
//                 showEndMessage();
//             }
//             // Add the liked item to the table and save it to local storage
//             addToTable(imageId, description);
//         }
//     });

//     // Function to hide a specific image
//     function hideImage(imageId) {
//         var image = document.getElementById(imageId);
//         image.classList.add('hidden'); // Add the hidden class for transition
//     }

//     // Function to show a message or static image when there are no more images
//     function showEndMessage() {
//         var staticImageId = 'staticImage';
//         if (document.getElementById(staticImageId)) {
//             // Show the static image
//             var activeItem = carousel.querySelector('.carousel-item.active');
//             activeItem.classList.remove('active');
//             activeItem.classList.add('hidden');
//             document.getElementById(staticImageId).classList.add('active');
//         }
//     }

//     // Track the current active slide
//     carousel.addEventListener('slid.bs.carousel', function () {
//         currentSlide = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(carousel.querySelector('.carousel-item.active'));
//     });
// });
