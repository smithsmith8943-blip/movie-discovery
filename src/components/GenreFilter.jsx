export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <div className="chips" role="group" aria-label="Filter by genre">
      <button
        type="button"
        className={`chip ${selected === "" ? "active" : ""}`}
        aria-pressed={selected === ""}
        onClick={() => onSelect("")}
      >
        All genres
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          type="button"
          className={`chip ${String(g.id) === selected ? "active" : ""}`}
          aria-pressed={String(g.id) === selected}
          onClick={() => onSelect(String(g.id))}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
