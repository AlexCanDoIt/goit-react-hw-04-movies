import { Component } from 'react';
import moviesApi from '../../services/movies-api';
import MovieList from '../../components/MovieList';
import styles from './MoviesView.module.css';

class MoviesView extends Component {
  state = {
    query: '',
    movies: [],
  };

  componentDidMount() {
    const moviesStorage = JSON.parse(sessionStorage.getItem('movies'));

    if (moviesStorage && moviesStorage.length) {
      this.setState({
        movies: moviesStorage,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies) {
      sessionStorage.setItem(
        'movies',
        JSON.stringify(this.state.movies),
      );
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      query: target.value.trim(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;

    query.length && moviesApi.fetchMoviesByKeyword(query).then(response => {
      this.setState({
        query: '',
        movies: response,
      });
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            value={this.state.query}
            type="text"
            placeholder="Search Movie"
            autoComplete="off"
            autoFocus
            onChange={this.handleChange}
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
        {this.state.movies && <MovieList movies={this.state.movies} />}
      </div>
    );
  }
}

export default MoviesView;