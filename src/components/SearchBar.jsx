export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="movie-search" className="sr-only">Search movies by title</label>
      <input
        id="movie-search"
        type="search"
        placeholder="Search movies by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
