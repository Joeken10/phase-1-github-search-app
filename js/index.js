document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  form.addEventListener('submit', handleSearch);

  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    searchUsers(query);
  }

  function searchUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
  }

  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
      userCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
      `;
      userCard.addEventListener('click', () => fetchRepos(user.login));
      userList.appendChild(userCard);
    });
  }

  function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => displayRepos(data))
    .catch(error => console.error('Error:', error));
  }

  function displayRepos(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';
    repos.forEach(repo => {
      const repoCard = document.createElement('div');
      repoCard.classList.add('repo-card');
      repoCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <p>${repo.description}</p>
      `;
      repoList.appendChild(repoCard);
    });
  }
});