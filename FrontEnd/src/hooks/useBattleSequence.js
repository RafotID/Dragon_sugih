import { useEffect, useState } from 'react'
import { attack, magic, heal, opponentStats, playerStats, wait, cakar, gigit, lari, livesteal } from '../shared'

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  // const [isActionInProgress, setIsActionInProgress] = useState(false); 
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence
    console.log("menyerang: " + mode)

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats
      const receiver = turn === 0 ? opponentStats : playerStats
      console.log(loading)
      setLoading(true)
      console.log(loading)
      switch (mode) {
        case 'attack': {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });
          (async () => {
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} menyerang ${receiver.name} dengan tinju yang dilapisi sihir`);
            await wait(1000);

            if (turn === 0) {
              setPlayerAnimation('attack')
              await wait(100);

              setPlayerAnimation('static')
              await wait(500);

              setOpponentAnimation('damage')
              await wait(750);

              setOpponentAnimation('static')
              setAnnouncerMassage(`${receiver.name} terluka`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);

              setOpponentAnimation('static')
              setAnnouncerMassage(`Memulihkan sebagian kecil nyawa`)
              await wait(1500)

              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }
            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);

          })();

          break;
        }

        case 'magic': {
          const damage = magic({ attacker, receiver });

          (async () => {
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} menyerang ${receiver.name} dengan sihir`);
            await wait(1000);

            if (turn === 0) {
              setPlayerAnimation('attack')
              await wait(100);

              setPlayerAnimation('static')
              await wait(500);

              setOpponentAnimation('damage')
              await wait(750);

              setOpponentAnimation('static')
              setAnnouncerMassage(`${receiver.name} terkena sihir`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'heal': {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} memulihkan nyawa`);
            await wait(1000);

            if (turn === 0) {
              setPlayerAnimation('magic')
              await wait(1000);

              setPlayerAnimation('static')
              await wait(500);

              setAnnouncerMassage(`Nyawa ${attacker.name} pulih sebagian`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case 'gigit': {
          const damage = gigit({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengigit ${receiver.name}`);
            await wait(1000);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);

              setOpponentAnimation('static')
              await wait(500);

              setPlayerAnimation('damage')
              await wait(750);

              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} tergigit oleh ${attacker.name}`);

              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'cakar': {
          const damage = cakar({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mencakar ${receiver.name}`);
            await wait(1000);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);

              setOpponentAnimation('static')
              await wait(500);

              setPlayerAnimation('damage')
              await wait(750);

              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} terkena cakaran ${attacker.name}`);

              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'lari': {
          const damage = lari({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} berlari dan menerjang ${receiver.name}`);
            await wait(1000);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);

              setOpponentAnimation('static')
              await wait(500);

              setPlayerAnimation('damage')
              await wait(750);

              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} terluka parah`);

              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }
        default:
          break
      }
    }
  }, [sequence])

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
    loading
  }
}