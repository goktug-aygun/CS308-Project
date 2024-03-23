// Function to query CrewMembers and assign chefs to ChefsFoods table
async function assignChefsToFood() {
    try {
        // Query crew members with 'c' att_type
        const crewMembersQuery = "SELECT * FROM CrewMembers WHERE att_type = 'c'";
        const crewMembers = await executeQuery(crewMembersQuery);

        // Loop through crew members
        for (const member of crewMembers) {
            // Query for recipes ensuring specific attributes
            const alcoholAndDrinkQuery = `
                SELECT food_id FROM Recipes 
                WHERE is_alcohol = true 
                AND is_drink = true 
                AND food_id NOT IN (
                    SELECT food_id FROM ChefsFoods WHERE chef_id = '${member.crew_id}'
                )`;
            const halalAndDrinkQuery = `
                SELECT food_id FROM Recipes 
                WHERE is_halal = true 
                AND is_drink = true 
                AND food_id NOT IN (
                    SELECT food_id FROM ChefsFoods WHERE chef_id = '${member.crew_id}'
                )`;
            const veganNotDrinkQuery = `
                SELECT food_id FROM Recipes 
                WHERE is_vegan = true 
                AND is_drink = false 
                AND food_id NOT IN (
                    SELECT food_id FROM ChefsFoods WHERE chef_id = '${member.crew_id}'
                )`;
            const halalNotDrinkQuery = `
                SELECT food_id FROM Recipes 
                WHERE is_halal = true 
                AND is_drink = false 
                AND food_id NOT IN (
                    SELECT food_id FROM ChefsFoods WHERE chef_id = '${member.crew_id}'
                )`;

            const queries = [alcoholAndDrinkQuery, halalAndDrinkQuery, veganNotDrinkQuery, halalNotDrinkQuery];

            for (const query of queries) {
                const recipes = await executeQuery(query);
                if (recipes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * recipes.length);
                    const selectedFood = recipes[randomIndex].food_id;

                    // Insert chef-food association into ChefsFoods table
                    const insertQuery = `
                        INSERT INTO ChefsFoods (chef_id, food_id) 
                        VALUES ('${member.crew_id}', '${selectedFood}')`;
                    await executeQuery(insertQuery);
                }
            }
        }
        console.log("Chef-food assignments completed successfully.");
    } catch (error) {
        console.error("Error occurred while assigning chefs to food:", error);
    }
}

// Call the function to assign chefs to food
assignChefsToFood();
