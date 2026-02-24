import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies, fetchMoviesByFilters } from "../services/api";
import Header from "../components/Header";
import { imageUrl } from "../services/api";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [kollywoodMovies, setKollywoodMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const trendingRef = useRef(null);
  const hollywoodRef = useRef(null);
  const kollywoodRef = useRef(null);

  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        setLoading(true);
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending || []);

        const hollywood = await fetchMoviesByFilters({ language: "en" });
        setHollywoodMovies(hollywood || []);

        const kollywood = await fetchMoviesByFilters({ language: "ta" });
        setKollywoodMovies(kollywood || []);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllMovies();
  }, []);

  useEffect(() => {
    if (trendingMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.min(6, trendingMovies.length),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [trendingMovies]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Loading CineVerse... 🎬
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

  const sliderMovies = trendingMovies.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black">
      <Header />

      {/* HERO SLIDER */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[85vh] overflow-hidden mt-16 sm:mt-20">
        {sliderMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${imageUrl.original}${
                  movie.backdrop_path || movie.poster_path
                })`,
              }}
            />
            {/* Netflix-style fixed overlay for readability with higher image opacity */}
            <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent z-10"></div>
            <div className="absolute inset-y-0 left-0 w-[80%] sm:w-[60%] bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>

            {/* Content Container aligned to the left */}
            <div className="relative z-20 h-full flex flex-col justify-center text-left px-4 sm:px-8 xl:px-12">
              <div className="max-w-7xl mx-auto w-full flex flex-col items-start mt-6 sm:mt-16">
                <div className="max-w-3xl">
                  {/* Movie Title */}
                  <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 sm:mb-6 leading-tight drop-shadow-2xl tracking-wide max-w-[95%] sm:max-w-none">
                    {movie.title}
                  </h1>

                  {/* Meta Information (Year & Rating) */}
                  <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-6 mb-4 sm:mb-8 text-sm sm:text-base md:text-lg">
                    {movie.release_date && (
                      <span className="text-gray-300 font-bold tracking-wider drop-shadow-md bg-black/40 px-2 sm:px-3 border border-gray-500/50 py-1 rounded-sm">
                        {movie.release_date.split("-")[0]}
                      </span>
                    )}
                    {movie.vote_average && (
                      <div className="flex items-center gap-1 sm:gap-2 bg-black/50 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-lg">
                        <i className="bx bxs-star text-yellow-500 text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"></i>
                        <span className="text-white font-bold tracking-wide">
                          {movie.vote_average.toFixed(1)} / 10
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/movie/${movie.id}`}
                    className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-2.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-lg rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                  >
                    {/* Button hover glow effect */}
                    <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
                    <i className="bx bx-play-circle text-2xl sm:text-3xl text-white group-hover:scale-110 transition-transform duration-300"></i>
                    <span className="tracking-wide">View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 sm:bottom-10 left-0 right-0 z-30 flex justify-center gap-2 sm:gap-3">
          {sliderMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-pink-500 to-red-500 w-3 sm:w-4"
                  : "bg-white/30 w-1.5 sm:w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* MOVIE SLIDERS SECTION */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* TRENDING NOW SLIDER */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
          Trending Now
        </h2>
        <div className="slider-container relative mb-12 sm:mb-16">
          <button
            onClick={() => scroll(trendingRef, "left")}
            className="nav prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all -ml-2 sm:-ml-5"
          >
            &#10094;
          </button>

          <div
            ref={trendingRef}
            className="slider flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {trendingMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="movie-card flex-shrink-0 snap-start w-[140px] sm:w-[160px] md:w-[200px]"
              >
                <img
                  src={`${imageUrl.medium}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[210px] sm:h-[240px] md:h-[300px] object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll(trendingRef, "right")}
            className="nav next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all -mr-2 sm:-mr-5"
          >
            &#10095;
          </button>
        </div>

        {/* HOLLYWOOD MOVIES SLIDER */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
          Hollywood Movies
        </h2>
        <div className="slider-container relative mb-12 sm:mb-16">
          <button
            onClick={() => scroll(hollywoodRef, "left")}
            className="nav prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all -ml-2 sm:-ml-5"
          >
            &#10094;
          </button>

          <div
            ref={hollywoodRef}
            className="slider flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {hollywoodMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="movie-card flex-shrink-0 snap-start w-[140px] sm:w-[160px] md:w-[200px]"
              >
                <img
                  src={`${imageUrl.medium}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[210px] sm:h-[240px] md:h-[300px] object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll(hollywoodRef, "right")}
            className="nav next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all -mr-2 sm:-mr-5"
          >
            &#10095;
          </button>
        </div>

        {/* KOLLYWOOD MOVIES SLIDER */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
          Kollywood Movies
        </h2>
        <div className="slider-container relative mb-12 sm:mb-16">
          <button
            onClick={() => scroll(kollywoodRef, "left")}
            className="nav prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all -ml-2 sm:-ml-5"
          >
            &#10094;
          </button>

          <div
            ref={kollywoodRef}
            className="slider flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {kollywoodMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="movie-card flex-shrink-0 snap-start w-[140px] sm:w-[160px] md:w-[200px]"
              >
                <img
                  src={`${imageUrl.medium}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[210px] sm:h-[240px] md:h-[300px] object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll(kollywoodRef, "right")}
            className="nav next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all -mr-2 sm:-mr-5"
          >
            &#10095;
          </button>
        </div>
      </section>

      <style>{`
        .slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
