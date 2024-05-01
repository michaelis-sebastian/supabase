import { supabase } from "../main";

async function fetchAllShoes() {
    try {
        const { data: allShoes, error } = await supabase
            // .from('shoes_liked')
            // .select('shoe_id, name, price, image, description');
            .from('shoes_liked')
            .select(`
                shoes_liked.liked_id,
                shoes_liked.user_id,
                shoes_liked.shoe_id,
                shoes_liked.is_favorite,
                shoe.name as shoe_name,
                shoe.price as shoe_price,
                shoe.image as shoe_image,
                shoe.description as shoe_description
            `)
            .join('shoe', { 
                on: 'shoes_liked.shoe_id=shoe.shoe_id', 
                type: 'left' // You can use different join types based on your requirements
            });

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
    console.log(allShoes);

    // for (const [index, shoe] of allShoes.entries()) {
    //     // Set image source and price from the 'shoe' table
    //     const imageUrl = shoe.image;  // Assuming you have the full image URL in the 'image' column
    //     const price = shoe.price;

    //     // Create a carousel item for each shoe
    //     const carouselItem = document.createElement('div');
    //     carouselItem.classList.add('carousel-item');
    //     if (index === 0) {
    //         carouselItem.classList.add('active'); // Set the first item as active
    //     }

    //     carouselItem.innerHTML = `
    //         <img src="${imageUrl}" alt="${shoe.name}" data-shoe-i="${shoe.shoe_id}">
    //     `;

    //     // Append the carousel item to the carousel inner container
    //     carouselInner.appendChild(carouselItem);
    // }
}
populateCarousel();


// async function fetchAllShoesLikes() {
//     try {
//         const { data: allShoesLikes, error } = await supabase
//             // .from('shoes_liked')
//             // .select('liked_id, user_id, shoe_id, is_favorite');
//             .from('shoes_liked')
//             .select(`
//                 shoes_liked.liked_id,
//                 shoes_liked.user_id,
//                 shoes_liked.shoe_id,
//                 shoes_liked.is_favorite,
//                 shoe.name as shoe_name,
//                 shoe.price as shoe_price,
//                 shoe.image as shoe_image,
//                 shoe.description as shoe_description
//             `)
//             .join('shoe', { 
//                 on: 'shoes_liked.shoe_id=shoe.shoe_id', 
//                 type: 'left' // You can use different join types based on your requirements
//             });

//         if (error) {
//             console.error(error.message);
//             return [];
//         }

//         return allShoes;
//     } catch (error) {
//         console.error('General Error:', error.message);
//         return [];
//     }
// }
async function fetchAllShoesLikes() {
    try {
        // Fetch all liked shoes from the 'shoes_liked' table
        const { data: likedShoes, error: likedError } = await supabase
            .from('shoes_liked')
            .select('liked_id, user_id, shoe_id, is_favorite');

        if (likedError) {
            console.error(likedError.message);
            return [];
        }

        // Fetch details of each liked shoe from the 'shoe' table
        const allShoesLikes = [];
        for (const likedShoe of likedShoes) {
            const { data: shoeData, error: shoeError } = await supabase
                .from('shoe')
                .select('shoe_id, name, price, image, description')
                .eq('shoe_id', likedShoe.shoe_id)
                .single(); // Assuming each shoe_id is unique

            if (shoeError) {
                console.error(shoeError.message);
                continue; // Skip to the next shoe if there's an error
            }

            // Combine liked shoe data with shoe details
            const combinedData = { ...likedShoe, ...shoeData };
            allShoesLikes.push(combinedData);
        }

        return allShoesLikes;
    } catch (error) {
        console.error('General Error:', error.message);
        return [];
    }
}


async function populateCards() {
    const CardoMerkado = document.getElementById('CardDInner');

    // Fetch all shoes from Supabase
    const allShoesLikes = await fetchAllShoesLikes();

    console.log(allShoesLikes);
    // Loop through all shoes and populate the carousel
    for (const [index, shoelike] of allShoesLikes.entries()) {
        const shoe_id = shoelike.shoe_id
        const like_id = shoelike.like_id;
        const user_id = shoelike.user_id;
        const is_favorite = shoelike.is_favorite;
        
        const shoe_name = shoelike.shoe_name;
        const imageUrl = shoelike.shoe_image;
        const price = shoelike.shoe_price;
        const shoe_desc = shoelike.shoe_description;


        // Create a carousel item for each shoe
        const cardsItem = document.createElement('div');
        cardsItem.classList.add('row');
        // if (index === 0) {
        //     carouselItem.classList.add('active'); // Set the first item as active
        // }

        cardsItem.innerHTML = `
            <div class="col-md-6 mb-4">
                <div class="card" style="width: 18rem; height: 25rem;">
                <img src="${imageUrl}" alt="Snow White and Seven Fucking Dwarfs">
                <div class="card-body">
                    <h5 class="card-title">${shoe_name}</h5>
                    <h5 class="card-price">Php ${shoe_price}</h5>
                    <p class="card-text">${shoe_desc}</p>
                    <a href="#" class="btn btn-primary">Mark as Favorite</a> 
                </div>
                </div>
            </div>

            <img src="${imageUrl}" alt="${shoe_name}" data-shoe-i="${shoe_id}">
        `;

        // Append the carousel item to the carousel inner container
        CardoMerkado.appendChild(cardslItem);
    }
}
populateCards();