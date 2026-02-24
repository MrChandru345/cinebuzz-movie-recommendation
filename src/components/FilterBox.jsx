import { useState } from 'react';

const FilterBox = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity.desc',
    language: ''
  });

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' }
  ];

  const languages = [
    { code: '', name: 'All Languages' },
    { code: 'en', name: 'Hollywood (English)' },
    { code: 'hi', name: 'Bollywood (Hindi)' },
    { code: 'ta', name: 'Kollywood (Tamil)' },
    { code: 'te', name: 'Tollywood (Telugu)' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ko', name: 'Korean' },
    { code: 'ja', name: 'Japanese' }
  ];

  const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

  const handleChange = (key, value) => {
    const updated = { ...selectedFilters, [key]: value };
    setSelectedFilters(updated);
    
    // Only send non-empty values
    const clean = {};
    Object.keys(updated).forEach(k => {
      if (updated[k] && updated[k] !== '') {
        clean[k] = updated[k];
      }
    });
    
    onFilterChange(clean);
  };

  const handleReset = () => {
    const defaults = {
      genre: '',
      year: '',
      rating: '',
      sortBy: 'popularity.desc',
      language: ''
    };
    setSelectedFilters(defaults);
    onFilterChange({ sortBy: 'popularity.desc' });
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl shadow-2xl mb-8 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white border-l-4 border-red-500 pl-4">
          Filter Movies
        </h2>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
        >
          <i className='bx bx-reset'></i> Reset
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Language */}
        <div>
          <label className="block text-white mb-2 font-semibold text-sm">
            <i className='bx bx-world'></i> Language
          </label>
          <select 
            value={selectedFilters.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-white mb-2 font-semibold text-sm">
            <i className='bx bx-category'></i> Genre
          </label>
          <select 
            value={selectedFilters.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-white mb-2 font-semibold text-sm">
            <i className='bx bx-calendar'></i> Year
          </label>
          <select 
            value={selectedFilters.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-white mb-2 font-semibold text-sm">
            <i className='bx bxs-star'></i> Rating
          </label>
          <select 
            value={selectedFilters.rating}
            onChange={(e) => handleChange('rating', e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-white mb-2 font-semibold text-sm">
            <i className='bx bx-sort'></i> Sort
          </label>
          <select 
            value={selectedFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="popularity.desc">Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="release_date.desc">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
