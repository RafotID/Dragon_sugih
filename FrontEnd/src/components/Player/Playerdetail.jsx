import styles from './styles.module.css'
import { Bar } from '../Bar/Bar'



export const Playerdetail = ({ main = false, name, level, health, maxHealth}) => {
    return <div 
    >
        <div className={styles.info}>
            <div className={styles.name}>{name}</div>
        </div>

        <div className={styles.health}>
            <Bar label="HP" value={health} maxValue={maxHealth}/>
        </div>
    </div>
}