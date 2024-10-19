import { useEffect, useState } from 'react'
import { attack, magic, heal, GiantSpider, MonsterApi, MonsterEs, Player, wait, cakar, gigit, lari, livesteal, suhu, suhuTinggi, tinjuan, batu, teriakan, badaiSalju, Buaya, air, pukulan, adaptasi, Serigala, tendangan, cakaran, auman} from '../shared'

export const useBattleSequence = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  // const [isActionInProgress, setIsActionInProgress] = useState(false); 
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(GiantSpider.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence
    console.log("menyerang: " + mode)

    if (mode) {
      const attacker = turn === 0 ? Player : GiantSpider
      const receiver = turn === 0 ? GiantSpider : Player
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

export const useBattleSequence2 = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(MonsterApi.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence
    console.log("menyerang: " + mode)

    if (mode) {
      const attacker = turn === 0 ? Player : MonsterApi
      const receiver = turn === 0 ? MonsterApi: Player
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

        case 'suhu': {
          const damage = suhu({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} hanya diam melihat ${receiver.name}`);
            await wait(2000);

            if (turn === 1) {

              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} tidak tahan dengan panas ini !`);

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

        case 'suhuTinggi': {
          const damage = suhuTinggi({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengeluarkan aura api , suhu disekitar ${receiver.name} mulai naik`);
            await wait(2000);

            if (turn === 1) {
              
              setAnnouncerMassage(`Suhu di sekitar ${receiver.name} naik drastis untuk beberapa saat`);
              await wait(2000)

              setPlayerAnimation('damage')
              await wait(750);
              setPlayerAnimation('static')
              setAnnouncerMassage(`Kulit ${receiver.name} mulai meleleh secara perlahan`)
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

        case 'tinjuan': {
          const damage = tinjuan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} bergerak menuju ${receiver.name} dan melayangkan 1 pukulan yang sangat kuat`);
            await wait(2300);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);

              setOpponentAnimation('static')
              await wait(500);

              setPlayerAnimation('damage')
              await wait(750);

              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} terhantam serangan tersebut hingga membuat tanah bergetar`);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2000);

              setAnnouncerMassage(`${receiver.name} mengalami cedera serius`)
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

export const useBattleSequence3 = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(MonsterEs.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence
    console.log("menyerang: " + mode)

    if (mode) {
      const attacker = turn === 0 ? Player : MonsterEs
      const receiver = turn === 0 ? MonsterEs: Player
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

        case 'batu': {
          const damage = batu({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengambil batu batu disekitar lalu melemparkan ke arah ${receiver.name}`);
            await wait(2000);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);
              setOpponentAnimation('static')
              await wait(500);
              
              setAnnouncerMassage(`${receiver.name} terkena lemparan batu bertubi tubi`);
              await wait(1000);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setAnnouncerMassage(`${receiver.name} kesulitan menghindar !`)
              await wait(1500)
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              
              setPlayerAnimation('static')

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'teriakan': {
          const damage = teriakan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} berteriak dengan kekuatan penuh !!!!`);
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak kuat mendengar teriakan tersebut !`);
              await wait(2000)

              setPlayerAnimation('damage')
              await wait(750);

              setPlayerAnimation('static')
              setAnnouncerMassage(`Telinga ${receiver.name} terluka`)
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

        case 'badaiSalju':{
          const damage = badaiSalju({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} memanggil badai salju yang sangat kuat !!! `);
            await wait(2300);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);
              
              setOpponentAnimation('static')
              await wait(500);
              setAnnouncerMassage(`${receiver.name} terjebak di tengah badai salju tersebut `);
              await wait(1500);

              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${receiver.name} terhantam oleh benda benda yang berterbangan`)
              await wait(1500);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              
              setPlayerAnimation('static')
              
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

export const useBattleSequence4 = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(Buaya.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence
    console.log("menyerang: " + mode)

    if (mode) {
      const attacker = turn === 0 ? Player : Buaya
      const receiver = turn === 0 ? Buaya: Player
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

        case 'air': {
          const damage = air({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengendalikan air disekitarnya dan melancarkan serangan kepada${receiver.name}`);
            await wait(2000);

            if (turn === 1) {
              setOpponentAnimation('attack')
              await wait(100);
              setOpponentAnimation('static')
              await wait(500);
              
              setAnnouncerMassage(`${receiver.name} terkena tembakan air bertubi tubi`);
              await wait(1000);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setAnnouncerMassage(`${receiver.name} kesulitan menghindar !`)
              await wait(1500)
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              
              setPlayerAnimation('static')

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'pukulan': {
          const damage = pukulan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengeluarkan aura dingin disekitarnya !`);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} bergerak dengan kecepatan tinggi ke arah ${receiver.name}`);
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tertegun karena ${attacker.name} tiba tiba menghilang !`);
              await wait(2000);
              setAnnouncerMassage(`${attacker.name} melancarkan serangan bertubi tubi`);
              await wait(2000);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setPlayerAnimation('damage')
              await wait(1000);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setAnnouncerMassage(`${receiver.name} terpental ke rawa dan bangun kembali !`)
              await wait(1500)
              
              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'adaptasi': {
          const recovered = adaptasi({ receiver: attacker });

          (async () => {
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} beradaptasi dengan lingkungan sekitarnya `);
            await wait(1000);

            if (turn === 1) {
              setOpponentAnimation('magic')
              await wait(1000);

              setOpponentAnimation('static')
              await wait(500);

              setAnnouncerMassage(`${attacker.name} memulihkan sebagian nyawanya`);
              setOpponentHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
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

export const useBattleSequence5 = sequence => {
  const [turn, setTurn] = useState(0)
  const [inSequence, setInSequence] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth)
  const [opponentHealth, setOpponentHealth] = useState(Serigala.maxHealth)
  const [announcerMessage, setAnnouncerMassage] = useState('')
  const [playerAnimation, setPlayerAnimation] = useState('static')
  const [opponentAnimation, setOpponentAnimation] = useState('static')

  useEffect(() => {
    const { mode, turn } = sequence
    console.log("menyerang: " + mode)

    if (mode) {
      const attacker = turn === 0 ? Player : Serigala
      const receiver = turn === 0 ? Serigala: Player
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

        case 'tendangan': {
          const damage = tendangan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} berlari dengan kecepatan hampir secepat cahaya dan mengarah kepada ${receiver.name}`);
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak dapat bereaksi !!!`);
              await wait(1200);
              
              setOpponentAnimation('attack')
              await wait(500);
              setOpponentAnimation('static')
              await wait(500);
              setAnnouncerMassage(`${attacker.name} melakukan tendangan dengan kecepatan penuh ke arah ${receiver.name}  `);
              await wait(1200);
              
              setPlayerAnimation('damage')
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setAnnouncerMassage(`${receiver.name} terpental kebelakang dan mengenai batu dibelakang !`)
              await wait(1500)
              
              setAnnouncerMassage(`Batu tersebut hancur ......`)
              await wait(1000)

              setPlayerAnimation('static')

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'cakaran': {
          const damage = cakaran({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} bergerak dengan sangat cepat !`);
            await wait(1500);
            setAnnouncerMassage(`${attacker.name} berlari mengelilingi ${receiver.name}`);
            await wait(1500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} bersiap menghadapi ${attacker.name}`);
              await wait(2000);
              setAnnouncerMassage(`${attacker.name} melancarkan serangan bertubi tubi`);
              await wait(2000);
              setPlayerAnimation('damage')
              await wait(20);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(20);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(20);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(20);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(20);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('damage')
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerAnimation('static')
             
              setAnnouncerMassage(`${receiver.name} melancarkan 1 serangan mengarah tepat ke kepala ${attacker.name}`)
              await wait(1500)

              setPlayerAnimation('attack')
              await wait(200);

              setPlayerAnimation('static')
              await wait(500);

              setOpponentAnimation('damage')
              await wait(750);
              setOpponentAnimation('static')
              
              setAnnouncerMassage(`${attacker.name} terpental ke belakang ! `);
              await wait(1500);
              
              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name} `);
              await wait(1500);
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false)
          })();

          break;
        }

        case 'auman': {
          const recovered = auman({ receiver: attacker });

          (async () => {
            setLoading(true)
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengaum dengan keras ?`);
            await wait(1500);

            setAnnouncerMassage(`${receiver.name} tertegun melihat kejadian ini !`);
            await wait(1500);

            setAnnouncerMassage(`cahaya bulan menerangi tempat dimana ${attacker.name} berada !!! `);
            await wait(2000);

            if (turn === 1) {
              setOpponentAnimation('magic')
              await wait(1000);

              setOpponentAnimation('static')
              await wait(500);

              setAnnouncerMassage(`${attacker.name} memulihkan sebagian nyawanya`);
              setOpponentHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);


              setAnnouncerMassage(`${receiver.name} tidak bisa memahami apa yang sedang terjadi`);
              await wait(2000);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
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