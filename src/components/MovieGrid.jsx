import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies }) {
  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
