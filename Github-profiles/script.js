const APIURL = 'https://api.github.com/users/';
const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

async function getUser(user){
     const resp = await fetch(APIURL+user);
     const respData = await resp.json();
     createUserCard(respData);

     getRepos(user);
}

async function getRepos(username){
     const resp = await fetch(APIURL+username+'/repos');
     const respData = await resp.json();
     console.log(respData);
     addReposToCard(respData);
}
getUser("MrCoolest")
function createUserCard(user){

     const cardHtml = `
     <div class="card">
     <div class="img-container">
          <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
     </div>
     <div class="user-info">
          <h2>${user.name}</h2>
          <p> ${user.bio}</p>
          <ul class="info">
               <li><strong>Followers</strong> ${user.followers}</li>
               <li><strong>Following</strong>${user.following}</li>
               <li><strong>Repos</strong>${user.public_repos}</li>
              
          </ul>
          <div class="repos" id="repos"></div>
     </div>
     </div>
     `;

     main.innerHTML= cardHtml;
}

function addReposToCard(repos){
     const reposEl = document.getElementById('repos');

     repos.forEach(repo => {
          const repoEL = document.createElement('a');
          repoEL.classList.add('repo')

          repoEL.href = repo.html_url;
          repoEL.target = '_blank';
          repoEL.innerText =  repo.name;

          reposEl.appendChild(repoEL);
     });
}

form.addEventListener('submit', (e)=>{
     e.preventDefault();
     const user = search.value;
     if(user) {
          getUser(user);

          search.value="";
     }
});