const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280/';

const main_container = document.getElementById('main_container');
const form = document.getElementById('form'); 
const search = document.getElementById('search'); 

getMovies(APIURL);

async function getMovies(url){
     const resp = await fetch(url);
     const respData = await resp.json();
     showMovies(respData.results);
}



function showMovies(movies){
     // clear  main_container
     main_container.innerHTML = "";
     movies.forEach(movie => {
          const movieEL = document.createElement('div');
          movieEL.classList.add('movie');

          movieEL.innerHTML = `
          <img src="${IMGPATH+movie.poster_path}" alt="">
          <div class="movie-info">
               <h3>${movie.original_title}</h3>
               <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
          </div>
          <div class="overview"> 
          <h4> Overview</h4>
               ${movie.overview}
          </div>
          `;


          main_container.appendChild(movieEL);
     });
}

function getClassByRate(vote){
     if(vote >= 8){
          return 'green'
     }else if(vote >= 5){
          return 'orange';
     }else{
          return 'red';
     }
}

form.addEventListener('submit',(e)=>{
     e.preventDefault();

     const searchterm = search.value;

     if (searchterm) {
          getMovies(SEARCHAPI+searchterm);
          search.value = "";

     }
})