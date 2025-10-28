import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setBooks(data.docs.slice(0, 20));
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Finder</h1>
        <p className="subtitle">Find your favorite books instantly</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading books...</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}

      <div className="results">
        {books.map((book) => (
          <a
            key={book.key}
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="book-card"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x200?text=No+Cover"
              }
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown Author"}
            </p>
          </a>
        ))}
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Built by{" "}
          <span className="name">Karnam Roshini Srija</span>
        </p>
      </footer>
    </div>
  );
}
