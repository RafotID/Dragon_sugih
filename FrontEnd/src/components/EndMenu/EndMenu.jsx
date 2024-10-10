import styles from './styles.module.css';

export const EndMenu = ({ onStartClick }) => {
  return (
    <div className={styles.main}>
      <h1>Sidi Mantra Kalah</h1>
      <button className={styles.startButton} onClick={onStartClick}>
        Kembali bertarung
      </button>
    </div>
  );
};
