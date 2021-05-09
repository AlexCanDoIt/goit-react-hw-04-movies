import defaultImage from './wat.jpg'
import styles from './Cast.module.css'

const Cast = ({ cast }) => {
  const isProfileImage = profile =>
    profile ? `https://image.tmdb.org/t/p/w200${profile}` : defaultImage;

  return (
    cast && <ul className={styles.castsList}>
      {cast.map(({ cast_id, name, profile_path }) => (
        <li key={cast_id} className={styles.castCard}>
          <img
            className={styles.castCardImage}
            src={isProfileImage(profile_path)}
            alt={`Profile ${name}`}
            width={200}
            height={300}
          />
          <h3 className={styles.castCardName}>{name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default Cast;