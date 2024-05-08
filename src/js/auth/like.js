import { supabase } from "../main";

let isFirstAuthStateChange = true; // Flag to track the first auth state change

supabase.auth.onAuthStateChange(async (event, session) => {
    // Only execute the following logic on the first auth state change
    if (isFirstAuthStateChange) {
        isFirstAuthStateChange = false; // Update flag to indicate that the first auth state change has occurred

        async function fetchAllShoesLikes() {
            try {
                // Fetch all liked shoes from the 'shoes_liked' table
                const { data: likedShoes, error: likedError } = await supabase
                    .from('shoes_liked')
                    .select('like_id, user_id, shoe_id, is_favorite');
                
                if (likedError) {
                    console.error(likedError.message);
                    return [];
                }

                const { data: shoesData, error: shoesError } = await supabase
                    .from('shoe')
                    .select('shoe_id, name, price, image, description');

                if (shoesError) {
                    console.error(shoesError.message);
                    return [];
                }

                const combinedData = likedShoes.map(likedShoe => {
                    const matchingShoe = shoesData.find(shoe => shoe.shoe_id === likedShoe.shoe_id);
                    if (matchingShoe) {
                        return {
                            like_id: likedShoe.like_id,
                            user_id: likedShoe.user_id,
                            is_favorite: likedShoe.is_favorite,
                            shoe_id: matchingShoe.shoe_id,
                            name: matchingShoe.name,
                            price: matchingShoe.price,
                            image: matchingShoe.image,
                            description: matchingShoe.description
                        };
                    }
                    return null;
                }).filter(Boolean); // Remove null entries

                return combinedData;
            } catch (error) {
                console.error('General Error:', error.message);
                return [];
            }
        }

        async function populateCards() {
            const CardoMerkado = document.getElementById('CardDInner');

            // Fetch all shoes from Supabase
            const allShoesLikes = await fetchAllShoesLikes();

            // Populate shoe cards
            for (const [index, sld] of allShoesLikes.entries()) {
                const shoe_id = sld.shoe_id
                const like_id = sld.like_id;
                const user_id = sld.user_id;
                const is_favorite = sld.is_favorite;
                
                const sh_name = sld.name;
                const sh_price = sld.price;
                const sh_image = sld.image;
                const sh_desc = sld.description;

                // Create a carousel item for each shoe
                const cardsItem = document.createElement('div');
                cardsItem.classList.add('row');

                cardsItem.innerHTML = `
                    <div class="col mb-4 py-4mx-auto" style="">
                        <div class="card mx-auto" style="width: 22rem;">
                            <img class="pt-3 mx-auto" src="${sh_image}" alt="${sh_name}" style="width: 20rem; height: 20rem;">
                            <div class="card-body">
                                <h1 class="card-title fw-bold">${sh_name}</h1>
                                <h4 class="card-price fw-bold">Php. ${sh_price}</h4>
                                <p class="card-text fst-italic">${sh_desc}</p>
                                
                            </div>
                        </div>
                    </div>
                `;

                // <img src="./assets/icon/heart.png" alt="My Happy SVG" style="width: 4rem; height: 4rem;" id="hearty">
                // Append the carousel item to the carousel inner container
                CardoMerkado.appendChild(cardsItem);
            }
        }

        // Call the populateCards function
        populateCards();
    }
});
