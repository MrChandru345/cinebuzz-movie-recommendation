import { useState, useEffect } from "react";
import { fetchMoviesByFilters } from "../services/api";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
  ];

  const languages = [
    { code: "", name: "All Languages" },
    { code: "en", name: "Hollywood (English)" },
    { code: "hi", name: "Bollywood (Hindi)" },
    { code: "ta", name: "Kollywood (Tamil)" },
    { code: "te", name: "Tollywood (Telugu)" },
    { code: "ml", name: "Malayalam" },
    { code: "kn", name: "Kannada" },
    { code: "ko", name: "Korean" },
    { code: "ja", name: "Japanese" },
  ];

  // Shows last 50 years (1975-2025)
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);

        // Build clean filters object
        const filters = {};
        if (language) filters.language = language;
        if (genre) filters.genre = genre;
        if (year) filters.year = year;
        if (rating) filters.rating = rating;
        if (sortBy) filters.sortBy = sortBy;

        const data = await fetchMoviesByFilters(filters);
        setMovies(data || []);
      } catch (error) {
        console.error("Error loading movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [language, genre, year, rating, sortBy]);

  const handleReset = () => {
    setLanguage("");
    setGenre("");
    setYear("");
    setRating("");
    setSortBy("popularity.desc");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Loading movies... 🎬
        </div>
        <p className="text-gray-400 text-lg max-w-md animate-pulse delay-150">
          Please wait while we fetch the latest movies. If loading takes too
          long, please
          <span className="text-red-500 font-semibold ml-1">
            Connect to a VPN
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black">
      <Header />

      <div className="pt-24 max-w-[1600px] mx-auto px-8 py-12">
        {/* INLINE FILTER BOX */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl shadow-2xl mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white border-l-4 border-red-500 pl-4">
              Filter Movies
            </h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
            >
              <i className="bx bx-reset"></i> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Language */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">
                <i className="bx bx-world"></i> Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">
                <i className="bx bx-category"></i> Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">
                <i className="bx bx-calendar"></i> Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating - ALL RATINGS 1-9 */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">
                <i className="bx bxs-star"></i> Minimum Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Ratings</option>
                <option value="1">1+ ⭐</option>
                <option value="2">2+ ⭐</option>
                <option value="3">3+ ⭐</option>
                <option value="4">4+ ⭐</option>
                <option value="5">5+ ⭐</option>
                <option value="6">6+ ⭐</option>
                <option value="7">7+ ⭐</option>
                <option value="8">8+ ⭐⭐</option>
                <option value="9">9+ ⭐⭐⭐</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">
                <i className="bx bx-sort"></i> Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="popularity.desc">Popular</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="release_date.desc">Newest</option>
              </select>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4">
          All Movies {movies.length > 0 && `(${movies.length})`}
        </h2>

        {movies.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xl">
            No movies found. Try changing filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
