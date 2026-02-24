import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const data = await searchMovies(query);
        setMovies(data || []);
      } catch (error) {
        console.error("Error searching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Searching... 🔍
        </div>
        <p className="text-gray-400 text-lg max-w-md animate-pulse delay-150">
          Please wait while we search the catalog. If loading takes too long,
          please
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
        <h2 className="text-4xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4">
          Search Results for &quot;{query}&quot;
        </h2>

        {movies.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xl">
            No movies found for &quot;{query}&quot;
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
