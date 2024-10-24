import styles from './styles.module.css';
import { assets } from '../../assets/indeks';


export const EndMenu = ({ winner, onStartClick }) => {
  return (
    <div style={{backgroundImage:  `url(${assets.gambar.bgGameOver})`}} >
    <div className={styles.main}>
      <h1 className='relative font-Just-Another-Hand text-white stroke-black stroke-5 mt-[7%] text-[150px] flex justify-center shadow-black drop-shadow-xl'>Game Over</h1>
      <h1 className='relative font-jomhuria text-black stroke-black stroke-5 mt-[-4%] text-[80px] flex justify-center shadow-black drop-shadow-xl'>{winner.name} has won!</h1>
      <div className='relative flex justify-center w-screen h-full'>
      <button className='w-[35%] h-[35%] absolute flex justify-center items-center ml-96' onClick={onStartClick} 
      style={{
        backgroundImage: `url(${assets.gambar.buttonPlayAgain})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
    }}>
      </button>
      </div>
      
    </div>
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
