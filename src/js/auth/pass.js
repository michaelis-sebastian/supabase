import { supabase } from "../main";

async function fetchAllShoesPasses() {
    try {
        // Fetch all liked shoes from the 'shoes_liked' table
        const { data: passedShoes, error: likedError } = await supabase
        
        .from('shoes_passed')
        .select('pass_id, shoe_id, is_favorite');
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

        const combinedData = passedShoes.map(passedShoe => {
            const matchingShoe = shoesData.find(shoe => shoe.shoe_id === passedShoe.shoe_id);
            if (matchingShoe) {
                return {
                    pass_id: passedShoe.pass_id,
                    // user_id: passedShoe.user_id,
                    is_favorite: passedShoe.is_favorite,
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
    const allShoesPasses = await fetchAllShoesPasses();

    // console.log(allShoesLikes);
    for (const [index, sld] of allShoesPasses.entries()) {
        const shoe_id = sld.shoe_id
        const pass_id = sld.pass_id;
        // const user_id = sld.user_id;
        const is_favorite = sld.is_favorite;
        
        const sh_name = sld.name;
        const sh_price = sld.price;
        const sh_image = sld.image;
        const sh_desc = sld.description;


        // Create a carousel item for each shoe
        const cardsItem = document.createElement('div');
        cardsItem.classList.add('row');
        // if (index === 0) {
        //     carouselItem.classList.add('active'); // Set the first item as active
        // }

        cardsItem.innerHTML = `
            <div class="col mb-4 py-4mx-auto" style="">
                <div class="card mx-auto" style="width: 22rem;">
                    <img class="pt-3 mx-auto" src="${sh_image}" alt="${sh_name}" style="width: 20rem; height: 20rem;">
                    <div class="card-body">
                        <h1 class="card-title fw-bold">${sh_name}</h1>
                        <h4 class="card-price fw-bold">Php. ${sh_price}</h4>
                        <p class="card-text fst-italic">${sh_desc}</p>
                        <a href="#" class="btn btn-primary">Mark as Favorite</a> 
                    </div>
                </div>
            </div>
        `;
        // <img src="imageUrl" alt="shoe_name" data-shoe-i="shoe_id">

        // Append the carousel item to the carousel inner container
        CardoMerkado.appendChild(cardsItem);
    }
}
populateCards();