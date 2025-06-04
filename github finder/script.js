const dom = {
  searchInput: document.getElementById('search-input'),
  searchButton: document.getElementById('search-button'),
  profileContainer: document.getElementById('profile-container'),
  avatar: document.getElementById('profile-avatar'),
  nameEl: document.getElementById('profile-name'),
  bioEl: document.getElementById('profile-bio'),
  locationEl: document.getElementById('profile-location'),
  followersEl: document.getElementById('profile-followers'),
  followingEl: document.getElementById('profile-following'),
  profileLink: document.getElementById('profile-link'),
  repoList: document.getElementById('repo-list')
};

const GITHUB_API_BASE = 'https://api.github.com/users/';

dom.searchButton.addEventListener('click', () => {
  const username = dom.searchInput.value.trim();
  if (username) {
    fetchUserProfile(username);
  }
});

dom.searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    dom.searchButton.click();
  }
});

async function fetchUserProfile(username) {
  try {
    const userResponse = await fetch(`${GITHUB_API_BASE}${username}`);
    if (!userResponse.ok) throw new Error('User not found');
    const userData = await userResponse.json();
    updateProfile(userData);
    fetchUserRepos(username);
    dom.profileContainer.classList.remove('hidden');
  } catch (error) {
    showError(error.message);
  }
}

async function fetchUserRepos(username) {
  try {
    const repoResponse = await fetch(`${GITHUB_API_BASE}${username}/repos?sort=updated&per_page=5`);
    if (!repoResponse.ok) throw new Error('Repositories not found');
    const repos = await repoResponse.json();
    updateRepoList(repos);
  } catch (error) {
    console.error(error);
  }
}

function updateProfile(user) {
  dom.avatar.src = user.avatar_url;
  dom.nameEl.textContent = user.name || user.login;
  dom.bioEl.textContent = user.bio || 'No bio available';
  dom.locationEl.textContent = user.location ? `📍 ${user.location}` : '';
  dom.followersEl.textContent = `Followers: ${user.followers}`;
  dom.followingEl.textContent = `Following: ${user.following}`;
  dom.profileLink.href = user.html_url;
  dom.profileLink.textContent = 'View Profile';

  dom.profileContainer.classList.remove('hidden');
}

function updateRepoList(repos) {
  dom.repoList.innerHTML = '';
  if (repos.length === 0) {
    dom.repoList.innerHTML = '<li>No repositories found.</li>';
    return;
  }

  repos.forEach(repo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
      <p>${repo.description || 'No description'}</p>
    `;
    dom.repoList.appendChild(li);
  });
}

function showError(message) {
  dom.profileContainer.classList.add('hidden');
  alert(message);
}