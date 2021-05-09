import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const KEY = 'a11681fbc130343b10afc879742afe20';

const fetchTrendingMovies = async () => {
  return await axios
    .get(`trending/movie/day?api_key=${KEY}`)
    .then(r => r.data.results);
};

const fetchMoviesByKeyword = async keyword => {
  return await axios
    .get(`search/movie?api_key=${KEY}&query=${keyword}`)
    .then(r => r.data.results);
};

const fetchMovieById = async id => {
  return await axios
    .get(
      `movie/${id}?api_key=${KEY}&append_to_response=credits,reviews,backdrop_path`,
    )
    .then(r => r.data);
};

export default { fetchTrendingMovies, fetchMoviesByKeyword, fetchMovieById };
