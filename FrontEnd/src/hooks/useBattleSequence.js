import { useEffect, useState } from "react";
import {
  attack,
  magic,
  heal,
  GiantSpider,
  MonsterApi,
  MonsterEs,
  Player,
  wait,
  cakar,
  gigit,
  lari,
  livesteal,
  suhu,
  suhuTinggi,
  tinjuan,
  batu,
  teriakan,
  badaiSalju,
  Buaya,
  air,
  pukulan,
  adaptasi,
  Serigala,
  tendangan,
  cakaran,
  auman,
} from "../shared";

import backSoundAttack from "../assets/backSoundAttack.mp3"; //sound effek player
import backSoundMagic from "../assets/backSoundMagic.mp3"; //sound effek player
import backSoundHeal from "../assets/backSoundHeal.mp3"; //sound effek player
import backSoundTerkenaDamage from "../assets/backSoundTerkenaDamage.mp3"; //sound effek player terkena damage

import backSoundDamageBertubi from "../assets/backSoundDamageBertubi.mp3"; //sound effek serangan bertubi-tubi
import backSoundAumanEs from "../assets/backSoundAumanEs.mp3"; //sound effek auman frostar
import backSoundBadaiSalju from "../assets/backSoundBadaiSalju.mp3"; //sound effek auman frostar
import backSoundMonster from "../assets/backSoundMonster.mp3"; //sound effek auman frostar
import backSoundApiBesar from "../assets/backSoundApiBesar.mp3"; //sound effek auman Apiar
import backSoundAir from "../assets/backSoundAir.mp3"; //sound effek auman Crockar
import backSoundAumanSerigala from "../assets/backSoundAumanSerigala.mp3"; //sound effek auman Lupor

import backSoundaAllmonster from "../assets/backSoundaAllmonster.mp3"; //sound effek all monster
import backSoundaAllmonster2 from "../assets/backSoundaAllmonster2.mp3"; //sound effek all monster

export const useBattleSequence = (sequence) => { //selesai
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  // const [isActionInProgress, setIsActionInProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(GiantSpider.maxHealth);
  const [announcerMessage, setAnnouncerMassage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn } = sequence;
    console.log("menyerang: " + mode);

    if (mode) {
      const attacker = turn === 0 ? Player : GiantSpider;
      const receiver = turn === 0 ? GiantSpider : Player;
      console.log(loading);
      setLoading(true);
      console.log(loading);

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              ` ${attacker.name} melapisi tangannya dengan sihir...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} berlari ke arah ${receiver.name}, bersiap melancarkan pukulan kuat...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} melancarkan pukulan yang sangat kuat!`
            );

            if (attacker === Player) {
              setPlayerAnimation("attackP");
            } else {
              setOpponentAnimation("attack");
            }
            await wait(250);
            const sound = new Audio(backSoundAttack); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }
            await wait(2500);
            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut!`);
              await wait(1000);

              if (receiver === Player) {
                setPlayerAnimation("damage");
              } else {
                setOpponentAnimation("damage");
              }
              await wait(300);
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              if (receiver === Player) {
                setPlayerAnimation("static");
              } else {
                setOpponentAnimation("static");
              }

              setAnnouncerMassage(
                `${attacker.name} menyerap sebagian energi dari ${receiver.name}...`
              );
              await wait(2500);

              setAnnouncerMassage(
                ` ${attacker.name} memulihkan sebagian energinya!`
              );
              await wait(2500);

              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth
              );
              await wait(2000);

              setAnnouncerMassage(
                ` ${receiver.name} segera membalas serangan ${attacker.name}!`
              );
              await wait(2000);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "magic": {
          const damage = magic({ attacker, receiver });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} melompat ke belakang, menjaga jarak dari ${receiver.name}`,
            );
            await wait(2200);

            setAnnouncerMassage(
              `${attacker.name} mengeluarkan sihir yang kuat dari loncengnya!`,
            );

            if (attacker === Player) {
              setPlayerAnimation("magic");
            } else {
              setOpponentAnimation("magic");
            }
            const sound = new Audio(backSoundMagic); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(2000);



            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir!`);
              setOpponentAnimation("damage");
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} menderita luka akibat ledakan sihir!`,
              );
              await wait(1500);
              setOpponentAnimation("static");

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "heal": {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              `${attacker.name} melemparkan bola asap ke bawah ${receiver.name}`,
            );
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu!`);
            await wait(1500);
            setAnnouncerMassage(
              `${attacker.name} memakai kesempatan ini untuk memulihkan diri!`,
            );
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(
                `${attacker.name} mengeluarkan sihir pemulihan yang kuat!`,
              );

              setPlayerAnimation("heal");
              await wait(250);
              const sound = new Audio(backSoundHeal); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `sebagian besar nyawa ${attacker.name} telah pulih!`,
              );
              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              );
              await wait(500);

              setPlayerAnimation("static");
              await wait(1500);
              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "gigit": {
          const damage = gigit({ attacker, receiver });
          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} melepaskan jaring laba-laba ke arah ${receiver.name}`,
            );
            await wait(2000);
            setAnnouncerMassage(
              `${receiver.name} terjebak jaring tersebut !!!`,
            );
            await wait(1500);

            if (turn === 1) {
              setAnnouncerMassage(
                `${attacker.name} mendekat dengan cepat lalu menerkam ${receiver.name} !`,
              );

              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setOpponentAnimation("attack");
              await wait(250);
              const sound1 = new Audio(backSoundaAllmonster2); // [Ditambahkan]
              sound1.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound1.play(); // [Ditambahkan]

              await wait(200);
              setOpponentAnimation("static");
              setPlayerAnimation("static");

              await wait(2000);
              setAnnouncerMassage(
                `${receiver.name} mengeluarkan sihir untuk melarikan diri dan berhasil membebaskan diri!`,
              );
              await wait(2700);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "cakar": { //sudah selesai
          const damage = cakar({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} mendekati ${receiver.name} dengan cepat dan melancarkan serangan!`
            );
            await wait(2000);

            // Atur animasi serangan dan kembali ke status statis setelah 230ms
            setOpponentAnimation("attack");
            await wait(230); // Durasi animasi attack selama 230ms
            const sound = new Audio(backSoundMonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            setOpponentAnimation("static"); // Kembali ke status statis setelah attack


            // Lanjutkan ke logika berikutnya tanpa mempengaruhi teks
            await wait(570); // Mengisi sisa waktu agar total tetap 1000ms

            // Tampilkan pesan serangan
            if (turn === 1) {
              setAnnouncerMassage(
                `${receiver.name} terkena serangan dari ${attacker.name}`
              );
              await wait(200);

              // Animasi damage pada player
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              setPlayerAnimation("damage");
              await wait(2000);

              await wait(200);

              // Menyelesaikan animasi damage
              await wait(2000);
              setPlayerAnimation("static");

              // Pesan pembalasan
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            // Ganti giliran
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }


        case "lari": {
          const damage = lari({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} berlari ke arah ${receiver.name} dengan kecepatan penuh`
            );
            await wait(1000);

            // Atur animasi serangan dan kembali ke status statis setelah 230ms
            setOpponentAnimation("attack");
            await wait(230); // Durasi animasi attack selama 230ms
            const sound = new Audio(backSoundaAllmonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            setOpponentAnimation("static"); // Kembali ke status statis setelah attack

            // Lanjutkan ke logika berikutnya tanpa mempengaruhi teks
            await wait(770); // Mengisi sisa waktu agar total tetap 1000ms

            // Tampilkan pesan serangan
            setAnnouncerMassage(
              `${attacker.name} menghancurkan segala hal yang menghalangi jalan!`
            );
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(
                `${receiver.name} mencoba menghindar tapi gagal`
              );
              await wait(2500);

              setAnnouncerMassage(
                `${receiver.name} terkena serangan tersebut dan menderita cedera serius!`
              );
              await wait(2500);
              // Animasi damage pada player
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              setPlayerAnimation("damage");
              await wait(2000);

              await wait(200);

              // Menyelesaikan animasi damage dan kembali ke status statis
              await wait(2000);
              setPlayerAnimation("static");

              // Pesan pembalasan
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            // Ganti giliran
            setTurn(turn === 1 ? 0 : 1);
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
};

export const useBattleSequence2 = (sequence) => { //selesai
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(MonsterApi.maxHealth);
  const [announcerMessage, setAnnouncerMassage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn } = sequence;
    console.log("menyerang: " + mode);

    if (mode) {
      const attacker = turn === 0 ? Player : MonsterApi;
      const receiver = turn === 0 ? MonsterApi : Player;
      console.log(loading);
      setLoading(true);
      console.log(loading);

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              ` ${attacker.name} melapisi tangannya dengan sihir...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} berlari ke arah ${receiver.name}, bersiap melancarkan pukulan kuat...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} melancarkan pukulan yang sangat kuat!`
            );

            if (attacker === Player) {
              setPlayerAnimation("attackP");
            } else {
              setOpponentAnimation("attack");
            }

            await wait(250);
            const sound = new Audio(backSoundAttack); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }
            await wait(2500);
            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut!`);
              await wait(1000);

              if (receiver === Player) {
                setPlayerAnimation("damage");
              } else {
                setOpponentAnimation("damage");
              }
              await wait(300);

              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(200);

              if (receiver === Player) {
                setPlayerAnimation("static");
              } else {
                setOpponentAnimation("static");
              }

              setAnnouncerMassage(
                `${attacker.name} menyerap sebagian energi dari ${receiver.name}...`
              );
              await wait(2500);

              setAnnouncerMassage(
                ` ${attacker.name} memulihkan sebagian energinya!`
              );
              await wait(2500);

              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth
              );
              await wait(2000);

              setAnnouncerMassage(
                ` ${receiver.name} segera membalas serangan ${attacker.name}!`
              );
              await wait(2000);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "magic": {
          const damage = magic({ attacker, receiver });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} melompat ke belakang, menjaga jarak dari ${receiver.name}`,
            );
            await wait(2200);

            setAnnouncerMassage(
              `${attacker.name} mengeluarkan sihir yang kuat dari loncengnya!`,
            );

            if (attacker === Player) {
              setPlayerAnimation("magic");
            } else {
              setOpponentAnimation("magic");
            }
            const sound = new Audio(backSoundMagic); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(2000);

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir!`);
              setOpponentAnimation("damage");
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} menderita luka akibat ledakan sihir!`,
              );
              await wait(1500);
              setOpponentAnimation("static");

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "heal": {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              `${attacker.name} melemparkan bola asap ke bawah ${receiver.name}`,
            );
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu!`);
            await wait(1500);
            setAnnouncerMassage(
              `${attacker.name} memakai kesempatan ini untuk memulihkan diri!`,
            );
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(
                `${attacker.name} mengeluarkan sihir pemulihan yang kuat!`,
              );

              setPlayerAnimation("heal");
              await wait(250);
              const sound = new Audio(backSoundHeal); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `sebagian besar nyawa ${attacker.name} telah pulih!`,
              );
              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              );
              await wait(500);

              setPlayerAnimation("static");
              await wait(1500);
              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }


        case "suhu": {
          const damage = suhu({ attacker, receiver });
          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} hanya diam dan melihat ${receiver.name} dengan tatapan kosong ....`,
            );
            await wait(2000); // Durasi disamakan dengan bagian awal pada "gigit"

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} sekilas melihat hal aneh ...`);

              await wait(1500); // Durasi disamakan dengan transisi kedua di "gigit"
              setAnnouncerMassage(`${receiver.name} tertegun sejenak ...`);
              await wait(1500);

              setAnnouncerMassage(
                `dikarenakan keadaan lingkungan sekitar yang panas nyawa ${receiver.name} berkurang`,
              );

              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(200); // Durasi disamakan dengan animasi damage di "gigit"

              setAnnouncerMassage(`${receiver.name} tersadar dan membalas ${attacker.name}`);
              await wait(1500);

              setPlayerAnimation("static");
            }

            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "suhuTinggi": {
          const damage = suhuTinggi({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} mengeluarkan aura api ke sekitar karenanya suhu disekitar meningkat drastis`,
            );
            await wait(2000); // Menyamakan durasi pesan pembuka

            setOpponentAnimation("apiBesar");
            await wait(230); // Durasi animasi attack selama 230ms
            const sound = new Audio(backSoundApiBesar); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            setOpponentAnimation("static"); // Kembali ke status statis setelah attack

            // Lanjutkan ke logika berikutnya tanpa mempengaruhi teks
            await wait(570); // Mengisi sisa waktu agar total tetap 1000ms

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak tahan dengan peningkatan suhu ini`);
              await wait(1500); // Durasi sesuai dengan transisi kedua pada kasus "cakar"

              setAnnouncerMassage(`Kulit ${receiver.name} terbakar oleh api`);
              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(200); // Durasi untuk menunjukkan efek damage

              // Menyelesaikan animasi damage
              await wait(2000); // Sama dengan waktu untuk efek damage pada "cakar"
              setPlayerAnimation("static");

              // Pesan pembalasan
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            // Ganti giliran
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "tinjuan": {
          const damage = tinjuan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} bergerak menuju ${receiver.name} dan melayangkan 1 pukulan yang sangat kuat`
            );

            // Atur animasi serangan dan kembali ke status statis setelah 230ms
            setOpponentAnimation("attack");
            await wait(230); // Durasi animasi attack selama 230ms
            const sound = new Audio(backSoundaAllmonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            setOpponentAnimation("static"); // Kembali ke status statis setelah attack

            // Lanjutkan ke logika berikutnya tanpa mempengaruhi teks
            await wait(1000); // Mengisi sisa waktu agar total tetap 1000ms

            // Tampilkan pesan serangan
            setAnnouncerMassage(
              `${attacker.name} menghancurkan segala hal yang menghalangi jalan!`
            );
            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(
                `${receiver.name} mencoba menghindar tetapi gagal karena di kelilingi api!`
              );
              await wait(2500);

              setAnnouncerMassage(
                `${receiver.name} terkena serangan tersebut dan menderita cedera serius!`
              );
              await wait(2500);

              // Animasi damage pada player
              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(200); // Durasi efek damage

              // Menyelesaikan animasi damage dan kembali ke status statis
              await wait(2000);
              setPlayerAnimation("static");

              // Pesan pembalasan
              setAnnouncerMassage(`karena tekadnya yang kuat ${receiver.name} berhasil bangkit dan membalas ${attacker.name}`);
              await wait(1500);
            }

            // Ganti giliran
            setTurn(turn === 1 ? 0 : 1);
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
};

export const useBattleSequence3 = (sequence) => { //selesai
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(MonsterEs.maxHealth);
  const [announcerMessage, setAnnouncerMassage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn } = sequence;
    console.log("menyerang: " + mode);

    if (mode) {
      const attacker = turn === 0 ? Player : MonsterEs;
      const receiver = turn === 0 ? MonsterEs : Player;
      console.log(loading);
      setLoading(true);
      console.log(loading);

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              ` ${attacker.name} melapisi tangannya dengan sihir...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} berlari ke arah ${receiver.name}, bersiap melancarkan pukulan kuat...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} melancarkan pukulan yang sangat kuat!`
            );

            if (attacker === Player) {
              setPlayerAnimation("attackP");
            } else {
              setOpponentAnimation("attack");
            }
            await wait(250);
            const sound = new Audio(backSoundAttack); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }
            await wait(2500);
            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut!`);
              await wait(1000);

              if (receiver === Player) {
                setPlayerAnimation("damage");
              } else {
                setOpponentAnimation("damage");
              }
              await wait(300);
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              if (receiver === Player) {
                setPlayerAnimation("static");
              } else {
                setOpponentAnimation("static");
              }

              setAnnouncerMassage(
                `${attacker.name} menyerap sebagian energi dari ${receiver.name}...`
              );
              await wait(2500);

              setAnnouncerMassage(
                ` ${attacker.name} memulihkan sebagian energinya!`
              );
              await wait(2500);

              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth
              );
              await wait(2000);

              setAnnouncerMassage(
                ` ${receiver.name} segera membalas serangan ${attacker.name}!`
              );
              await wait(2000);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "magic": {
          const damage = magic({ attacker, receiver });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} melompat ke belakang, menjaga jarak dari ${receiver.name}`,
            );
            await wait(2200);

            setAnnouncerMassage(
              `${attacker.name} mengeluarkan sihir yang kuat dari loncengnya!`,
            );

            if (attacker === Player) {
              setPlayerAnimation("magic");
            } else {
              setOpponentAnimation("magic");
            }
            const sound = new Audio(backSoundMagic); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            await wait(2000);

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir!`);
              setOpponentAnimation("damage");
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} menderita luka akibat ledakan sihir!`,
              );
              await wait(1500);
              setOpponentAnimation("static");

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "heal": {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              `${attacker.name} melemparkan bola asap ke bawah ${receiver.name}`,
            );
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu!`);
            await wait(1500);
            setAnnouncerMassage(
              `${attacker.name} memakai kesempatan ini untuk memulihkan diri!`,
            );
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(
                `${attacker.name} mengeluarkan sihir pemulihan yang kuat!`,
              );

              setPlayerAnimation("heal");
              await wait(250);
              const sound = new Audio(backSoundHeal); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `sebagian besar nyawa ${attacker.name} telah pulih!`,
              );
              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              );
              await wait(500);

              setPlayerAnimation("static");
              await wait(1500);
              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "batu": {
          const damage = batu({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} mengambil batu-batu di sekitar dan melemparkannya ke arah ${receiver.name}`
            );
            setOpponentAnimation("attack");
            const sound = new Audio(backSoundaAllmonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(2500); // Durasi untuk melempar batu

            if (turn === 1) {
              // Animasi damage pada player
              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(200); // Durasi efek damage
              const sound = new Audio(backSoundDamageBertubi); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(`${receiver.name} terkena lemparan batu bertubi-tubi`);
              await wait(1500); // Durasi pesan

              // Menghitung damage lagi
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(200); // Durasi efek damage
              const sound1 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound1.play(); // [Ditambahkan]

              setAnnouncerMassage(`${receiver.name} kesulitan menghindar!`);
              await wait(1300); // Durasi pesan

              // Menghitung damage sekali lagi
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(200); // Durasi efek damage
              const sound2 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound2.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `${receiver.name} akhirnya berhasil menghindar dan membalas ${attacker.name}`
              );
              await wait(1500); // Durasi pesan
              setPlayerAnimation("static"); // Kembalikan animasi player ke static
            }

            setOpponentAnimation("static"); // Kembalikan animasi opponent ke static
            setTurn(turn === 1 ? 0 : 1); // Ganti giliran
            setInSequence(false); // Reset status inSequence
            setLoading(false); // Matikan loading
          })();

          break;
        }

        case "teriakan": {
          const damage = teriakan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} mengeluarkan suara nyaring yang diperkuat dengan sihir!!`,
            );

            setOpponentAnimation("teriakan");
            const sound = new Audio(backSoundAumanEs); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak kuat mendengar teriakan tersebut!`);
              await wait(2000);

              setAnnouncerMassage(`Telinga ${receiver.name} terluka`);
              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              await wait(1500);

              setAnnouncerMassage(
                `${receiver.name} menutupi telinganya dengan batu kecil dan membalas ${attacker.name}`,
              );
              await wait(2500);

              setPlayerAnimation("static");
            }

            setOpponentAnimation("static");
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "badaiSalju": {
          const damage = badaiSalju({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} mengeluarkan serangan terkuatnya, yaitu badai salju!!!`,
            );

            setOpponentAnimation("badai");
            const sound = new Audio(backSoundBadaiSalju); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(1000);

            setAnnouncerMassage(
              `${receiver.name} kebingungan karena tiba tiba ada badai salju!`,
            );
            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} terjebak di tengah badai salju tersebut`);
              await wait(2000);

              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(500);

              setAnnouncerMassage(`${receiver.name} terhantam oleh benda benda yang berterbangan`);
              const sound1 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound1.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound1.play(); // [Ditambahkan]
              await wait(2000);

              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound2 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound2.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound2.play(); // [Ditambahkan]
              await wait(500);

              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound3 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound3.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound3.play(); // [Ditambahkan]

              await wait(500);

              setAnnouncerMassage(
                `${receiver.name} terkena serangan dingin dan terluka akibat benturan`,
              );
              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} meneruskan pertarungan ini dan membalas ${attacker.name}`,
              );
              await wait(1800);

              setPlayerAnimation("static");
            }

            setOpponentAnimation("static");
            setTurn(turn === 1 ? 0 : 1);
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
};

export const useBattleSequence4 = (sequence) => { //selesai
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(Buaya.maxHealth);
  const [announcerMessage, setAnnouncerMassage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn } = sequence;
    console.log("menyerang: " + mode);

    if (mode) {
      const attacker = turn === 0 ? Player : Buaya;
      const receiver = turn === 0 ? Buaya : Player;
      console.log(loading);
      setLoading(true);
      console.log(loading);

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              ` ${attacker.name} melapisi tangannya dengan sihir...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} berlari ke arah ${receiver.name}, bersiap melancarkan pukulan kuat...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} melancarkan pukulan yang sangat kuat!`
            );

            if (attacker === Player) {
              setPlayerAnimation("attackP");
            } else {
              setOpponentAnimation("attack");
            }
            await wait(250);
            const sound = new Audio(backSoundAttack); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }
            await wait(2500);
            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut!`);
              await wait(1000);

              if (receiver === Player) {
                setPlayerAnimation("damage");
              } else {
                setOpponentAnimation("damage");
              }
              await wait(300);
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              if (receiver === Player) {
                setPlayerAnimation("static");
              } else {
                setOpponentAnimation("static");
              }

              setAnnouncerMassage(
                `${attacker.name} menyerap sebagian energi dari ${receiver.name}...`
              );
              await wait(2500);

              setAnnouncerMassage(
                ` ${attacker.name} memulihkan sebagian energinya!`
              );
              await wait(2500);

              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth
              );
              await wait(2000);

              setAnnouncerMassage(
                ` ${receiver.name} segera membalas serangan ${attacker.name}!`
              );
              await wait(2000);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "magic": {
          const damage = magic({ attacker, receiver });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} melompat ke belakang, menjaga jarak dari ${receiver.name}`,
            );
            await wait(2200);

            setAnnouncerMassage(
              `${attacker.name} mengeluarkan sihir yang kuat dari loncengnya!`,
            );

            if (attacker === Player) {
              setPlayerAnimation("magic");
            } else {
              setOpponentAnimation("magic");
            }
            const sound = new Audio(backSoundMagic); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(2000);



            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir!`);
              setOpponentAnimation("damage");
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} menderita luka akibat ledakan sihir!`,
              );
              await wait(1500);
              setOpponentAnimation("static");

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "heal": {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              `${attacker.name} melemparkan bola asap ke bawah ${receiver.name}`,
            );
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu!`);
            await wait(1500);
            setAnnouncerMassage(
              `${attacker.name} memakai kesempatan ini untuk memulihkan diri!`,
            );
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(
                `${attacker.name} mengeluarkan sihir pemulihan yang kuat!`,
              );

              setPlayerAnimation("heal");
              await wait(250);
              const sound = new Audio(backSoundHeal); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `sebagian besar nyawa ${attacker.name} telah pulih!`,
              );
              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              );
              await wait(500);

              setPlayerAnimation("static");
              await wait(1500);
              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }


        case "air": {
          const damage = air({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} mengendalikan air disekitarnya dan melancarkan serangan kepada ${receiver.name}`,
            );

            setOpponentAnimation("pusaranAir");
            await wait(3000);

            if (turn === 1) {
              const sound5 = new Audio(backSoundAir); // [Ditambahkan]
              sound5.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound5.play(); // [Ditambahkan]

              setPlayerAnimation("damage");
              setAnnouncerMassage(`${receiver.name} terkena tembakan air bertubi tubi`);
              await wait(1500);

              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(500);
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(`${receiver.name} kesulitan menghindar!`);
              await wait(1500);

              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(500);
              const sound1 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound1.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound1.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `sebuah celah telah terlihat! ${receiver.name} mengambil kesempatan dan membalas ${attacker.name}`,
              );
              await wait(1500);

              setPlayerAnimation("static");
            }

            setOpponentAnimation("static");
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "pukulan": {
          const damage = pukulan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} bersiap melakukan serangan`);
            await wait(2000);

            setAnnouncerMassage(
              `${attacker.name} bergerak dengan kecepatan tinggi ke arah ${receiver.name}`,
            );

            setOpponentAnimation("kecepatanTinggi");
            const sound = new Audio(backSoundaAllmonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            await wait(2000);

            if (turn === 1) {
              setAnnouncerMassage(
                `${receiver.name} bersiap menghadapi serangan ${attacker.name}`,
              );
              await wait(2000);

              setAnnouncerMassage(
                `${attacker.name} melancarkan serangan bertubi tubi`,
              );
              await wait(2000);

              setPlayerAnimation("damage");
              const sound1 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound1.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound1.play(); // [Ditambahkan]
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(500);
              const sound2 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound2.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound2.play(); // [Ditambahkan]
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(500);
              const sound3 = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound3.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound3.play(); // [Ditambahkan]
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(500);

              setAnnouncerMassage(
                `${receiver.name} terpental ke rawa dan bangun kembali!`,
              );
              await wait(2000);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);

              setPlayerAnimation("static");
            }

            setOpponentAnimation("static");
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "adaptasi": {
          const recovered = adaptasi({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} menyelam ke dalam rawa!!!`);
            await wait(1000);

            if (turn === 1) {
              setAnnouncerMassage(`${attacker.name} menyerap energi di dalam rawa`);
              await wait(1500);

              setAnnouncerMassage(`${attacker.name} memulihkan sebagian nyawanya`);
              setOpponentAnimation("heal");
              const sound = new Audio(backSoundHeal); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              setOpponentHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth,
              );
              await wait(1500);

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);

              setOpponentAnimation("static");
            }

            setTurn(turn === 1 ? 0 : 1);
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
};

export const useBattleSequence5 = (sequence) => { //selesai
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(Player.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(Serigala.maxHealth);
  const [announcerMessage, setAnnouncerMassage] = useState("");
  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn } = sequence;
    console.log("menyerang: " + mode);

    if (mode) {
      const attacker = turn === 0 ? Player : Serigala;
      const receiver = turn === 0 ? Serigala : Player;
      console.log(loading);
      setLoading(true);
      console.log(loading);

      switch (mode) {
        case "attack": {
          const damage = attack({ attacker, receiver });
          const recovered = livesteal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              ` ${attacker.name} melapisi tangannya dengan sihir...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} berlari ke arah ${receiver.name}, bersiap melancarkan pukulan kuat...`
            );
            await wait(2500);

            setAnnouncerMassage(
              `${attacker.name} melancarkan pukulan yang sangat kuat!`
            );

            if (attacker === Player) {
              setPlayerAnimation("attackP");
            } else {
              setOpponentAnimation("attack");
            }
            await wait(250);
            const sound = new Audio(backSoundAttack); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]

            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }
            await wait(2500);
            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena pukulan tersebut!`);
              await wait(1000);

              if (receiver === Player) {
                setPlayerAnimation("damage");
              } else {
                setOpponentAnimation("damage");
              }
              await wait(300);
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              if (receiver === Player) {
                setPlayerAnimation("static");
              } else {
                setOpponentAnimation("static");
              }

              setAnnouncerMassage(
                `${attacker.name} menyerap sebagian energi dari ${receiver.name}...`
              );
              await wait(2500);

              setAnnouncerMassage(
                ` ${attacker.name} memulihkan sebagian energinya!`
              );
              await wait(2500);

              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth
              );
              await wait(2000);

              setAnnouncerMassage(
                ` ${receiver.name} segera membalas serangan ${attacker.name}!`
              );
              await wait(2000);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "magic": {
          const damage = magic({ attacker, receiver });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} melompat ke belakang, menjaga jarak dari ${receiver.name}`,
            );
            await wait(2200);

            setAnnouncerMassage(
              `${attacker.name} mengeluarkan sihir yang kuat dari loncengnya!`,
            );

            if (attacker === Player) {
              setPlayerAnimation("magic");
            } else {
              setOpponentAnimation("magic");
            }
            const sound = new Audio(backSoundMagic); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(2000);



            if (attacker === Player) {
              setPlayerAnimation("static");
            } else {
              setOpponentAnimation("static");
            }

            if (turn === 0) {
              setAnnouncerMassage(`${receiver.name} terkena serangan sihir!`);
              setOpponentAnimation("damage");
              setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(2000);

              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} menderita luka akibat ledakan sihir!`,
              );
              await wait(1500);
              setOpponentAnimation("static");

              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "heal": {
          const recovered = heal({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);

            setAnnouncerMassage(
              `${attacker.name} melemparkan bola asap ke bawah ${receiver.name}`,
            );
            await wait(2000);
            setAnnouncerMassage(`pandangan ${receiver.name} terganggu!`);
            await wait(1500);
            setAnnouncerMassage(
              `${attacker.name} memakai kesempatan ini untuk memulihkan diri!`,
            );
            await wait(2200);

            if (turn === 0) {
              setAnnouncerMassage(
                `${attacker.name} mengeluarkan sihir pemulihan yang kuat!`,
              );

              setPlayerAnimation("heal");
              await wait(250);
              const sound = new Audio(backSoundHeal); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]

              setAnnouncerMassage(
                `sebagian besar nyawa ${attacker.name} telah pulih!`,
              );
              setPlayerHealth((h) =>
                h + recovered <= attacker.maxHealth
                  ? h + recovered
                  : attacker.maxHealth,
              );
              await wait(500);

              setPlayerAnimation("static");
              await wait(1500);
              setAnnouncerMassage(`pandangan ${receiver.name} kembali normal`);
              await wait(1500);
              setAnnouncerMassage(`${receiver.name} membalas ${attacker.name}`);
              await wait(1500);
            }

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "tendangan": {
          const damage = tendangan({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(
              `${attacker.name} berlari dengan kecepatan kilat langsung mengarah kepada ${receiver.name}`,
            );

            setOpponentAnimation("menendang");
            const sound = new Audio(backSoundaAllmonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(3500);

            if (turn === 1) {
              setAnnouncerMassage(`${receiver.name} tidak dapat bereaksi !!!`);
              await wait(1200);

              setAnnouncerMassage(
                `${attacker.name} melakukan tendangan dengan kecepatan penuh ke arah ${receiver.name}`,
              );
              await wait(2500);

              setPlayerAnimation("damage");
              setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              await wait(750);


              setAnnouncerMassage(
                `${receiver.name} terpental kebelakang dan menghantam batu dibelakangnya!`,
              );
              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} hampir kehilangan kesadaran akibat serangan tersebut`,
              );
              await wait(2000);

              setAnnouncerMassage(
                `${receiver.name} bangkit lagi dan membalas ${attacker.name}`,
              );
              await wait(1500);

              setPlayerAnimation("static");
            }

            setOpponentAnimation("static");
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "cakaran": {
          const damage = cakaran({ attacker, receiver });

          (async () => {
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} bergerak dengan sangat cepat!`);
            await wait(1500);

            setAnnouncerMassage(
              `${attacker.name} berlari mengelilingi ${receiver.name}`,
            );
            setOpponentAnimation("attack");
            const sound = new Audio(backSoundMonster); // [Ditambahkan]
            sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
            sound.play(); // [Ditambahkan]
            await wait(1500);

            if (turn === 1) {
              setAnnouncerMassage(
                `${receiver.name} bersiap menghadapi ${attacker.name}`,
              );
              await wait(2000);

              setAnnouncerMassage(
                `${attacker.name} melancarkan serangan bertubi tubi`,
              );
              await wait(2000);

              setPlayerAnimation("damage");

              for (let i = 0; i < 10; i++) {
                setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
                await wait(200);
                const sound = new Audio(backSoundTerkenaDamage); // [Ditambahkan]
                sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
                sound.play(); // [Ditambahkan]
              }

              setAnnouncerMassage(
                `${receiver.name} melancarkan 1 serangan mengarah tepat ke kepala ${attacker.name}`,
              );
              await wait(2000);

              setAnnouncerMassage(`${attacker.name} terpental ke belakang!`);
              await wait(1500);

              setPlayerAnimation("static");
              setAnnouncerMassage(`${receiver.name} bersiap membalas ${attacker.name}`);
              await wait(1500);
            }

            setOpponentAnimation("static");
            setTurn(turn === 1 ? 0 : 1);
            setInSequence(false);
            setLoading(false);
          })();

          break;
        }

        case "auman": {
          const recovered = auman({ receiver: attacker });

          (async () => {
            setLoading(true);
            setInSequence(true);
            setAnnouncerMassage(`${attacker.name} mengaum ke langit malam`);
            await wait(1500);

            setAnnouncerMassage(
              `entah kenapa ${receiver.name} tidak dapat bergerak`,
            );
            await wait(1500);

            setAnnouncerMassage(
              `cahaya bulan menerangi tempat dimana ${attacker.name} berada!!!`,
            );
            await wait(2500);

            if (turn === 1) {
              setAnnouncerMassage(
                `${receiver.name} terkejut dengan apa yang ia lihat`,
              );
              await wait(1500);

              setAnnouncerMassage(`${attacker.name} memulihkan sebagian nyawanya`);
              const sound = new Audio(backSoundAumanSerigala); // [Ditambahkan]
              sound.volume = 1.0; // [Ditambahkan] Atur volume (0.0 - 1.0)
              sound.play(); // [Ditambahkan]
              setOpponentAnimation("heal");
              setOpponentHealth((h) =>
                h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth,
              );
              await wait(1500);

              setAnnouncerMassage(
                `${receiver.name} akhirnya bisa bergerak dan membalas ${attacker.name}`,
              );
              await wait(1500);

              setOpponentAnimation("static");
            }

            setTurn(turn === 1 ? 0 : 1);
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
};
