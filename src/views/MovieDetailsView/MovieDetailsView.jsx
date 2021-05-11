import { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import routes from '../../routes';
import moviesApi from '../../services/movies-api';
import defaultPoster from './wat.jpg'
import Cast from '../../components/Cast'
import Reviews from '../../components/Reviews'
import styles from './MovieDetailsView.module.css';

// https://image.tmdb.org/t/p/w300

class MovieDetailsView extends Component {
  state = {
    posterUrl: null,
    title: null,
    releaseYear: null,
    score: null,
    overview: null,
    genres: null,
    cast: null,
    reviews: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    moviesApi.fetchMovieById(movieId).then(({poster_path, title, release_date, vote_average, overview, genres, credits, reviews}) => {
      this.setState({
        posterUrl: poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : defaultPoster,
        title,
        releaseYear: release_date.split('-')[0],
        score: vote_average ? vote_average * 10 + '%' : 'N/A',
        overview,
        genres: genres.map(item => item.name).join(', '),
        cast: credits.cast,
        reviews: reviews.results,
      });
    });
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || routes.movies);
  };

  handleCast = () => {
  };

  render() {
    const { posterUrl, title, releaseYear, score, overview, genres, cast, reviews } = this.state;
    const { match } = this.props;
    const { location } = this.props;

    return (
      <div className={styles.container}>
        <button className={styles.btn} type="button" onClick={this.handleGoBack}>
          Go Back
        </button>
          
        <div className={styles.card}>
          <img className={styles.img} src={posterUrl} alt="Movie poster" />
          <div className={styles.thumb}>
            <h1 className={styles.title}>
              {title} ({releaseYear})
            </h1>
            <p className={styles.text}>User`s score: {score}</p>
            <h2 className={styles.subtitle}>Overview</h2>
            <p className={styles.text}>{overview}</p>
            <h2 className={styles.subtitle}>Genres</h2>
            <p className={styles.text}>{genres}</p>
          </div>
        </div>

        <h3>Additional information</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              className={styles.link}
              to={{
                pathname: `${match.url}/cast`,
                state: { from: location?.state?.from || routes.movies},
              }}
            >
              Cast
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              className={styles.link}
              to={{
                pathname: `${match.url}/reviews`,
                state: { from: location?.state?.from || routes.movies},
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Route
          path={`${match.path}/cast`}
          render={() => <Cast cast={cast} />}
        />

        <Route
          path={`${match.path}/reviews`}
          render={() => <Reviews reviews={reviews} />}
        />
      </div>
    );
  };
};

export default MovieDetailsView;