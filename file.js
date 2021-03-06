const APIURL = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');

const search = document.getElementById('search');

getUser("florinpop17");
async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    //console.log(respData);
    createUserCard(respData);
    getRepos(username);
}
async function getRepos(username) {
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();
    addReposToCard(respData);
}
function createUserCard(user) {
    
    const cardHTML = `
        <div class="card">
            <div class="img-container">
                <img src="${user.avatar_url}" class="avatar" alt="${user.name}"/>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li><strong>followers</strong>${user.followers}</li>
                    <li><strong>following</strong>${user.following}</li>
                    <li><strong>public_repos</strong>${user.public_repos}</li>
                </ul>
                <div class="reposs" id="repos">

                </div>
            </div>
        </div>
    `;
    
    main.innerHTML = cardHTML;
    
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    console.log(repos);
    repos.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 30).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);

    } )
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    console.log(getUser(user));
    if (user) {
        getUser(user);
        search.value = "";
    }
    
});

