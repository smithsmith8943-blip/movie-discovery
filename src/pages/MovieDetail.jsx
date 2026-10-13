import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, imageUrl } from "../services/tmdb.js";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import StarRating from "../components/StarRating.jsx";

const formatRuntime = (min) => (min ? `${Math.floor(min / 60)}h ${min % 60}m` : null);

export default function MovieDetail() {
  const { id } = useParams();
  const { has, toggle } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    window.scrollTo(0, 0);

    getMovieDetails(id)
      .then((data) => !ignore && setMovie(data))
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <Loader label="Loading movie..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const cast = movie.credits?.cast.slice(0, 10) ?? [];
  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const similar = movie.similar?.results.slice(0, 6) ?? [];
  const poster = imageUrl(movie.poster_path, "w500");
  const saved = has(movie.id);
  const year = movie.release_date?.slice(0, 4);

  return (
    <article className="detail">
      <Link to="/" className="back">Back to discover</Link>

      <div className="detail-top">
        {poster ? (
          <img className="detail-poster" src={poster} alt={`${movie.title} poster`} />
        ) : (
          <div className="no-poster detail-poster">No poster</div>
        )}

        <div className="detail-info">
          <h1>{movie.title} {year && <span className="year">({year})</span>}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p className="meta">
            {[formatRuntime(movie.runtime), `TMDB ${movie.vote_average.toFixed(1)}/10`,
              director && `Directed by ${director.name}`].filter(Boolean).join(" | ")}
          </p>
          <ul className="genre-list">
            {movie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
          </ul>
          <h2>Overview</h2>
          <p>{movie.overview || "No synopsis available."}</p>

          <div className="actions">
            <button
              type="button"
              className={`btn ${saved ? "btn-saved" : "btn-primary"}`}
              aria-pressed={saved}
              onClick={() => toggle(movie)}
            >
              {saved ? "Remove from watchlist" : "Add to watchlist"}
            </button>
          </div>
          <h2>Your rating</h2>
          <StarRating movieId={movie.id} />
        </div>
      </div>

      {trailer && (
        <section>
          <h2>Trailer</h2>
          <div className="video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
              title={`${movie.title} trailer`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      )}

      {cast.length > 0 && (
        <section>
          <h2>Cast</h2>
          <ul className="cast">
            {cast.map((person) => (
              <li key={person.id}>
                {person.profile_path ? (
                  <img src={imageUrl(person.profile_path, "w185")} alt={person.name} loading="lazy" />
                ) : (
                  <div className="no-poster small">No photo</div>
                )}
                <strong>{person.name}</strong>
                <span>{person.character}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {similar.length > 0 && (
        <section>
          <h2>Similar movies</h2>
          <MovieGrid movies={similar} />
        </section>
      )}
    </article>
  );
}
