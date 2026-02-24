import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, imageUrl } from "../services/api";
import Header from "../components/Header";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };

    loadMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Loading Details... 🎬
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

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Movie not found 😢</div>
      </div>
    );
  }

  const director = movie.crew?.find((person) => person.job === "Director");

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black">
      <Header />

      {/* Hero Section with Background Image */}
      <div className="relative w-full">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          {movie.backdrop_path && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${imageUrl.original}${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>

        {/* BEAUTIFUL BACK BUTTON - NOT FIXED, SCROLLS WITH PAGE */}
        <div className="relative z-20 pt-28 pb-4 max-w-7xl mx-auto px-8">
          <button
            onClick={handleBackClick}
            className="group flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
              <i className="bx bx-arrow-back text-xl group-hover:-translate-x-1 transition-transform"></i>
              <span className="font-semibold text-sm">Back</span>
            </div>
          </button>
        </div>

        {/* Movie Info Section */}
        <div className="relative z-10 pb-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                {movie.poster_path ? (
                  <img
                    src={`${imageUrl.large}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-64 h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/10"
                  />
                ) : (
                  <div className="w-64 h-96 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500">
                    No Poster
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 text-white">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-xl text-gray-400 italic mb-6">
                    &quot;{movie.tagline}&quot;
                  </p>
                )}

                {/* Rating & Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                    <i className="bx bxs-star text-yellow-400 text-xl"></i>
                    <span className="font-bold text-xl">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-400">/ 10</span>
                  </div>

                  {movie.release_date && (
                    <div className="px-4 py-2 bg-white/10 rounded-full">
                      <i className="bx bx-calendar"></i>{" "}
                      {movie.release_date.split("-")[0]}
                    </div>
                  )}

                  {movie.runtime && (
                    <div className="px-4 py-2 bg-white/10 rounded-full">
                      <i className="bx bx-time"></i> {movie.runtime} min
                    </div>
                  )}

                  {movie.original_language && (
                    <div className="px-4 py-2 bg-white/10 rounded-full uppercase">
                      {movie.original_language}
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-4 py-1.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full text-sm border border-purple-500/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-3 border-l-4 border-red-500 pl-4">
                    Overview
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {movie.overview || "No overview available."}
                  </p>
                </div>

                {/* Director */}
                {director && (
                  <div className="mb-6">
                    <span className="text-gray-400">Directed by: </span>
                    <span className="text-white font-semibold">
                      {director.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="bg-black">
        {movie.cast && movie.cast.length > 0 && (
          <div className="max-w-7xl mx-auto px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
              Cast
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {movie.cast.map((actor) => (
                <div
                  key={actor.id}
                  className="group relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/10 hover:border-purple-500/50"
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={
                        actor.profile_path
                          ? `${imageUrl.medium}${actor.profile_path}`
                          : "https://via.placeholder.com/500x750?text=No+Image"
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 bg-black/60">
                    <h3 className="text-white font-semibold text-xs line-clamp-1">
                      {actor.name}
                    </h3>
                    <p className="text-gray-400 text-[10px] line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
