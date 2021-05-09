import styles from './Reviews.module.css'

const Reviews = ({ reviews }) => {
  return reviews && reviews.length ? (
    <ul className={styles.reviewsList}>
      {reviews.map(({ id, content, author }) => (
        <li key={id} className={styles.reviewsItem}>
          <h3 className={styles.reviewsTitle}>{author}</h3>
          <p className={styles.reviewsText}>{content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.noReviews}>No reviews yet</p>
  );
};

export default Reviews;