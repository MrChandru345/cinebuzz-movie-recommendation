import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { searchMovies, imageUrl } from "../services/api";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Live search as user types
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        const results = await searchMovies(searchQuery);
        setSearchResults(results.slice(0, 6)); // Show top 6 results
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
    setIsMobileMenuOpen(false); // Close mobile menu when a search result is clicked
  };

  return (
    <header className="fixed w-full top-0 left-0 z-[100] flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 sm:py-5 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <Link
        to="/"
        className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl hover:scale-105 transition-transform z-[110]"
      >
        <i className="bx bxs-movie text-2xl sm:text-3xl text-red-500 animate-pulse"></i>
        <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
          CineVerse
        </span>
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden relative text-white z-[110] p-2 bg-black/50 rounded-md focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Navigation Links and Search Container */}
      <div
        className={`
        fixed md:static top-0 left-0 w-full md:w-auto h-auto min-h-[50vh] md:min-h-0 
        bg-black/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none
        flex-col md:flex-row items-center md:items-center justify-start md:justify-end gap-6 md:gap-10
        pt-24 pb-8 md:pt-0 md:pb-0 px-6 md:px-0
        transition-all duration-500 ease-in-out z-[105] shadow-2xl md:shadow-none
        translate-y-0 origin-top
        ${
          isMobileMenuOpen
            ? "flex opacity-100 scale-y-100"
            : "hidden md:flex opacity-0 md:opacity-100 scale-y-0 md:scale-y-100"
        }
      `}
      >
        <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-2xl md:text-base font-semibold hover:text-red-500 transition-all hover:scale-110"
          >
            Home
          </Link>
          <Link
            to="/movies"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-2xl md:text-base font-semibold hover:text-red-500 transition-all hover:scale-110"
          >
            Movies
          </Link>
        </nav>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 w-full md:w-auto px-8 md:px-0">
          {/* Live Search with Dropdown */}
          <div ref={searchRef} className="relative w-full md:w-auto">
            <div className="flex items-center w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="w-full md:w-64 bg-white/10 text-white px-4 py-3 md:py-2 pr-10 rounded-full outline-none border-2 border-white/20 focus:border-red-500 transition-all placeholder:text-gray-400"
                placeholder="Search movies..."
              />
              <i className="bx bx-search absolute right-4 md:right-3 text-white text-xl pointer-events-none"></i>
            </div>

            {/* Live Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-96 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 max-h-80 overflow-y-auto">
                {searchResults.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 p-3 hover:bg-white/10 transition-all border-b border-white/5 last:border-0"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${imageUrl.small}${movie.poster_path}`
                          : "https://via.placeholder.com/200x300?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm line-clamp-1">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-yellow-400">
                          ⭐ {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {movie.release_date?.split("-")[0]}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results Found */}
            {showResults && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-96 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-center">
                  No movies found for &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
