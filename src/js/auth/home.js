import { supabase } from "../main";

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
            <img src="${imageUrl}" alt="${shoe.name}" data-shoe-i="${shoe.shoe_id}">
        `;

        // Append the carousel item to the carousel inner container
        carouselInner.appendChild(carouselItem);
    }
}
populateCarousel();



async function saveShoeToPassed(shoeId) {
    try {
        const existingRow = await supabase.
        from('shoes_passed').
        select('*').
        eq('shoe_id', shoeId);
        
        if (existingRow) {
            // await supabase.from('shoes_liked').delete().eq('shoe_id', shoeId);
            // console.log(`Existing row with shoe_id ${shoeId} deleted from 'shoes_liked' table.`);
        }
            const { data, error } = await supabase.
            from('shoes_passed').
            insert([{ 'shoe_id': shoeId }]);


        console.log("Shoe saved to 'shoes_passed' ID:", shoeId);


        
        const currentCarouselItem = document.querySelector('.carousel-item.active');
        currentCarouselItem.classList.remove('active');
        const nextCarouselItem = currentCarouselItem.nextElementSibling;
        if (nextCarouselItem) {
            nextCarouselItem.classList.add('active');
        } else {
            // const firstCarouselItem = document.querySelector('.carousel-item');
            // firstCarouselItem.classList.add('active');
            console.log('End of carousel reached.');
        }



    } catch (error) {
        console.error("Error saving shoe to 'shoes_passed' table:", error.message);
    }
}

async function saveShoeToLiked(shoeId) {
    try {
        const existingRow = await supabase.
        from('shoes_liked').
        select('*').
        eq('shoe_id', shoeId);
        // 'user_id',userId,
        // console.log(existingRow.data);
        if (existingRow) {
            // console.log("Already Exist");
            
            // await supabase.from('shoes_liked').delete().eq('shoe_id', shoeId);
            // console.log(`Existing row with shoe_id ${shoeId} deleted from 'shoes_liked' table.`);
        }
        // else{
            const { data, error } = await supabase.
            from('shoes_liked').
            insert([{ 'shoe_id': shoeId }]);
        // }
        console.log("Shoe saved to 'shoes_liked' ID:", shoeId);


        const currentCarouselItem = document.querySelector('.carousel-item.active');
        currentCarouselItem.classList.remove('active');
        const nextCarouselItem = currentCarouselItem.nextElementSibling;
        if (nextCarouselItem) {
            nextCarouselItem.classList.add('active');
        } else {
            // const firstCarouselItem = document.querySelector('.carousel-item');
            // firstCarouselItem.classList.add('active');
            console.log('End of carousel reached.');
        }


    } catch (error) {
        console.error("Shoe deleted to 'shoes_liked' table:", error.message);
    }
}

async function handleLikeButtonClick() {
    const shoeId = document.querySelector('.carousel-item.active img').getAttribute('data-shoe-i');
    // if (shoeId) {console.log(shoeId);} else {console.log('Kulurom kah');}

    if (!shoeId) {
        console.error("No shoe_id found for the active item.");
        return;
    }
    await saveShoeToLiked(shoeId);

    // $('#tinderCarousel').slick('slickNext');
}

async function handlePassButtonClick() {
    const shoeId = document.querySelector('.carousel-item.active img').getAttribute('data-shoe-i');
    // if (shoeId) {console.log(shoeId);} else {console.log('Kulurom kah');}
 
    if (!shoeId) {
        console.error("No shoe_id found for the active item.");
        return;
    }

    await saveShoeToPassed(shoeId);
    // $('#tinderCarousel').slick('slickNext');
}

document.getElementById('btn-like').addEventListener('click', handleLikeButtonClick);
document.getElementById('btn-pass').addEventListener('click', handlePassButtonClick);
