import useLocalStorage from "../hooks/useLocalStorage.js";

// Personal rating (1-5), saved in the browser per movie.
export default function StarRating({ movieId }) {
  const [ratings, setRatings] = useLocalStorage("reelfind-ratings", {});
  const current = ratings[movieId] || 0;

  const rate = (value) =>
    setRatings((prev) => {
      const next = { ...prev };
      if (prev[movieId] === value) delete next[movieId];
      else next[movieId] = value;
      return next;
    });

  return (
    <div className="stars" role="group" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= current ? "star on" : "star"}
          aria-pressed={n <= current}
          aria-label={`Rate ${n} out of 5`}
          onClick={() => rate(n)}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
}
