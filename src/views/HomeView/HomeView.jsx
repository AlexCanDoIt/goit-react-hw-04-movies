import { Component } from 'react';
import moviesApi from '../../services/movies-api';
import MovieList from '../../components/MovieList';
import styles from './HomeView.module.css'

class HomeView extends Component {
  state = {
    movies: [],
  }

  componentDidMount() {
    moviesApi.fetchTrendingMovies().then(movies => {
      this.setState({ movies });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Trending today</h1>
        <MovieList movies={this.state.movies}/>
      </div>
    );
  }
};

export default HomeView;