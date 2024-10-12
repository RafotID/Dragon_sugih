import { useEffect, useState } from 'react'
import { attack, magic, heal, opponentStats, playerStats, wait, cakar, gigit, lari, livesteal } from '../shared'

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')


  useEffect(() => {
    const { mode, turn } = sequence

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats
      const receiver = turn === 0 ? opponentStats : playerStats
      
      setLoading(true)
      
      switch (mode) {
        case 'attack': {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });
          
          (async () => {
            console.log("Sidi Mantra memilih : " + mode)
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} menyerang ${receiver.name} dengan tinju yang dilapisi sihir`);
            await wait(2000);

            if (turn === 0) {
             
              setAnnouncerMassage(`nyawa ${attacker.name} pulih sebagian dikarenakan sihir dewa`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2300);

              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              setAnnouncerMassage(`${receiver.name} menyerang ${attacker.name} `);
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
            console.log("Sidi Mantra memilih : " + mode)
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} menyerang ${receiver.name} dengan dengan sihir dalam lonceng`);
            await wait(2200);

            if (turn === 0) {
              
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir ${attacker.name}`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2000);

              setAnnouncerMassage(`${receiver.name} menyerang ${attacker.name} `);
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
            console.log("Sidi Mantra memilih : " + mode)
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} memulihkan nyawa dengan sihir yang ada dalam lonceng`);
            await wait(2000);

            if (turn === 0) {

              setAnnouncerMassage(`Memulihkan sebagian besar nyawa`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} menyerang ${attacker.name}`);
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
            setAnnouncerMassage(`${attacker.name} mendekat dengan cepat dan menerkam ${receiver.name}`);
            await wait(2000);

            if (turn === 1) {
            
              setAnnouncerMassage(`${receiver.name} tergigit oleh ${attacker.name}`);
              await wait(1800);

              setAnnouncerMassage(`${receiver.name} berhasil melepaskan diri dari terkaman ${attacker.name}`)
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2000);

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
            setAnnouncerMassage(`${attacker.name} bersembunyi di antara pepohonan dan menyerang ${receiver.name} dengan kakinya`);
            await wait(2700);

            if (turn === 1) {
             
              setAnnouncerMassage(`${receiver.name} terkena serangan ${attacker.name}`);
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} terluka`)
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1300)

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
            setAnnouncerMassage(`${attacker.name} marah dan berlari ke arah ${receiver.name} dengan kecepatan penuh!`);
            await wait(2100);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} terpental ke pepohonan!`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} mendapatkan luka serius dari serangan tersebut `);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
              await wait(2100);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`)
              
            }
            
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
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
    loading, 
  }
}