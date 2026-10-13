import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty">
      <h1>Page not found</h1>
      <p>That page does not exist. <Link to="/">Go back to discover</Link>.</p>
    </div>
  );
}
