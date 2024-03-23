const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'cs308project',
    database: 'CS308_MAIN_SQL_DATABASE'
});

connection.connect();

async function assignChefsToFood() {
    try {
        // Query crew members with 'C' att_type
        const crewMembersQuery = "SELECT * FROM CrewMembers WHERE att_type = 'C'";

        connection.query(crewMembersQuery, (error, crewMembersResult) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }

            const crewMembers = crewMembersResult;
            for (const member of crewMembers) {

                const vegan_halal = `
                    SELECT menu_id FROM Menus 
                    WHERE is_halal = true 
                    AND is_vegan = true
                `;
                
                const nonVegan_halal = `
                    SELECT menu_id FROM Menus 
                    WHERE is_halal = true 
                    AND is_vegan = false
                `;

                const vegan_nonHalal = `
                    SELECT menu_id FROM Menus 
                    WHERE is_halal = false 
                    AND is_vegan = true
                `;
                
                const nonVegan_nonHalal = `
                    SELECT menu_id FROM Menus 
                    WHERE is_halal = false 
                    AND is_vegan = false
                `;

                const queries = [
                    vegan_halal,
                    nonVegan_halal,
                    vegan_nonHalal,
                    nonVegan_nonHalal
                ];

                for (const query of queries) {
                    connection.query(query, (error, recipesResult) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }

                        const recipes = recipesResult;

                        if (recipes.length === 0) {
                            console.error('No available food/drink within the list.', query);
                            return;
                        }

                        const randomIndex = Math.floor(Math.random() * recipes.length);
                        const selectedFood = recipes[randomIndex].menu_id;

                        const insertQuery = `
                            INSERT INTO ChefsMenus (chef_id, menu_id) 
                            VALUES (?, ?)`;

                        connection.query(insertQuery, [member.crew_id, selectedFood], (error, rows) => {
                            if (error) {
                                console.error('Error executing query:', error);
                                return;
                            }
                            console.log('Insertion successful:');
                        });
                    });
                }
            }
        });

        console.log("Chef-food assignments completed successfully.");
    } catch (error) {
        console.error("Error occurred while assigning chefs to food:", error);
    }
    connection.end();
}

// Call the function to assign chefs to food
assignChefsToFood();