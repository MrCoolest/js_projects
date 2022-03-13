const key = "3265874a2c77ae4a04bb96236a642d2f";
const formEL = document.getElementById("form");
const searchEL = document.getElementById("search");
const mainEL = document.getElementById("main");

const url = (loaction) =>     
     `https://api.openweathermap.org/data/2.5/weather?q=${loaction}&appid=${key}`;

async function getWeatherByLocation(city){
     const resp = await fetch(url(city));
     const respData = await resp.json();

     console.log(respData, KtoC(respData.main.temp));
     addWeatherToPage(respData)
}

// getWeatherByLocation('Delhi')

function addWeatherToPage(data){
     const temp = KtoC(data.main.temp);

     const weather =  document.createElement('div');
     weather.classList.add('weather');

     weather.innerHTML = `
          
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>${temp}°C
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>
          <small>${data.weather[0].main} <small>
     `;

     // clean the main;
     mainEL.innerHTML = "";
     mainEL.appendChild(weather);
}

function KtoC(K){
     return Math.floor(K - 273.15);
}

formEL.addEventListener('submit', (e)=>{
     e.preventDefault();

     const city = searchEL.value;
     if(city){
          getWeatherByLocation(city);
     }

})