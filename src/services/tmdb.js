// All TMDB calls live here, so the app can switch to our own backend later.
const BASE = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_KEY;

export const imageUrl = (path, size = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

async function request(path, params = {}) {
  if (!KEY) {
    throw new Error("TMDB API key is missing. Add VITE_TMDB_KEY to your .env file.");
  }
  const url = new URL(BASE + path);
  url.searchParams.set("api_key", KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, value);
  });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? "TMDB rejected the API key. Check VITE_TMDB_KEY."
        : `Could not load movies (error ${res.status}). Try again.`
    );
  }
  return res.json();
}

const SECTION_PATHS = {
  trending: "/trending/movie/week",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
};

// One function covers search, genre filtering and the three home sections.
export function getMovies({ query, genre, section, page }) {
  if (query) return request("/search/movie", { query, page, include_adult: false });
  if (genre) {
    return request("/discover/movie", {
      with_genres: genre,
      page,
      sort_by: section === "top_rated" ? "vote_average.desc" : "popularity.desc",
      "vote_count.gte": section === "top_rated" ? 300 : undefined,
    });
  }
  return request(SECTION_PATHS[section], { page });
}

export async function getGenres() {
  const data = await request("/genre/movie/list");
  return data.genres;
}

export function getMovieDetails(id) {
  return request(`/movie/${id}`, { append_to_response: "videos,credits,similar" });
}
