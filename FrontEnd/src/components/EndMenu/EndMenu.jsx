import styles from './styles.module.css';

export const EndMenu = ({ winner, onStartClick }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={onStartClick}>
        Play Again
      </button>
    </div>
  );
};
export const EndMenu2 = ({ winner, onStartClick2 }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={onStartClick2}>
        Play Again
      </button>
    </div>
  );
};
export const EndMenu3 = ({ winner, onStartClick3 }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={onStartClick3}>
        Play Again
      </button>
    </div>
  );
};
export const EndMenu4 = ({ winner, onStartClick4 }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={onStartClick4}>
        Play Again
      </button>
    </div>
  );
};
export const EndMenu5 = ({ winner, onStartClick5 }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={onStartClick5}>
        Play Again
      </button>
    </div>
  );
};
