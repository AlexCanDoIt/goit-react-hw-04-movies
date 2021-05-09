import Navigation from '../Navigation';
import styles from './AppBar.module.css';

const AppBar = () => (
    <header className={styles.section}>
      <div className={styles.container}>
        <Navigation />
      </div>
    </header>
  );

export default AppBar;