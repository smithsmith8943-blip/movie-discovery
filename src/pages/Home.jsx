import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import GenreFilter from "../components/GenreFilter.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { getGenres, getMovies } from "../services/tmdb.js";

const SECTIONS = [
  { id: "trending", label: "Trending" },
  { id: "popular", label: "Popular" },
  { id: "top_rated", label: "Top rated" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 400);
  const [section, setSection] = useState("trending");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setGenres([]));
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    getMovies({ query: debouncedQuery, genre, section, page })
      .then((data) => {
        if (ignore) return;
        setMovies((prev) => {
          if (page === 1) return data.results;
          const seen = new Set(prev.map((m) => m.id));
          return [...prev, ...data.results.filter((m) => !seen.has(m.id))];
        });
        setTotalPages(data.total_pages);
      })
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [debouncedQuery, genre, section, page, retryCount]);

  const handleQuery = (value) => {
    setQuery(value);
    setPage(1);
  };
  const handleSection = (id) => {
    setSection(id);
    setPage(1);
  };
  const handleGenre = (id) => {
    setGenre(id);
    setPage(1);
  };

  const genreName = genres.find((g) => String(g.id) === genre)?.name;
  const sectionLabel = SECTIONS.find((s) => s.id === section).label;
  const heading = debouncedQuery
    ? `Results for "${debouncedQuery}"`
    : genreName
    ? `${sectionLabel}: ${genreName}`
    : sectionLabel;

  return (
    <>
      <section className="intro">
        <h1>What are you watching tonight?</h1>
        <SearchBar value={query} onChange={handleQuery} />
      </section>

      <GenreFilter genres={genres} selected={genre} onSelect={handleGenre} />

      <div className="section-head">
        <h2>{heading}</h2>
        {!debouncedQuery && (
          <div className="tabs" role="group" aria-label="Sort movies">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`tab ${section === s.id ? "active" : ""}`}
                aria-pressed={section === s.id}
                onClick={() => handleSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <ErrorMessage message={error} onRetry={() => setRetryCount((c) => c + 1)} />
      ) : (
        <>
          {!loading && movies.length === 0 && (
            <p className="empty">No movies found. Try a different title or genre.</p>
          )}
          <MovieGrid movies={movies} />
          {loading && <Loader label="Loading movies..." />}
          {!loading && page < totalPages && (
            <div className="center">
              <button type="button" className="btn" onClick={() => setPage((p) => p + 1)}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
