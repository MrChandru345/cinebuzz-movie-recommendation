import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api';

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative w-full bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 border border-transparent hover:border-purple-500"
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={movie.poster_path 
            ? `${imageUrl.medium}${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Movie Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-xs line-clamp-2 mb-1">{movie.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-400">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="text-xs text-gray-300">{movie.release_date?.split('-')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
