import { useEffect, useState } from 'react'
import { attack, magic, heal, GiantSpider, Player, wait } from '../shared'

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(GiantSpider.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { mode, turn } = sequence
    if (mode) {
      const attacker = turn === 0 ? Player : GiantSpider
      const receiver = turn === 0 ? GiantSpider : Player

      switch (mode) {
        case 'attack': {
          const damage = attack({ attacker, receiver });
          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} menyerang ${receiver.name}`);
            await wait(1000);

            turn === 0 ? setPlayerAnimation('attack') : setOpponentAnimation('attack');
            await wait(100);

            turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');
            await wait(500);

            turn === 0 ? setOpponentAnimation('damage') : setPlayerAnimation('damage');
            await wait(750);

            turn === 0 ? setOpponentAnimation('static') : setPlayerAnimation('static');
            setAnnouncerMassage(`${receiver.name} terluka`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
            await wait(2000);

            setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();
          break;
        }

        case 'magic': {
          const damage = magic({ attacker, receiver });
          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} merapal mantra dan menyerang`);
            await wait(1000);

            turn === 0 ? setPlayerAnimation('magic') : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');
            await wait(500);

            turn === 0 ? setOpponentAnimation('damage') : setPlayerAnimation('damage');
            await wait(750);

            turn === 0 ? setOpponentAnimation('static') : setPlayerAnimation('static');
            setAnnouncerMassage(`${receiver.name} tidak tahu apa yang menyerang (kena sihir)`);
            turn === 0
              ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
            await wait(2500);

            setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();
          break;
        }

        case 'heal': {
          const recovered = heal({ receiver: attacker });
          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} memulihkan nyawa`);
            await wait(1000);

            turn === 0 ? setPlayerAnimation('magic') : setOpponentAnimation('magic');
            await wait(1000);

            turn === 0 ? setPlayerAnimation('static') : setOpponentAnimation('static');
            await wait(500);

            setAnnouncerMassage(`Nyawa ${attacker.name} pulih sebagian`);
            turn === 0
              ? setPlayerHealth(h => (h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth))
              : setOpponentHealth(h => (h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth));
            await wait(2500);

            setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
            await wait(1500);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();
          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
    loading,
  };
}
