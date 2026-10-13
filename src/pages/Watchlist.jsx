import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function Watchlist() {
  const { items } = useWatchlist();
  return (
    <>
      <div className="section-head">
        <h1>Your watchlist</h1>
      </div>
      {items.length === 0 ? (
        <p className="empty">
          Nothing saved yet. <Link to="/">Find a movie</Link> and press Save.
        </p>
      ) : (
        <MovieGrid movies={items} />
      )}
    </>
  );
}
