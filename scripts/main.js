'use strict';
const form = document.querySelector('#search-form');
const input = form.querySelector('[name=search-field]');
const tvShowSection = document.querySelector('#tv-shows');

const doFetch = async (param) => {
  try {
    const response = await fetch(
        `http://api.tvmaze.com/search/shows?q=${param}`);
    return await response.json();
  } catch (e) {
    console.error('doFetch', e.message);
    return [];
  }
};

form.onsubmit = async (evt) => {
  evt.preventDefault();
  tvShowSection.innerHTML = '';
  const shows = await doFetch(input.value);

  shows.forEach(s => {
    listShow(s);
  });
};

function listShow(showParam) {
  const show = showParam.show;
  const article = document.createElement('article');
  article.className = 'show';

  // Image
  const img = document.createElement('img');
  if (show.image && show.image.medium)
    img.src = show.image.medium;
  else
    img.src = 'http://via.placeholder.com/210x300';
  img.alt = `Image of ${show.name}`;
  article.appendChild(img);

  const info = document.createElement('div');
  info.className = 'show-info';
  article.appendChild(info);

  // Title
  if (show.name) {
    const h2 = document.createElement('h2');
    h2.innerText = show.name;
    info.appendChild(h2);
  }

  // Summary
  if (show.summary) {
    info.innerHTML += show.summary;
  }

  // Genres
  if (show.genres !== null && show.genres.size !== 0) {
    const p = document.createElement('p');
    p.innerHTML = show.genres.join(', ');
    info.appendChild(p);
  }

  // Link
  if (show.officialSite) {
    const a = document.createElement('a');
    a.innerText = 'Official site';
    a.href = show.officialSite;
    info.appendChild(a);
  }

  tvShowSection.appendChild(article);
}