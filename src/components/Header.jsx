import { Link, NavLink } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext.jsx";

export default function Header() {
  const { items } = useWatchlist();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">Reelfind</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Discover</NavLink>
          <NavLink to="/watchlist">
            Watchlist <span className="count" aria-label={`${items.length} saved`}>{items.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
