"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Book } from "../types/Book";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchTerm}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchTerm("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="search__wrapper" ref={searchRef}>
        <input
          type="text"
          className="search__input"
          placeholder="Search for books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search__icon">
          {searchTerm ? (
              <FiX onClick={clearSearch} style={{cursor: 'pointer'}}/>
          ) : (
              <FiSearch />
          )}
        </div>
      {searchTerm && (
        <div className="search__results--wrapper">
          {loading ? (
            <div className="search__results--loading">Loading...</div>
          ) : (
            <div className="search__results">
              {results.length > 0 ? (
                results.map((book) => (
                  <Link href={`/book/${book.id}`} key={book.id} className="search__result--item" onClick={() => setSearchTerm('')}>
                    <figure className="search__result--book__image--wrapper">
                      <img src={book.imageLink} alt={book.title} className="search__result--book__image" />
                    </figure>
                    <div className="search__result--book__details">
                      <div className="search__result--book__title">{book.title}</div>
                      <div className="search__result--book__author">{book.author}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="search__no-results">No books found</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
