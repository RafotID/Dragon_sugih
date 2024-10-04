import {useEffect, useState} from 'react'
import { attack, magic, heal,  opponentStats, playerStats, wait } from '../shared'

export const useBattleSequence = sequence => {
    const [turn, setTurn] = useState(0)
    const [inSequence, setInSequence] = useState(false)
    const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth)
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth)
    const [annaouncerMessage, setAnnouncerMassage] = useState('')
    const [playerAnimation, setPlayerAnimation] = useState('static')
    const [opponentAnimation, setOpponentAnimation] = useState('static')

    useEffect(() => {
        const { mode, turn } = sequence

        if(mode) {

            const attacker = turn === 0 ? playerStats : opponentStats
            const receiver = turn === 0 ? opponentStats : playerStats

            switch(mode) {
                case 'attack': {
                    const damage = attack({ attacker, receiver });
          
                    (async () => {
                      setInSequence(true);
                      setAnnouncerMassage(`${attacker.name} menyerang ${receiver.name}`);
                      await wait(1000);
          
                      turn === 0
                        ? setPlayerAnimation('attack')
                        : setOpponentAnimation('attack');
                      await wait(100);
          
                      turn === 0
                        ? setPlayerAnimation('static')
                        : setOpponentAnimation('static');
                      await wait(500);
          
                      turn === 0
                        ? setOpponentAnimation('damage')
                        : setPlayerAnimation('damage');
                      await wait(750);
          
                      turn === 0
                        ? setOpponentAnimation('static')
                        : setPlayerAnimation('static');
                      setAnnouncerMassage(`${receiver.name} terluka`);
                      turn === 0
                        ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
                        : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
                      await wait(2000);
          
                      setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
                      await wait(1500);
          
                      setTurn(turn === 0 ? 1 : 0);
                      setInSequence(false);
                    })();
          
                    break;
                  }

                case 'magic': {
                    const damage = magic({ attacker, receiver });
          
                    (async () => {
                      setInSequence(true);
                      setAnnouncerMassage(`${attacker.name} merapal mantra dan menyerang`);
                      await wait(1000);
          
                      turn === 0
                        ? setPlayerAnimation('magic')
                        : setOpponentAnimation('magic');
                      await wait(1000);
          
                      turn === 0
                        ? setPlayerAnimation('static')
                        : setOpponentAnimation('static');
                      await wait(500);
          
                      turn === 0
                        ? setOpponentAnimation('damage')
                        : setPlayerAnimation('damage');
                      await wait(750);
          
                      turn === 0
                        ? setOpponentAnimation('static')
                        : setPlayerAnimation('static');
                      setAnnouncerMassage(
                        `${receiver.name} tidak tahu apa yang menyerang (kena sihir)`,
                      );
                      turn === 0
                        ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
                        : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
                      await wait(2500);
          
                      setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`) 
                      await wait(1500);
          
                      setTurn(turn === 0 ? 1 : 0);
                      setInSequence(false);
                    })();
          
                    break;
                  }

                  case 'heal': {
                    const recovered = heal({ receiver: attacker });
          
                    (async () => {
                      setInSequence(true);
                      setAnnouncerMassage(`${attacker.name} memulihkan nyawa`);
                      await wait(1000);
          
                      turn === 0
                        ? setPlayerAnimation('magic')
                        : setOpponentAnimation('magic');
                      await wait(1000);
          
                      turn === 0
                        ? setPlayerAnimation('static')
                        : setOpponentAnimation('static');
                      await wait(500);
          
                      setAnnouncerMassage(`Nyawa ${attacker.name} pulih sebagian`);
                      turn === 0
                        ? setPlayerHealth(h =>
                            h + recovered <= attacker.maxHealth
                              ? h + recovered
                              : attacker.maxHealth,
                          )
                        : setOpponentHealth(h =>
                            h + recovered <= attacker.maxHealth
                              ? h + recovered
                              : attacker.maxHealth,
                          ); // We don't want to set HP more than the max
                      await wait(2500);
          
                      setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
                      await wait(1500);
          
                      setTurn(turn === 0 ? 1 : 0);
                      setInSequence(false);
                    })();
          
                    break;
                  }

                default:
                break
            }
        }
    }, [sequence])

    return{
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        annaouncerMessage,
        playerAnimation,
        opponentAnimation
    }
}