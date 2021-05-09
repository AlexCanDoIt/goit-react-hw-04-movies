import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css'

const MovieList = ({ movies, location }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          <Link
            className={styles.link}
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  location: PropTypes.object.isRequired,
};


export default withRouter(MovieList);