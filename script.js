// Add your Edamam API credentials here
const appId = '695b7cff';
const appKey = '7b16cbd9d21d1afff0ab9db811166135';

async function generateMealPlan() {
    // Retrieve user inputs
    const numMeals = document.getElementById('numMeals').value;
    const dietPreference = document.getElementById('dietPreference').value;
    const healthSpec = document.getElementById('healthSpec').value;
    const calories = document.getElementById('calories').value;

    // Construct API URL
    const apiUrl = `https://api.edamam.com/search?q=${dietPreference}&app_id=${appId}&app_key=${appKey}&health=${healthSpec}&calories=${calories}&from=0&to=${numMeals}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Call function to display meal plan
        displayMealPlan(data.hits);

    } catch (error) {
        console.error('Error fetching data from Edamam API:', error);
    }
}

function displayMealPlan(mealData) {
    const mealPlanTable = document.getElementById('mealPlanTable');
    mealPlanTable.innerHTML = ''; // Clear previous content

    // Create a table
    const table = document.createElement('table');

    // Create table header
    const headerRow = table.insertRow(0);
    headerRow.insertCell(0).textContent = 'Day';
    for (let i = 1; i <= mealData.length; i++) {
        headerRow.insertCell(i).textContent = `Meal ${i}`;
    }

    // Create table rows
    for (let j = 0; j < numMeals; j++) {
        const row = table.insertRow(j + 1);
        row.insertCell(0).textContent = getDay(j);

        // Insert meal details
        for (let k = 0; k < mealData.length; k++) {
            const meal = mealData[k].recipe;
            const cell = row.insertCell(k + 1);
            cell.innerHTML = `<img src="${meal.image}" alt="${meal.label}" width="100"><br>${meal.label}<br>${meal.ingredientLines.join('<br>')}`;
        }
    }

    // Append table to the mealPlanTable div
    mealPlanTable.appendChild(table);
}

function getDay(index) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[index % 7];
}


