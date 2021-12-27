
const meals = document.getElementById('meals');
const FavMealContainer = document.getElementById('fav-meals-section');
const SearchTerm = document.getElementById('search-term');
const Searchbtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const closePopup = document.getElementById('close-popup');
const mealinfo = document.getElementById("meal-info");


getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal);
    addMeal(randomMeal, true);
}



// getMealById(21)
async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

    const respData = await resp.json();
    const Meal = respData.meals[0];

    return Meal;

}

async function getMealBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);

    const respData = await resp.json();
    const Meal = respData.meals;

    // console.log(Meal);

    return Meal;
}


function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
    <div class="meal-header">
    ${random ? `<span class="random">
    Random Recipe
</span>` : ``}
         <img src="${mealData.strMealThumb}" alt="${mealData.Meal}">
    </div>
    <div class="meal-body">
         <h4>${mealData.strMeal}</h4>
         <button class="fav-btn "><i class="fas fa-heart"></i></button>
    </div>
</div>`;

    meal.querySelector('.fav-btn').
        addEventListener('click', e => {
            if (e.target.classList.contains('active')) {
                removeMealToLS(mealData.idMeal);
                e.target.classList.remove('active');

            } else {
                addMealToLS(mealData.idMeal);
                e.target.classList.add('active');
            }
            fetchFavMeals();
        });

    meal.addEventListener('click', ()=>{
        showMealInfo(mealData);
    })    
    meals.appendChild(meal);
}



function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

}


function removeMealToLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));

}


function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    // console.log(mealIds);
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

    // Clean the Fav Meal Container
    FavMealContainer.innerHTML = "";
    const mealIds = getMealsFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);


        addMealToFav(meal);
    }

}

function addMealToFav(mealData) {
    const favMeals = document.createElement('li');

   

    favMeals.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <span>${mealData.strMeal}</span> 
    <button class="clear"><i class="fas fa-times"></i></button>`;


    const btn = favMeals.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealToLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeals.addEventListener('click', ()=>{
        showMealInfo(mealData);
    });  
    FavMealContainer.appendChild(favMeals);
}


function showMealInfo(mealData) {
    // Clean the div
    mealinfo.innerHTML = '';
    // update meal info
    const mealInfoEL = document.createElement('div');

    let ingredents = [];

    // get ingridents
    for(let i=1; i<=20; i++){
           if(mealData['strIngredient'+i]){
                ingredents.push(`
                ${mealData['strIngredient'+i]} - 
                ${mealData['strMeasure'+i]} `)
           }else{
               break;
           }
    }
    mealInfoEL.innerHTML =   `
        
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>${mealData.strInstructions}</p>
        <h3> Ingredients & Measures </h3>
        <ul>
            ${ingredents.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `

    mealinfo.appendChild(mealInfoEL);

   
    //show the popup
    mealPopup.classList.remove('hide');
}


Searchbtn.addEventListener("click", async () => {
    // clearing Inner html of meals
    meals.innerHTML = "";
    const search = SearchTerm.value;
    const result = await getMealBySearch(search);

    if (result)
        result.forEach(meal => addMeal(meal));

});


closePopup.addEventListener("click", () => {
    mealPopup.classList.add('hide');
});