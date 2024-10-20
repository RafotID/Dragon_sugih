import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/indeks';
import '../PusatCss/polygon.css';
import { Playerdetail } from '../components/Player/Playerdetail';
import { BattleAnnouncer } from '../components/BattleAnnouncer/BattleAnnouncer';
import { useBattleSequence, useAIOpponents, useBattleSequence2, useAImonsterApi, useAImonsterEs, useBattleSequence3, useBattleSequence5, useAIserigala, useAibuaya, useBattleSequence4 } from '../hooks'; // import hooks yang diperlukan
import { Player, GiantSpider, MonsterApi, wait, MonsterEs, Serigala, Buaya } from '../shared'; // import data statistik pemain dan lawa


export const Battle = ({ onGameEnd, onAttack, onMagic, onHeal }) => {
    const navigate = useNavigate();

    const playerMagic = Player.magic;
    const playerPhysical = Player.maxHealth;
    const playerhealth = Player.attack;
    const playerlivesteal = Player.heal;
    const playerDev = Player.defense;

    const healt = GiantSpider.maxHealth;
    const physical = GiantSpider.gigit;
    const magicDev = GiantSpider.magicDefense;
    const cakarDamage = GiantSpider.cakar;

    const img = [
        assets.gambar.sidhimantrastory,
        assets.gambar.spider
    ];

    const flow = [
        { slide: 0 },
        { slide: 1 },
        { slide: 2 },
    ];
    const { id } = useParams()

    const [showAlert, setShowAlert] = useState(false);
    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // State dan hooks pertempuran
    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        loading
    } = useBattleSequence(sequence);

    const aiChoice = useAIOpponents(turn);

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            return navigate(`/penghubung/${Number(currentStep) + 1}`)
            // Pindah ke langkah berikutnya
        } else {
            navigate('/story/18');
        }
    };

    const handleInfoClick = () => {
        setShowAlert(true); // Menampilkan alert saat tombol info ditekan
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Menutup alert saat tombol back ditekan
    };

    // Logika AI memilih tindakan saat giliran AI
    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: aiChoice })
        }
    }, [turn, aiChoice, inSequence])

    // Mengakhiri permainan jika salah satu karakter kalah
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                if (playerHealth === 0) {
                    onGameEnd(GiantSpider); // Pemain kalah
                } else {
                    onGameEnd(Player); // Pemain menang
                }
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);


    const currentSlide = flow[currentStep].slide;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])



    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Laba laba! . . . . jangan menghalangi jalanku, aku harus ke atas gunung ini untuk mencapai tujuanku!</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[0]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Sidi Mantra</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[0]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>

                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.mageIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-magic text-[35px]'>{playerMagic}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{playerhealth}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.pysicalIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{playerPhysical}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.healIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{playerlivesteal}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{playerDev}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentSlide === 1 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Ssssssssiapa yang berani memasuki wilayah ku? berani sekali manusia sepertimu menginjakkan kaki disini !</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[1]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Giant Spider</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[1]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>
                                        <p className="mt-[80%] flex justify-center text-[30px] font-girassol text-white">Level {Spider}</p>
                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{healt}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.pysicalIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{physical}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{magicDev}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.Cakar} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{cakarDamage}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{playerDev}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

                        <div className='relative top-[52%]'>
                            <img src={assets.gambar.sidhimantrastory} alt="" className={`absolute ml-[12%] w-[20%] mt-[-18%]`} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] left-[8%] leading-relaxed'>Sidi Mantra</p>
                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%]' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={playerHealth}
                                    maxHealth={Player.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center left-[5%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>

                        <div className='relative flex justify-end top-[2%] right-[2%]'>
                            <img src={assets.gambar.spider} alt="" className={`absolute mr-[5%] w-[18%] mt-[3%] `} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] right-[20%] leading-relaxed'>Giant Spider</p>

                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%] ' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={opponentHealth}
                                    maxHealth={GiantSpider.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center right-[30%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>


                        <div
                            className='absolute border-gray-300 border-[1px] z-10 h-[30%] w-[99%] flex flex-row bg-papanText rounded-lg bottom-[2%] left-1/2 transform -translate-x-1/2'
                        >
                            {/* Div untuk kotak teks yang lebih panjang */}
                            <div className='relative flex-[1.5] h-full'>
                                <img src={assets.gambar.papanBattel} alt="papan" className='h-[95%] w-[100%] ml-2 mt-[0.4%] flex justify-center' />
                                <div className='absolute mt-[-14%] w-full'>
                                    <BattleAnnouncer
                                        message={announcerMessage || `apa yang dilakukan ${Player.name} ?`}
                                    />
                                </div>
                            </div>

                            {/* Div untuk tombol yang lebih kecil */}
                            <div className='flex-[1] flex items-center justify-evenly h-full w-[30%] space-x-[1%]'>
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonM})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onMagic = () => setSequence({ mode: 'magic', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: ` url(${assets.gambar.buttonA})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onAttack = () => setSequence({ mode: 'attack', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonH})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onHeal = () => setSequence({ mode: 'heal', turn }) : () => { }}
                                />
                            </div>
                        </div>
                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[9]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>
                    </div>
                </div>
            )}

            {currentSlide === 3 && (
                <div className='relative h-screen overflow-hidden'>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})`, zIndex: 0 }} // Tambahkan zIndex jika dibutuhkan
                    ></div>


                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/story/18')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${assets.gambar.tombolNext})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>

                    {/* Elemen gambar lainnya */}
                    <div className='flex justify-between h-screen'>
                        {/* Bagian Pertama: Dewa Api dan papan textBattle */}
                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className='w-[50%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.sidhimantrastory}
                                    alt="Dewa Api"
                                    className='h-[80%] w-auto' // Mengatur gambar dalam kolom
                                />
                            </div>


                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className='mt-[-10%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>


                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className=' mt-[-14%] w-[55%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.DewaApi}
                                    alt="Dewa Api"
                                    className='h-[120%] w-[100%]' // Mengatur gambar dalam kolom
                                />
                            </div>

                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className=' mt-[-3%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>
                    </div>

                </div>

            )}


        </>
    );
};

export const Battle2 = ({ onGameEnd, onAttack, onMagic, onHeal }) => {
    const navigate = useNavigate();

    const playerMagic = Player.magic;
    const playerPhysical = Player.attack;
    const playerhealth = Player.heal;
    const playerlivesteal = Player.livesteal;
    const playerDev = Player.defense;



    const suhuTinggi = MonsterApi.suhuTinggi;
    const maxHealth = MonsterApi.maxHealth;
    const suhu = MonsterApi.suhu;
    const tinjuan = MonsterApi.tinjuan;
    const defense = MonsterApi.defense;

    const img = [
        assets.gambar.sidhimantrastory,
        assets.gambar.golemApi
    ];

    const flow = [
        { slide: 0 },
        { slide: 1 },
        { slide: 2 },
        { slide: 3 },
    ];
    const { id } = useParams()

    const [showAlert, setShowAlert] = useState(false);
    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // State dan hooks pertempuran
    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        loading
    } = useBattleSequence2(sequence);

    const aiChoice = useAImonsterApi(turn);

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            return navigate(`/penghubung/${Number(currentStep) + 1}`)
            // Pindah ke langkah berikutnya
        } else {
            navigate('/story/18');
        }
    };

    const handleInfoClick = () => {
        setShowAlert(true); // Menampilkan alert saat tombol info ditekan
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Menutup alert saat tombol back ditekan
    };

    // Logika AI memilih tindakan saat giliran AI
    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: aiChoice })
        }
    }, [turn, aiChoice, inSequence])

    // Mengakhiri permainan jika salah satu karakter kalah
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                if (playerHealth === 0) {
                    onGameEnd(MonsterApi); // Pemain kalah
                } else {
                    onGameEnd(Player); // Pemain menang
                }
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);


    const currentSlide = flow[currentStep].slide;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])



    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv2})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Laba laba! . . . . jangan menghalangi jalanku, aku harus ke atas gunung ini untuk mencapai tujuanku!</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[0]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Sidi Mantra</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[0]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>

                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.mageIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-magic text-[35px]'>{playerMagic}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{playerhealth}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.pysicalIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{playerPhysical}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.healIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{playerlivesteal}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{playerDev}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentSlide === 1 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv2})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Ssssssssiapa yang berani memasuki wilayah ku? berani sekali manusia sepertimu menginjakkan kaki disini !</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[1]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Apiar</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[1]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>

                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.apiB} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{suhuTinggi}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{maxHealth}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.apiK} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{suhu}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.Cakar} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{tinjuan}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{defense}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv2})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

                        <div className='relative top-[52%]'>
                            <img src={assets.gambar.sidhimantrastory} alt="" className={`absolute ml-[12%] w-[20%] mt-[-18%]`} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] left-[8%] leading-relaxed'>Sidi Mantra</p>
                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%]' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={playerHealth}
                                    maxHealth={Player.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center left-[5%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>

                        <div className='relative flex justify-end top-[2%] right-[2%]'>
                            <img src={assets.gambar.golemApi} alt="" className={`absolute mr-[5%] w-[18%] mt-[3%] `} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] right-[20%] leading-relaxed'>Apiar</p>

                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%] ' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={opponentHealth}
                                    maxHealth={MonsterApi.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center right-[30%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>


                        <div
                            className='absolute border-gray-300 border-[1px] z-10 h-[30%] w-[99%] flex flex-row bg-papanText rounded-lg bottom-[2%] left-1/2 transform -translate-x-1/2'
                        >
                            {/* Div untuk kotak teks yang lebih panjang */}
                            <div className='relative flex-[1.5] h-full'>
                                <img src={assets.gambar.papanBattel} alt="papan" className='h-[95%] w-[100%] ml-2 mt-[0.4%] flex justify-center' />
                                <div className='absolute mt-[-14%] w-full'>
                                    <BattleAnnouncer
                                        message={announcerMessage || `apa yang dilakukan ${Player.name} ?`}
                                    />
                                </div>
                            </div>

                            {/* Div untuk tombol yang lebih kecil */}
                            <div className='flex-[1] flex items-center justify-evenly h-full w-[30%] space-x-[1%]'>
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonM})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onMagic = () => setSequence({ mode: 'magic', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: ` url(${assets.gambar.buttonA})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onAttack = () => setSequence({ mode: 'attack', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonH})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onHeal = () => setSequence({ mode: 'heal', turn }) : () => { }}
                                />
                            </div>
                        </div>
                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[9]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>
                    </div>
                </div>
            )}

            {currentSlide === 3 && (
                <div className='relative h-screen overflow-hidden'>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})`, zIndex: 0 }} // Tambahkan zIndex jika dibutuhkan
                    ></div>


                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/story/18')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${assets.gambar.tombolNext})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>

                    {/* Elemen gambar lainnya */}
                    <div className='flex justify-between h-screen'>
                        {/* Bagian Pertama: Dewa Api dan papan textBattle */}
                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className='w-[50%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.sidhimantrastory}
                                    alt="Dewa Api"
                                    className='h-[80%] w-auto' // Mengatur gambar dalam kolom
                                />
                            </div>


                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className='mt-[-10%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>


                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className=' mt-[-14%] w-[55%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.DewaApi}
                                    alt="Dewa Api"
                                    className='h-[120%] w-[100%]' // Mengatur gambar dalam kolom
                                />
                            </div>

                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className=' mt-[-3%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>
                    </div>

                </div>

            )}


        </>
    );
};

export const Battle3 = ({ onGameEnd, onAttack, onMagic, onHeal }) => {
    const navigate = useNavigate();

    const playerMagic = Player.magic;
    const playerPhysical = Player.maxHealth;
    const playerhealth = Player.attack;
    const playerlivesteal = Player.heal;
    const playerDev = Player.defense;

    const Batu = MonsterEs.batu;
    const Health = MonsterEs.maxHealth;
    const Teriakan = MonsterEs.teriakan;
    const BadaiEs = MonsterEs.badaiSalju;
    const Dev = MonsterEs.defense;

    const img = [
        assets.gambar.sidhimantrastory,
        assets.gambar.monsterEs
    ];

    const flow = [
        { slide: 0 },
        { slide: 1 },
        { slide: 2 },
    ];
    const { id } = useParams()

    const [showAlert, setShowAlert] = useState(false);
    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // State dan hooks pertempuran
    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        loading
    } = useBattleSequence3(sequence);

    const aiChoice = useAImonsterEs(turn);

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            return navigate(`/penghubung/${Number(currentStep) + 1}`)
            // Pindah ke langkah berikutnya
        } else {
            navigate('/story/18');
        }
    };

    const handleInfoClick = () => {
        setShowAlert(true); // Menampilkan alert saat tombol info ditekan
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Menutup alert saat tombol back ditekan
    };

    // Logika AI memilih tindakan saat giliran AI
    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: aiChoice })
        }
    }, [turn, aiChoice, inSequence])

    // Mengakhiri permainan jika salah satu karakter kalah
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                if (playerHealth === 0) {
                    onGameEnd(MonsterEs); // Pemain kalah
                } else {
                    onGameEnd(Player); // Pemain menang
                }
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);


    const currentSlide = flow[currentStep].slide;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])



    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv3})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>Sepertinya kau terlalu yakin. Aku tidak akan beku begitu saja. Ayo buktikan kerasnya es mu</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[0]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Sidi Mantra</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[0]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>

                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.mageIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-magic text-[35px]'>{playerMagic}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{playerhealth}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.pysicalIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{playerPhysical}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.healIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{playerlivesteal}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{playerDev}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentSlide === 1 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv3})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>Berani sekali kau memasuki wilayah es ku, manusia. Kau akan segera menjadi patung es yang tak berguna</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[1]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Frostar</p>
                                    <div
                                        className='absolute z-0 h-[65%] w-[30%]'
                                        style={{
                                            backgroundImage: `url(${img[1]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '35%',
                                            top: '20%',
                                            pointerEvents: 'none',
                                        }}
                                    ></div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    ></button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%] z-40'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol z-50'>
                                            <img src={assets.gambar.batu} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='bg-gradient-to-t from-gradienB via-gradienM to-gradienA bg-clip-text text-transparent text-[35px]'>{Batu}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol z-50'>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{Health}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol z-50'>
                                            <img src={assets.gambar.aumanEsdanSerigla} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{Teriakan}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol z-50'>
                                            <img src={assets.gambar.badaiEs} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{BadaiEs}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol z-50'>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{Dev}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv3})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

                        <div className='relative top-[52%]'>
                            <img src={assets.gambar.sidhimantrastory} alt="" className={`absolute ml-[12%] w-[20%] mt-[-18%]`} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] left-[8%] leading-relaxed'>Sidi Mantra</p>
                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%]' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={playerHealth}
                                    maxHealth={Player.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center left-[5%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>

                        <div className='relative flex justify-end top-[2%] right-[2%]'>
                            <img src={assets.gambar.monsterEs} alt="" className={`absolute mr-[5%] w-[18%] mt-[6%] `} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] right-[20%] leading-relaxed'>Frostar</p>

                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%] ' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={opponentHealth}
                                    maxHealth={MonsterEs.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center right-[30%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>


                        <div
                            className='absolute border-gray-300 border-[1px] z-10 h-[30%] w-[99%] flex flex-row bg-papanText rounded-lg bottom-[2%] left-1/2 transform -translate-x-1/2'
                        >
                            {/* Div untuk kotak teks yang lebih panjang */}
                            <div className='relative flex-[1.5] h-full'>
                                <img src={assets.gambar.papanBattel} alt="papan" className='h-[95%] w-[100%] ml-2 mt-[0.4%] flex justify-center' />
                                <div className='absolute mt-[-14%] w-full'>
                                    <BattleAnnouncer
                                        message={announcerMessage || `apa yang dilakukan ${Player.name} ?`}
                                    />
                                </div>
                            </div>

                            {/* Div untuk tombol yang lebih kecil */}
                            <div className='flex-[1] flex items-center justify-evenly h-full w-[30%] space-x-[1%]'>
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonM})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onMagic = () => setSequence({ mode: 'magic', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: ` url(${assets.gambar.buttonA})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onAttack = () => setSequence({ mode: 'attack', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonH})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onHeal = () => setSequence({ mode: 'heal', turn }) : () => { }}
                                />
                            </div>
                        </div>
                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[9]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>
                    </div>
                </div>
            )}

            {currentSlide === 3 && (
                <div className='relative h-screen overflow-hidden'>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})`, zIndex: 0 }} // Tambahkan zIndex jika dibutuhkan
                    ></div>


                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/story/18')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${assets.gambar.tombolNext})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>

                    {/* Elemen gambar lainnya */}
                    <div className='flex justify-between h-screen'>
                        {/* Bagian Pertama: Dewa Api dan papan textBattle */}
                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className='w-[50%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.sidhimantrastory}
                                    alt="Dewa Api"
                                    className='h-[80%] w-auto' // Mengatur gambar dalam kolom
                                />
                            </div>


                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className='mt-[-10%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>


                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className=' mt-[-14%] w-[55%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.DewaApi}
                                    alt="Dewa Api"
                                    className='h-[120%] w-[100%]' // Mengatur gambar dalam kolom
                                />
                            </div>

                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className=' mt-[-3%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>
                    </div>

                </div>

            )}


        </>
    );
};

export const Battle4 = ({ onGameEnd, onAttack, onMagic, onHeal }) => {
    const navigate = useNavigate();

    const playerMagic =  Player.magic;
    const playerPhysical =  Player.attack;
    const playerhealth =  Player.heal;
    const playerlivesteal =  Player.livesteal;
    const playerDev =  Player.defense;
    const playerLv =  Player.level;

    
    const adaptasi = Buaya.adaptasi;
    const maxHealth = Buaya.maxHealth;
    const air = Buaya.air;
    const pukulan = Buaya.pukulan;
    const defense = Buaya.defense;

    const img = [
        assets.gambar.sidhimantrastory,
        assets.gambar.cockar
    ];

    const flow = [
        { slide: 0 },
        { slide: 1 },
        { slide: 2 },
        { slide: 3 },
    ];
    const { id } = useParams()

    const [showAlert, setShowAlert] = useState(false);
    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // State dan hooks pertempuran
    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        loading
    } = useBattleSequence4(sequence);

    const aiChoice =  useAibuaya(turn);

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            return navigate(`/penghubung/Battle4/${Number(currentStep) + 1}`)
            // Pindah ke langkah berikutnya
        } else {
            navigate('/story/18');
        }
    };

    const handleInfoClick = () => {
        setShowAlert(true); // Menampilkan alert saat tombol info ditekan
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Menutup alert saat tombol back ditekan
    };

    // Logika AI memilih tindakan saat giliran AI
    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: aiChoice })
        }
    }, [turn, aiChoice, inSequence])

    // Mengakhiri permainan jika salah satu karakter kalah
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                if (playerHealth === 0) {
                    onGameEnd(Buaya); // Pemain kalah
                } else {
                    onGameEnd(Player); // Pemain menang
                }
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);


    const currentSlide = flow[currentStep].slide;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])



    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv4})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Lumpur ini mungkin melambatkan langkahku, tapi itu tidak akan menghentikanku. Kau yang akan tenggelam, Crockar!"
</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[0]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Sidi Mantra</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[0]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>
                                       
                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.mageIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-magic text-[35px]'>{playerMagic}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{playerhealth}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.pysicalIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{playerPhysical}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.healIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{playerlivesteal}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{playerDev}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentSlide === 1 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv4})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Lumpur ini adalah rumahku. Setiap langkahmu mendekatkanmu pada kematian, manusia</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[1]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center">
                          <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                              <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Cockar</p>
                              <div
                                  className='z-0 absolute h-[65%] w-[30%]'
                                  style={{
                                      backgroundImage: `url(${img[1]})`,
                                      backgroundSize: 'contain',
                                      backgroundPosition: 'center',
                                      backgroundRepeat: 'no-repeat',
                                      left: '36%',
                                      top: '20%',
                                      pointerEvents: 'none',
                                  }}
                              ></div>
                              <button
                                  className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                  style={{
                                      backgroundImage: `url(${assets.gambar.back2})`,
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                      border: 'none',
                                  }}
                                  onClick={handleCloseAlert}
                              ></button>
                              <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                  <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol z-50'>
                                      <img src={assets.gambar.air} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                      <p className='text-custom-number-air text-[35px]'>{air}</p>
                                  </div>
                                  <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol z-50'>
                                      <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                      <p className='text-custom-number-healt text-[35px]'>{maxHealth}</p>
                                  </div>
                                  <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol z-50'>
                                      <img src={assets.gambar.pukulan} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                      <p className='text-custom-number-physical text-[35px]'>{pukulan}</p>
                                  </div>
                                  <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol z-50'>
                                      <img src={assets.gambar.healIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                      <p className='text-custom-number-heal text-[35px]'>{adaptasi}</p>
                                  </div>
                                  <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol z-50'>
                                      <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                      <p className='text-custom-number-dev text-[35px]'>{defense}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                        )}
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv4})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

                        <div className='relative top-[52%]'>
                            <img src={assets.gambar.sidhimantrastory} alt="" className={`absolute ml-[12%] w-[20%] mt-[-18%]`} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] left-[8%] leading-relaxed'>Sidi Mantra</p>
                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%]' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={playerHealth}
                                    maxHealth={Player.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center left-[5%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>

                        <div className='relative flex justify-end top-[2%] right-[2%]'>
                            <img src={assets.gambar.cockar} alt="" className={`absolute mr-[5%] w-[18%] mt-[5%] `} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] right-[20%] leading-relaxed'>Cockar</p>

                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%] ' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={opponentHealth}
                                    maxHealth={Buaya.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center right-[30%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>


                        <div
                            className='absolute border-gray-300 border-[1px] z-10 h-[30%] w-[99%] flex flex-row bg-papanText rounded-lg bottom-[2%] left-1/2 transform -translate-x-1/2'
                        >
                            {/* Div untuk kotak teks yang lebih panjang */}
                            <div className='relative flex-[1.5] h-full'>
                                <img src={assets.gambar.papanBattel} alt="papan" className='h-[95%] w-[100%] ml-2 mt-[0.4%] flex justify-center' />
                                <div className='absolute mt-[-14%] w-full'>
                                    <BattleAnnouncer
                                        message={announcerMessage || `apa yang dilakukan ${Player.name} ?`}
                                    />
                                </div>
                            </div>

                            {/* Div untuk tombol yang lebih kecil */}
                            <div className='flex-[1] flex items-center justify-evenly h-full w-[30%] space-x-[1%]'>
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonM})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onMagic = () => setSequence({ mode: 'magic', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: ` url(${assets.gambar.buttonA})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onAttack = () => setSequence({ mode: 'attack', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonH})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onHeal = () => setSequence({ mode: 'heal', turn }) : () => { }}
                                />
                            </div>
                        </div>
                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[9]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>
                    </div>
                </div>
            )}

            {currentSlide === 3 && (
                <div className='relative h-screen overflow-hidden'>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})`, zIndex: 0 }} // Tambahkan zIndex jika dibutuhkan
                    ></div>


                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/story/18')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${assets.gambar.tombolNext})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>

                    {/* Elemen gambar lainnya */}
                    <div className='flex justify-between h-screen'>
                        {/* Bagian Pertama: Dewa Api dan papan textBattle */}
                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className='w-[50%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.sidhimantrastory}
                                    alt="Dewa Api"
                                    className='h-[80%] w-auto' // Mengatur gambar dalam kolom
                                />
                            </div>


                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className='mt-[-10%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>


                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className=' mt-[-14%] w-[55%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.DewaApi}
                                    alt="Dewa Api"
                                    className='h-[120%] w-[100%]' // Mengatur gambar dalam kolom
                                />
                            </div>

                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className=' mt-[-3%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>
                    </div>

                </div>

            )}


        </>
    );
};

export const Battle5 = ({ onGameEnd, onAttack, onMagic, onHeal }) => {
    const navigate = useNavigate();

    const playerMagic = Player.magic;
    const playerPhysical = Player.maxHealth;
    const playerhealth = Player.attack;
    const playerlivesteal = Player.heal;
    const playerDev = Player.defense;

    const auman = Serigala.auman;
    const Health = Serigala.maxHealth;
    const Cakar = Serigala.cakaran;
    const Tendangan = Serigala.tendangan;


    const img = [
        assets.gambar.sidhimantrastory,
        assets.gambar.monsterSrigala
    ];

    const flow = [
        { slide: 0 },
        { slide: 1 },
        { slide: 2 },
    ];
    const { id } = useParams()

    const [showAlert, setShowAlert] = useState(false);
    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // State dan hooks pertempuran
    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        loading
    } = useBattleSequence5(sequence);

    const aiChoice = useAIserigala(turn);

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            return navigate(`/penghubung/${Number(currentStep) + 1}`)
            // Pindah ke langkah berikutnya
        } else {
            navigate('/story/18');
        }
    };

    const handleInfoClick = () => {
        setShowAlert(true); // Menampilkan alert saat tombol info ditekan
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Menutup alert saat tombol back ditekan
    };

    // Logika AI memilih tindakan saat giliran AI
    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: aiChoice })
        }
    }, [turn, aiChoice, inSequence])

    // Mengakhiri permainan jika salah satu karakter kalah
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                if (playerHealth === 0) {
                    onGameEnd(Serigala); // Pemain kalah
                } else {
                    onGameEnd(Player); // Pemain menang
                }
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);


    const currentSlide = flow[currentStep].slide;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])



    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv5})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'> Kau mungkin salah sasaran. Ayo tunjukan seberapa kuat kamu</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[0]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Lupor</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${img[0]})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                        }}>

                                    </div>
                                    <button
                                        className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                        style={{
                                            backgroundImage: `url(${assets.gambar.back2})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            border: 'none',
                                        }}
                                        onClick={handleCloseAlert}
                                    >
                                    </button>
                                    <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%]'>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.mageIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-magic text-[35px]'>{playerMagic}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-healt text-[35px]'>{playerhealth}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol '>
                                            <img src={assets.gambar.pysicalIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-physical text-[35px]'>{playerPhysical}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.healIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-heal text-[35px]'>{playerlivesteal}</p>
                                        </div>
                                        <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol '>
                                            <img src={assets.gambar.devIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                            <p className='text-custom-number-dev text-[35px]'>{playerDev}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentSlide === 1 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv5})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>
                        <button
                            className='absolute z-30 h-[5%] w-[5%] left-[95%] bottom-[90%]'
                            style={{
                                backgroundImage: `url(${assets.gambar.buttonI})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                border: 'none',
                            }}
                            onClick={handleInfoClick}
                        >
                        </button>

                        <div
                            className='absolute z-10 h-[28%] w-[100%] slide-ltr sliding-ltr flex flex-row ease'
                            style={{
                                backgroundImage: `url(${assets.gambar.lembar})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '3%',
                                bottom: '6%',
                            }}
                        >
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>Kau telah  memasuki wilayah ku, manusia. tidak ada yang pernah keluar hidup-hidup </p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto', // Pointer events aktif untuk button
                                    cursor: 'pointer', // Menambah efek kursor untuk menunjukkan bahwa ini tombol
                                }}
                                onClick={handleNext} // Fungsi untuk pindah ke slide berikutnya
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[1]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>

                        <div
                            className='absolute z-20'
                            style={{
                                backgroundImage: `url(${assets.gambar.gulungan})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '35%',
                                width: '100%',
                                left: '2%',
                                bottom: '3%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}
                        ></div>

                        {showAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                            <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Lupor</p>
                                <div
                                    className='z-0 absolute h-[70%] w-[30%]'
                                    style={{
                                        backgroundImage: `url(${img[1]})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        left: '36%',
                                        top: '20%',
                                        pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                                    }}
                                />
                                <button
                                    className='absolute z-30 h-[5%] w-[5%] top-[13%] left-[66%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.back2})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    onClick={handleCloseAlert}
                                />
                                <div className='flex flex-row flex-wrap justify-center items-center gap-x-16 gap-y-16 mt-[50%] relative z-10'> {/* Menambahkan z-10 di sini */}
                                    <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol'>
                                        <img src={assets.gambar.aumanEsdanSerigla} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                        <p className='text-custom-number-physical text-[35px]'>{auman}</p>
                                    </div>
                                    <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol'>
                                        <img src={assets.gambar.healtIcon} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                        <p className='text-custom-number-healt text-[35px]'>{Health}</p>
                                    </div>
                                    <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-5 items-center font-girassol'>
                                        <img src={assets.gambar.Cakar} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                        <p className='bg-gradient-to-t from-gradien3 via-gradien2 to-gradien1 bg-clip-text text-transparent text-[35px]'>{Cakar}</p>
                                    </div>
                                    <div className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol'>
                                        <img src={assets.gambar.pukulan} alt="" className='ml-3 my-1 w-[35px] h-[35px]' />
                                        <p className='text-custom-number-healt text-[35px]'>{Tendangan}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        )}
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgLv5})` }}>
                    </div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

                        <div className='relative top-[52%]'>
                            <img src={assets.gambar.sidhimantrastory} alt="" className={`absolute ml-[12%] w-[20%] mt-[-18%]`} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] left-[8%] leading-relaxed'>Sidi Mantra</p>
                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%]' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={playerHealth}
                                    maxHealth={Player.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center left-[5%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>

                        <div className='relative flex justify-end top-[2%] right-[2%]'>
                            <img src={assets.gambar.monsterSrigala} alt="" className={`absolute mr-[5%] w-[18%] mt-[6%] `} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] right-[20%] leading-relaxed'>Lupor</p>

                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%] ' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={opponentHealth}
                                    maxHealth={Serigala.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center right-[30%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>


                        <div
                            className='absolute border-gray-300 border-[1px] z-10 h-[30%] w-[99%] flex flex-row bg-papanText rounded-lg bottom-[2%] left-1/2 transform -translate-x-1/2'
                        >
                            {/* Div untuk kotak teks yang lebih panjang */}
                            <div className='relative flex-[1.5] h-full'>
                                <img src={assets.gambar.papanBattel} alt="papan" className='h-[95%] w-[100%] ml-2 mt-[0.4%] flex justify-center' />
                                <div className='absolute mt-[-14%] w-full'>
                                    <BattleAnnouncer
                                        message={announcerMessage || `apa yang dilakukan ${Player.name} ?`}
                                    />
                                </div>
                            </div>

                            {/* Div untuk tombol yang lebih kecil */}
                            <div className='flex-[1] flex items-center justify-evenly h-full w-[30%] space-x-[1%]'>
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonM})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onMagic = () => setSequence({ mode: 'magic', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: ` url(${assets.gambar.buttonA})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onAttack = () => setSequence({ mode: 'attack', turn }) : () => { }}
                                />
                                <button
                                    className='h-[50%] w-[18%]'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.buttonH})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                    onClick={!loading ? onHeal = () => setSequence({ mode: 'heal', turn }) : () => { }}
                                />
                            </div>
                        </div>
                        <div className='z-0 absolute h-[60%] w-[60%]'
                            style={{
                                backgroundImage: `url(${img[9]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                top: '0%',
                                pointerEvents: 'none', // Pastikan elemen ini tidak menghalangi klik
                            }}>
                        </div>
                    </div>
                </div>
            )}

            {currentSlide === 3 && (
                <div className='relative h-screen overflow-hidden'>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})`, zIndex: 0 }} // Tambahkan zIndex jika dibutuhkan
                    ></div>


                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/story/18')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${assets.gambar.tombolNext})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>

                    {/* Elemen gambar lainnya */}
                    <div className='flex justify-between h-screen'>
                        {/* Bagian Pertama: Dewa Api dan papan textBattle */}
                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className='w-[50%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.sidhimantrastory}
                                    alt="Dewa Api"
                                    className='h-[80%] w-auto' // Mengatur gambar dalam kolom
                                />
                            </div>


                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className='mt-[-10%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>


                        <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                            {/* Gambar Sidhimantra */}
                            <div className=' mt-[-14%] w-[55%] z-10 flex justify-center'>
                                <img
                                    src={assets.gambar.DewaApi}
                                    alt="Dewa Api"
                                    className='h-[120%] w-[100%]' // Mengatur gambar dalam kolom
                                />
                            </div>

                            {/* Papan textBattle - Ukuran diperbesar */}
                            <div className=' mt-[-3%] w-[60%] flex justify-center z-20'>
                                <img
                                    src={assets.gambar.papanBattel}
                                    alt="papan battle"
                                    className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                                />
                            </div>
                        </div>
                    </div>

                </div>

            )}


        </>
    );
};

