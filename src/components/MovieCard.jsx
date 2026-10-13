import { memo } from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../services/tmdb.js";
import { useWatchlist } from "../context/WatchlistContext.jsx";

function MovieCard({ movie }) {
  const { has, toggle } = useWatchlist();
  const saved = has(movie.id);
  const poster = imageUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Unknown year";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  return (
    <article className="card">
      <Link to={`/movie/${movie.id}`} className="card-link">
        {poster ? (
          <img src={poster} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="no-poster">No poster</div>
        )}
        <div className="card-body">
          <h3>{movie.title}</h3>
          <p className="meta">{year}</p>
        </div>
      </Link>
      <span className="rating-badge" title="TMDB rating">{rating}</span>
      <button
        type="button"
        className={`save-btn ${saved ? "saved" : ""}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
        onClick={() => toggle(movie)}
      >
        {saved ? "Saved" : "Save"}
      </button>
    </article>
  );
}

export default memo(MovieCard);
