import { supabase } from "../main";

// // Add the event listener at the beginning
// supabase.auth.onAuthStateChange((event, session) => {
//     console.log('Authentication event:', event, 'Session:', session);
// });

 // Check the user status after the login attempt
//  console.log('User after login attempt:', supabase.auth.user);

// // Check if the user is authenticated
// try {
// const user = supabase.auth.user;
// console.log('User:', user);

// if (!user) {
//     console.error("User is not authenticated");
// } else {
//     // Rest of the function...
// }
// } catch (error) {
// console.error('General Error:', error.message);
// }



// Function to fetch all shoes from Supabase
async function fetchAllShoes() {
    try {
        const { data: allShoes, error } = await supabase
            .from('shoe')
            .select('shoe_id, name, price, image, description');

        if (error) {
            console.error(error.message);
            return [];
        }

        return allShoes;
    } catch (error) {
        console.error('General Error:', error.message);
        return [];
    }
}

// Function to dynamically populate the carousel with all shoes
async function populateCarousel() {
    const carouselInner = document.getElementById('carouselInner');

    // Fetch all shoes from Supabase
    const allShoes = await fetchAllShoes();

    // Loop through all shoes and populate the carousel
    for (const [index, shoe] of allShoes.entries()) {
        // Set image source and price from the 'shoe' table
        const imageUrl = shoe.image;  // Assuming you have the full image URL in the 'image' column
        const price = shoe.price;

        // Create a carousel item for each shoe
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active'); // Set the first item as active
        }

        carouselItem.innerHTML = `
            <img src="${imageUrl}" alt="${shoe.name}">
        `;

        // Append the carousel item to the carousel inner container
        carouselInner.appendChild(carouselItem);
    }
}

// Call the function to populate the carousel when the page is loaded
populateCarousel();

// let currentSlide = 0;
// let passedImages = [];
// let likedImages = [];
// let carousel = document.getElementById('tinderCarousel');

// // Function to add a liked or passed item to the table and save it to Supabase
// async function addToTable(table, shoeId, isLiked) {
//     try {
//         // Create a promise to wait for the authentication state to be resolved
//         const authStatePromise = new Promise((resolve) => {
//             const authListener = supabase.auth.onAuthStateChange((event, session) => {
//                 console.log('Authentication event:', event, 'Session:', session);
//                 // Ensure the listener is called only once
//                 if (authListener) {
//                     authListener.data.unsubscribe();
//                 }
//                 resolve();
//             }, { initial: false }); // Set initial to false to avoid an initial call
//         });

//         // Wait for the authentication state to be resolved
//         await authStatePromise;

//         // Check if the user is authenticated
//         const user = supabase.auth.user;
//         console.log('User:', user);

//         if (!user) {
//             console.error("User is not authenticated");
//             return;
//         }

//         // Rest of the function...
//     } catch (error) {
//         console.error('General Error:', error.message);
//     }
// }


// // // Function to hide a specific image
// // function hideImage(shoeId) {
// //     const image = document.getElementById(shoeId);

// //     // Add logging to check if the element is found
// //     if (!image) {
// //         console.error(`Element with ID ${shoeId} not found`);
// //         return;
// //     }

// //     image.classList.add('hidden'); // Add the hidden class for transition
// // }

// // Function to handle the pass button click
// document.querySelector('#btn-pass').addEventListener('click', async function () {
//     const shoeId = "image" + (currentSlide + 1);

//     if (!likedImages.includes(shoeId) && !passedImages.includes(shoeId)) {
//         passedImages.push(shoeId);
//         // hideImage(shoeId);

//         // Remove the passed image from the carousel
//         $(carousel).carousel('next');

//         // Check if there are no more images
//         if (currentSlide === (carousel.querySelectorAll('.carousel-item').length - 1)) {
//             showEndMessage();
//         }

//         // Add the passed item to the 'shoes_passed' table on Supabase
//         await addToTable('shoes_passed', shoeId, false);
//     }
// });

// // Function to handle the like button click
// document.querySelector('#btn-like').addEventListener('click', async function () {
//     const shoeId = "image" + (currentSlide + 1);

//     if (!likedImages.includes(shoeId) && !passedImages.includes(shoeId)) {
//         likedImages.push(shoeId);
//         // hideImage(shoeId);

//         // Remove the liked image from the carousel
//         $(carousel).carousel('next');

//         // Check if there are no more images
//         if (currentSlide === (carousel.querySelectorAll('.carousel-item').length - 1)) {
//             showEndMessage();
//         }

//         // Add the liked item to the 'shoes_liked' table on Supabase
//         await addToTable('shoes_liked', shoeId, true);
//     }
// });

// // Function to show a message or static image when there are no more images
// function showEndMessage() {
//     const staticImageId = 'staticImage';
//     if (document.getElementById(staticImageId)) {
//         // Show the static image
//         const activeItem = carousel.querySelector('.carousel-item.active');
//         activeItem.classList.remove('active');
//         activeItem.classList.add('hidden');
//         document.getElementById(staticImageId).classList.add('active');
//     }
// }

// // Track the current active slide
// carousel.addEventListener('slid.bs.carousel', function () {
//     currentSlide = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(carousel.querySelector('.carousel-item.active'));
// });
