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
            setAnnouncerMassage(`${attacker.name} melapisi tangannya dengan sihir `);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} berlari ke arah ${receiver.name} lalu melancarkan 1 pukulan kuat ! `);
            await wait(2500);

            if (turn === 0) {
             
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut`);
              await wait(1300);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              
              setAnnouncerMassage(`${attacker.name} menyerap sebagian energi ${receiver.name}`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2000);
              setAnnouncerMassage(`${attacker.name} memulihkan sebagian energinya`)
              setPlayerHealth(h =>
              h + recovered <= attacker.maxHealth
              ? h + recovered
              : attacker.maxHealth,
              )   
              await wait(1500)
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
            setAnnouncerMassage(`${attacker.name} melompat ke belakang , menjaga jarak dari ${receiver.name}`);
            await wait(2200);
            setAnnouncerMassage(`${attacker.name} mengeluarkan sihir yang kuat dari loncengnya !`);
            await wait(1900);

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir !`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} menderita luka akibat ledakan sihir !`);
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
            setAnnouncerMassage(`${attacker.name} melemparkan bola asap ke bawah ${receiver.name} `);
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu ! `);
            await wait(1500);
            setAnnouncerMassage(`${attacker.name} memakai kesempatan ini untuk memulihkan diri !`);
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(`${attacker.name} mengeluarkan sihir pemulihan yang kuat !`);
              await wait(1900);
              setAnnouncerMassage(`sebagian besar nyawa ${attacker.name} telah pulih !`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break
        }

        case 'gigit': {
          const damage = gigit({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} melepaskan jaring laba-laba ke arah ${receiver.name} `);
            await wait(2000);
            setAnnouncerMassage(`${receiver.name} terjebak jaring jaring tersebut !!!`);
            await wait(1500);

            if (turn === 1) {
              setAnnouncerMassage(`${attacker.name} mendekat dengan cepat lalu menerkam ${receiver.name} !`);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2000);
              setAnnouncerMassage(`${receiver.name} mengeluarkan sihir untuk melarikan diri dalam lonceng dan berhasil membebaskan diri!`)
              await wait(2700);

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
            setAnnouncerMassage(`${attacker.name} mendekati ${receiver.name} dengan cepat dan melancar serangan !`);
            await wait(2500);

            if (turn === 1) {
              
              setAnnouncerMassage(`${receiver.name} terkena serangan dari ${attacker.name}`);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1800);

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
            setAnnouncerMassage(`${attacker.name} berlari ke arah ${receiver.name} dengan kecepatan penuh` );
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} menghancur segala hal yang menghalangi jalan!` );
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} mencoba menghindar tapi gagal `);
              await wait(1500);
              
              setAnnouncerMassage(`${receiver.name} terkena serangan tersebut dan menderita cedera serius !`);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2200);
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
            setAnnouncerMassage(`${attacker.name} melapisi tangannya dengan sihir `);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} berlari ke arah ${receiver.name} lalu melancarkan 1 pukulan kuat ! `);
            await wait(2500);

            if (turn === 0) {
             
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut`);
              await wait(1300);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              
              setAnnouncerMassage(`${attacker.name} menyerap sebagian energi ${receiver.name}`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2000);
              setAnnouncerMassage(`${attacker.name} memulihkan sebagian energinya`)
              setPlayerHealth(h =>
              h + recovered <= attacker.maxHealth
              ? h + recovered
              : attacker.maxHealth,
              )   
              await wait(1500)
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
            setAnnouncerMassage(`${attacker.name} melompat ke belakang , menjaga jarak dari ${receiver.name}`);
            await wait(2200);
            setAnnouncerMassage(`${attacker.name} mengeluarkan sihir yang kuat dari loncengnya !`);
            await wait(1900);

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir !`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} menderita luka akibat ledakan sihir !`);
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
            setAnnouncerMassage(`${attacker.name} melemparkan bola asap ke bawah ${receiver.name} `);
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu ! `);
            await wait(1500);
            setAnnouncerMassage(`${attacker.name} memakai kesempatan ini untuk memulihkan diri !`);
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(`${attacker.name} mengeluarkan sihir pemulihan yang kuat !`);
              await wait(1900);
              setAnnouncerMassage(`sebagian besar nyawa ${attacker.name} telah pulih !`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break
        }

        case 'suhu': {
          const damage = suhu({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} hanya diam dan melihat ${receiver.name} dengan tatapan kosong ....`);
            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} sekilas melihat hal aneh ...`);
              await wait(2000);
              setAnnouncerMassage(`${receiver.name} tertegun sejenak ...`);
              await wait(1500);

              setAnnouncerMassage(`dikarenakan keadaan lingkungan sekitar yang panas nyawa ${receiver.name} berkurang`)
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(3000);

              setAnnouncerMassage(`${receiver.name} tersadar dan membalas ${attacker.name} `);
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
            setAnnouncerMassage(`${attacker.name} mengeluarkan aura api ke sekitar karenanya suhu disekitar meningkat drastis`);
            await wait(3000);

            if (turn === 1) {
              
              setAnnouncerMassage(`${receiver.name} tidak tahan dengan peningkatan suhu ini`);
              await wait(2000)

              setAnnouncerMassage(`Kulit ${receiver.name} terbakar oleh api`)
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
            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} mencoba menghindar tetapi gagal karena di kelilingi api !`);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(2500);

              setAnnouncerMassage(`${receiver.name} terkena serangan tersebut dan terkapar di tanah`)
              await wait(2000);
              setAnnouncerMassage(`${receiver.name} mengalami rasa sakit luar biasa karena tulang tulangnya remuk karena serangan tersebut ! `)
              await wait(3000);

              setAnnouncerMassage(`karena tekadnya yang kuat ${receiver.name} berhasil bangkit dan membalas ${attacker.name} `);
              await wait(3000);
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
            setAnnouncerMassage(`${attacker.name} melapisi tangannya dengan sihir `);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} berlari ke arah ${receiver.name} lalu melancarkan 1 pukulan kuat ! `);
            await wait(2500);

            if (turn === 0) {
             
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut`);
              await wait(1300);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              
              setAnnouncerMassage(`${attacker.name} menyerap sebagian energi ${receiver.name}`);
              await wait(2000);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${attacker.name} memulihkan sebagian energinya`)
              setPlayerHealth(h =>
              h + recovered <= attacker.maxHealth
              ? h + recovered
              : attacker.maxHealth,
              )   
              await wait(1500)
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
            setAnnouncerMassage(`${attacker.name} melompat ke belakang , menjaga jarak dari ${receiver.name}`);
            await wait(2200);
            setAnnouncerMassage(`${attacker.name} mengeluarkan sihir yang kuat dari loncengnya !`);
            await wait(1900);

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir !`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} menderita luka akibat ledakan sihir !`);
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
            setAnnouncerMassage(`${attacker.name} melemparkan bola asap ke bawah ${receiver.name} `);
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu ! `);
            await wait(1500);
            setAnnouncerMassage(`${attacker.name} memakai kesempatan ini untuk memulihkan diri !`);
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(`${attacker.name} mengeluarkan sihir pemulihan yang kuat !`);
              await wait(1900);
              setAnnouncerMassage(`sebagian besar nyawa ${attacker.name} telah pulih !`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break
        }

        case 'batu': {
          const damage = batu({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengambil batu batu disekitar dan melemparkannya ke arah ${receiver.name}`);
            await wait(2500);

            if (turn === 1) {
              
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${receiver.name} terkena lemparan batu bertubi tubi`);
              await wait(1500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${receiver.name} kesulitan menghindar !`)
              await wait(1300)
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);

              setAnnouncerMassage(`${receiver.name} akhirnya berhasil menghindar dan membalas ${attacker.name} `);
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
            setAnnouncerMassage(`${attacker.name} mengeluarkan suara nyaring yang diperkuat dengan sihir !!`);
            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak kuat mendengar teriakan tersebut !`);
              await wait(2000);
              setAnnouncerMassage(`Telinga ${receiver.name} terluka`)
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} menutupi telinganya dengan batu kecil dan membalas ${attacker.name}`);
              await wait(2500);
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
            setAnnouncerMassage(`${attacker.name} mengeluarkan serangan terkuatnya , yaitu badai salju !!!`);
            await wait(2700);
            setAnnouncerMassage(`${receiver.name} kebingungan karena tiba tiba ada badai salju !`);
            await wait(2500);

            if (turn === 1) {

              setAnnouncerMassage(`${receiver.name} terjebak di tengah badai salju tersebut `);
              await wait(2000);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${receiver.name} terhantam oleh benda benda yang berterbangan`)
              await wait(2000);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);

              setAnnouncerMassage(`${receiver.name} terkena serangan dingin dan terluka akibat benturan `)
              await wait(2000);

              setAnnouncerMassage(`${receiver.name} meneruskan pertarungan ini dan membalas ${attacker.name} `);
              await wait(1800);
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
            setAnnouncerMassage(`${attacker.name} melapisi tangannya dengan sihir `);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} berlari ke arah ${receiver.name} lalu melancarkan 1 pukulan kuat ! `);
            await wait(2500);

            if (turn === 0) {
             
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut`);
              await wait(1300);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              
              setAnnouncerMassage(`${attacker.name} menyerap sebagian energi ${receiver.name}`);
              await wait(2000);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${attacker.name} memulihkan sebagian energinya`)
              setPlayerHealth(h =>
              h + recovered <= attacker.maxHealth
              ? h + recovered
              : attacker.maxHealth,
              )   
              await wait(1500)
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
            setAnnouncerMassage(`${attacker.name} melompat ke belakang , menjaga jarak dari ${receiver.name}`);
            await wait(2200);
            setAnnouncerMassage(`${attacker.name} mengeluarkan sihir yang kuat dari loncengnya !`);
            await wait(1900);

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir !`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} menderita luka akibat ledakan sihir !`);
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
            setAnnouncerMassage(`${attacker.name} melemparkan bola asap ke arah ${receiver.name} `);
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu ! `);
            await wait(1500);
            setAnnouncerMassage(`${attacker.name} memakai kesempatan ini untuk memulihkan diri !`);
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(`${attacker.name} mengeluarkan sihir pemulihan yang kuat !`);
              await wait(1900);
              setAnnouncerMassage(`sebagian besar nyawa ${attacker.name} telah pulih !`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break
        }

        case 'air': {
          const damage = air({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengendalikan air disekitarnya dan melancarkan serangan kepada ${receiver.name}`);
            await wait(3000);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} terkena tembakan air bertubi tubi`);
              await wait(1500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${receiver.name} kesulitan menghindar !`)
              await wait(1500)
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);

              setAnnouncerMassage(`sebuah celah telah terlihat ! ${receiver.name} mengambil kesempatan dan membalas ${attacker.name} `);
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
            setAnnouncerMassage(`${attacker.name} bersiap melakukan serangan `);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} bergerak dengan kecepatan tinggi ke arah ${receiver.name}`);
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} bersiap menghadapi serangan ${attacker.name}`);
              await wait(2000);
              setAnnouncerMassage(`${attacker.name} melancarkan serangan bertubi tubi`);
              await wait(2000);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${receiver.name} terpental ke rawa dan bangun kembali !`)
              await wait(2000)
              
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
            setAnnouncerMassage(`${attacker.name} menyelam ke dalam rawa !!!`);
            await wait(1000);

            if (turn === 1) {
              setAnnouncerMassage(`${attacker.name} menyerap energi di dalam rawa `);
              await wait(1500)
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
            setAnnouncerMassage(`${attacker.name} melapisi tangannya dengan sihir `);
            await wait(2000);
            setAnnouncerMassage(`${attacker.name} berlari ke arah ${receiver.name} lalu melancarkan 1 pukulan kuat ! `);
            await wait(2500);

            if (turn === 0) {
             
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut`);
              await wait(1300);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              
              setAnnouncerMassage(`${attacker.name} menyerap sebagian energi ${receiver.name}`);
              await wait(2000);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(500);
              setAnnouncerMassage(`${attacker.name} memulihkan sebagian energinya`)
              setPlayerHealth(h =>
              h + recovered <= attacker.maxHealth
              ? h + recovered
              : attacker.maxHealth,
              )   
              await wait(1500)
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
            setAnnouncerMassage(`${attacker.name} melompat ke belakang , menjaga jarak dari ${receiver.name}`);
            await wait(2200);
            setAnnouncerMassage(`${attacker.name} mengeluarkan sihir yang kuat dari loncengnya !`);
            await wait(1900);

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir !`);
              setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} menderita luka akibat ledakan sihir !`);
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
            setAnnouncerMassage(`${attacker.name} melemparkan bola asap ke bawah ${receiver.name} `);
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu ! `);
            await wait(1500);
            setAnnouncerMassage(`${attacker.name} memakai kesempatan ini untuk memulihkan diri !`);
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(`${attacker.name} mengeluarkan sihir pemulihan yang kuat !`);
              await wait(1900);
              setAnnouncerMassage(`sebagian besar nyawa ${attacker.name} telah pulih !`);
              setPlayerHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break
        }

        case 'tendangan': {
          const damage = tendangan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} berlari dengan kecepatan kilat langsung mengarah kepada ${receiver.name}`);
            await wait(3500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak dapat bereaksi !!!`);
              await wait(1200);
           
              setAnnouncerMassage(`${attacker.name} melakukan tendangan dengan kecepatan penuh ke arah ${receiver.name}  `);
              await wait(2500);
              
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(750);
              setAnnouncerMassage(`${receiver.name} terpental kebelakang dan menghantam batu dibelakangnya !`)
              await wait(2000)
              
              setAnnouncerMassage(`${receiver.name} hampir kehilangan kesadaran akibat serangan tersebut`)
              await wait(2000)

              setAnnouncerMassage(`${receiver.name} bangkit lagi dan membalas ${attacker.name} `);
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
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
              setPlayerHealth(h => (h - damage > 0 ? h - damage : 0))
              await wait(200);
             
              setAnnouncerMassage(`${receiver.name} melancarkan 1 serangan mengarah tepat ke kepala ${attacker.name}`)
              await wait(2000)
              
              setAnnouncerMassage(`${attacker.name} terpental ke belakang ! `);
              await wait(1500);
              
              setPlayerAnimation('static')
              setAnnouncerMassage(`${receiver.name} bersiap membalas ${attacker.name} `);
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
            setAnnouncerMassage(`${attacker.name} mengaum ke langit malam`);
            await wait(1500);

            setAnnouncerMassage(`entah kenapa ${receiver.name} tidak dapat bergerak `);
            await wait(1500);

            setAnnouncerMassage(`cahaya bulan menerangi tempat dimana ${attacker.name} berada !!! `);
            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} terkejut dengan apa yang ia lihat `);
              await wait(1500);

              setAnnouncerMassage(`${attacker.name} memulihkan sebagian nyawanya`);
              setOpponentHealth(h =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              )
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} akhirnya bisa bergerak dan membalas ${attacker.name}`);
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