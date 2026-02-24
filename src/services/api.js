import axios from 'axios';

const API_KEY = '4cc8fcb07596d41436fc0026a4fe0258';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/';

export const imageUrl = {
  small: `${IMG_BASE_URL}w200`,
  medium: `${IMG_BASE_URL}w500`,
  large: `${IMG_BASE_URL}w780`,
  original: `${IMG_BASE_URL}original`,
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchMoviesByFilters = async (filters) => {
  try {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
    
    if (filters.genre) url += `&with_genres=${filters.genre}`;
    if (filters.year) url += `&primary_release_year=${filters.year}`;
    if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
    if (filters.sortBy) url += `&sort_by=${filters.sortBy}`;
    if (filters.language) url += `&with_original_language=${filters.language}`;
    
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching filtered movies:', error);
    return [];
  }
};

// ✅ THIS IS THE FUNCTION YOUR MovieDetailPage NEEDS!
export const fetchMovieDetails = async (movieId) => {
  try {
    const [detailsResponse, creditsResponse] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
      axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    ]);
    
    return {
      ...detailsResponse.data,
      cast: creditsResponse.data.cast.slice(0, 10),
      crew: creditsResponse.data.crew
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
