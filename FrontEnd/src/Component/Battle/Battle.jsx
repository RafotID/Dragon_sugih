import styles from './styles.module.css'
import {useEffect, useState} from 'react'
import { Playerdetail } from '../Player/Playerdetail'
import { playerStats, opponentStats, wait} from '../../shared'
import { BattleMenu } from '../BattleMenu/BattleMenu'
import { BattleAnnouncer } from '../BattleAnnouncer'
import { useBattleSequence } from '../../hooks'
import { useAIOpponents} from '../../hooks'

export const Battle1 = ({onGameEnd}) => {

    const [sequence, setSequence] = useState({})

    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        annaouncerMessage,
        playerAnimation,
        opponentAnimation
    } = useBattleSequence(sequence)

    const aiChoice = useAIOpponents(turn)

    useEffect(() => {
        
        if(aiChoice && turn === 1 && !inSequence){
            setSequence({turn, mode: aiChoice})
        }
    }, [turn, aiChoice, inSequence])

    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0 ) {
            (async() => {
                await wait(1000)
                onGameEnd(playerHealth === 0 ? opponentStats : playerStats)
            })()
        }
    }, [playerHealth, opponentHealth, onGameEnd])

    return(
    < >
        <div className={styles.opponent}>
            <div className={styles.summary}>
                <Playerdetail 
                health={opponentHealth}
                name={opponentStats.name}
                level={opponentStats.level}
                maxHealth={opponentStats.maxHealth}
                />
            </div>
        </div>

        <div className={styles.characters}>
            <div className={styles.gameHeader}>
                {playerStats.name} VS {opponentStats.name}
            </div>

            <div className={styles.gameImages}>
                <div className={styles.playerSprite}>
                    <img 
                    alt={playerStats.name}
                    src={playerStats.img}
                    className={styles[playerAnimation]}
                    />
                </div>

                <div className={styles.opponentSprite}>
                    <img
                    alt={opponentStats.name}
                    src={opponentStats.img}
                    className={styles[opponentAnimation]}
                    />
                </div>
            </div>
        </div>

        <div className={styles.user}>
            <div className={styles.summary}>
                <Playerdetail 
                main
                health={playerHealth}
                name={playerStats.name}
                level={playerStats.level}
                maxHealth={playerStats.maxHealth}
                />
            </div>
        </div>

        <div className={styles.hud}>

        <div className={styles.hudChild}>
            <BattleAnnouncer 
            message={annaouncerMessage || `apa yang dilakukan ${playerStats.name} ?`}
            />
        </div>

        <div className={styles.hudChild}>
            <BattleMenu 
            onAttack={() => setSequence({ mode: 'attack', turn})}
            onMagic={() => setSequence({ mode: 'magic', turn})}
            onHeal={() => setSequence({ mode:'heal', turn})}
            />
        </div>
        </div>
    </>
    )    
}