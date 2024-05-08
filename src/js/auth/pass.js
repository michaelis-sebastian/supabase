        import { supabase } from "../main";

        let isFirstAuthStateChange = true; // Flag to track the first auth state change

        supabase.auth.onAuthStateChange(async (event, session) => {
            // Only execute the following logic on the first auth state change
            if (isFirstAuthStateChange) {
                isFirstAuthStateChange = false; // Update flag to indicate that the first auth state change has occurred

                async function fetchAllShoesPasses() {
                    try {
                        // Fetch all passed shoes from the 'shoes_passed' table
                        const { data: passedShoes, error: passedError } = await supabase
                            .from('shoes_passed')
                            .select('pass_id, shoe_id, is_favorite');
                        
                        if (passedError) {
                            console.error(passedError.message);
                            return [];
                        }

                        return passedShoes;
                    } catch (error) {
                        console.error('General Error:', error.message);
                        return [];
                    }
                }

                async function fetchShoeData(shoe_id) {
                    try {
                        // Fetch shoe data by shoe_id
                        const { data: shoeData, error: shoeError } = await supabase
                            .from('shoe')
                            .select('shoe_id, name, price, image, description')
                            .eq('shoe_id', shoe_id)
                            .single();
                        
                        if (shoeError) {
                            console.error(shoeError.message);
                            return null;
                        }

                        return shoeData;
                    } catch (error) {
                        console.error('General Error:', error.message);
                        return null;
                    }
                }

                async function populateCards() {
                    const CardoMerkado = document.getElementById('CardDInner');

                    // Fetch all shoes passes from Supabase
                    const allShoesPasses = await fetchAllShoesPasses();

                    // Set to store unique shoe IDs
                    const addedShoes = new Set();

                    // Populate shoe cards
                    for (const passedShoe of allShoesPasses) {
                        const { shoe_id } = passedShoe;

                        // Check if the shoe has already been added
                        if (!addedShoes.has(shoe_id)) {
                            const shoeData = await fetchShoeData(shoe_id);
                            if (shoeData) {
                                const { name, price, image, description } = shoeData;

                                // Create a carousel item for each shoe
                                const cardsItem = document.createElement('div');
                                cardsItem.classList.add('row');

                                cardsItem.innerHTML = `
                                    <div class="col mb-4 py-4 mx-auto" style="">
                                        <div class="card mx-auto" style="width: 22rem;">
                                            <img class="pt-3 mx-auto" src="${image}" alt="${name}" style="width: 20rem; height: 20rem;">
                                            <div class="card-body">
                                                <h1 class="card-title fw-bold">${name}</h1>
                                                <h4 class="card-price fw-bold">Php. ${price}</h4>
                                                <p class="card-text fst-italic">${description}</p>
                                               
                                               
                                            </div>
                                        </div>
                                    </div>
                                `;

                                // Append the carousel item to the carousel inner container
                                CardoMerkado.appendChild(cardsItem);

                                // Add shoe_id to the set of added shoes
                                addedShoes.add(shoe_id);
                            }
                        }
                    }
                }

                // Call the populateCards function
                populateCards();
            }
        });
