function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.defer = true;
  document.body.appendChild(script);
}


document.addEventListener("DOMContentLoaded", () => {

  loadScript("../js/eye-on-off.js");

});

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjg5ZDAxNThjMjhjYzNhZmRkMDc0MDljMzEwNzA2YSIsIm5iZiI6MTc2MDg4NzQ3Mi44MjQsInN1YiI6IjY4ZjUwMmIwNTgxZWI3OTk4NTAwZGJlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T1K1nyyRdRRTVOyZx0jv-aUx_kegGTjI_55mef1XuKM";
const IMG = "https://image.tmdb.org/t/p/w500";

// Track pages for each section
const pages = {
  "top-rated": 1,
  "action": 1,
  "popular": 1,
};

// Function to fetch and append movies
async function loadMovies(url, containerId, ranked = false, page = 1) {
  // Adjust URL for page param
  const fetchUrl = url.includes("?") ? `${url}&page=${page}` : `${url}?page=${page}`;

  const res = await fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const container = document.getElementById(containerId);

  data.results.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = `url(${IMG}${movie.poster_path})`;

    card.innerHTML = `
      ${ranked ? `<div class="rank">${(page - 1) * 20 + index + 1}</div>` : ""}
      <div class="overlay">
        <h3>${movie.title}</h3>
        <span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// Infinite horizontal scroll setup
function setupInfiniteScroll(containerId, url, ranked = false) {
  const container = document.getElementById(containerId);

  container.addEventListener("scroll", () => {
    // When scrolled near the right end
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
      pages[containerId]++;
      loadMovies(url, containerId, ranked, pages[containerId]);
    }
  });
}

// Initial load
loadMovies("https://api.themoviedb.org/3/movie/top_rated", "top-rated", true);
loadMovies("https://api.themoviedb.org/3/discover/movie?with_genres=28", "action");
loadMovies("https://api.themoviedb.org/3/movie/popular", "popular");

// Setup infinite scroll
setupInfiniteScroll("top-rated", "https://api.themoviedb.org/3/movie/top_rated", true);
setupInfiniteScroll("action", "https://api.themoviedb.org/3/discover/movie?with_genres=28");
setupInfiniteScroll("popular", "https://api.themoviedb.org/3/movie/popular");
