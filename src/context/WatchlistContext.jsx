import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [items, setItems] = useLocalStorage("reelfind-watchlist", []);

  const toggle = useCallback(
    (movie) => {
      setItems((prev) =>
        prev.some((m) => m.id === movie.id)
          ? prev.filter((m) => m.id !== movie.id)
          : [
              ...prev,
              {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
              },
            ]
      );
    },
    [setItems]
  );

  const has = useCallback((id) => items.some((m) => m.id === id), [items]);
  const value = useMemo(() => ({ items, toggle, has }), [items, toggle, has]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
