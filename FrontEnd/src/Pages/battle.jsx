import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/indeks';
import '../PusatCss/polygon.css';
import { Playerdetail } from '../components/Player/Playerdetail';
import { BattleAnnouncer } from '../components/BattleAnnouncer/BattleAnnouncer';
import { useBattleSequence, useAIOpponents } from '../hooks'; // import hooks yang diperlukan
import { playerStats, opponentStats, wait } from '../shared'; // import data statistik pemain dan lawa


export const Battle = ({ onGameEnd, onAttack, onMagic, onHeal }) => {
    const navigate = useNavigate();

    const playerStatsArray = [
        { name: "Magic", value: playerStats.magic, icon: assets.gambar.mageIcon, style: 'text-custom-number-magic' },
        { name: "Heal", value: playerStats.heal, icon: assets.gambar.healtIcon, style: 'text-custom-number-healt' },
        { name: "Physical", value: playerStats.attack, icon: assets.gambar.pysicalIcon, style: 'text-custom-number-physical' },
        { name: "Lifesteal", value: playerStats.livesteal, icon: assets.gambar.healIcon, style: 'text-custom-number-heal' },
        { name: "Defense", value: playerStats.defense, icon: assets.gambar.devIcon, style: 'text-custom-number-dev' },
    ];

    const SpiderStatsArray = [
        { name: "Heald", value: opponentStats.maxHealth, icon: assets.gambar.healtIcon, style: 'text-custom-number-magic' },
        { name: "Lari", value: opponentStats.lari, icon: assets.gambar.lari, style: 'text-custom-number-healt' },
        { name: "Dev", value: opponentStats.magicDefense, icon: assets.gambar.devIcon, style: 'text-custom-number-physical' },
        { name: "gigit", value: playerStats.livesteal, icon: assets.gambar.healIcon, style: 'text-custom-number-heal' },
        { name: "Defense", value: playerStats.defense, icon: assets.gambar.devIcon, style: 'text-custom-number-dev' },
    ];

    const ApiarStatsArray = [
        { name: "Magic", value: playerStats.magic, icon: assets.gambar.mageIcon, style: 'text-custom-number-magic' },
        { name: "Heal", value: playerStats.heal, icon: assets.gambar.healtIcon, style: 'text-custom-number-healt' },
        { name: "Physical", value: playerStats.attack, icon: assets.gambar.pysicalIcon, style: 'text-custom-number-physical' },
        { name: "Lifesteal", value: playerStats.livesteal, icon: assets.gambar.healIcon, style: 'text-custom-number-heal' },
        { name: "Defense", value: playerStats.defense, icon: assets.gambar.devIcon, style: 'text-custom-number-dev' },
    ];

    const Textdialog = 
    [
        ["Laba laba! . . . . jangan menghalangi jalanku, aku harus ke atas gunung ini untuk mencapai tujuanku!",
        "Aku tidak datang untuk berurusan denganmu, tapi jika ini harus terjadi, baiklah. Panasmu tidak akan menghentikanku!"],

        ["Ssssssssiapa yang berani memasuki wilayah ku? berani sekali manusia sepertimu menginjakkan kaki disini !",
        "Manusia bodoh! Kau pikir bisa melewati wilayahku begitu saja? Kau akan terbakar sebelum mencapai tujuanmu"
        ]
    ]


    const flow = [
         // sidhi percakapan
        { slide: 0, bg: assets.gambar.bgBattle, alert: playerStatsArray, charakter: assets.gambar.sidhimantrastory, dialog:0 }, 
        // spider percakapan
        {
            slide: 1, bg: assets.gambar.bgBattle, alert: SpiderStatsArray, charakter: assets.gambar.spider,
            namecharakter: "Giant Spider", dialog:0
        },
        //battle
        { slide: 2, bg: assets.gambar.bgBattle, charakter: assets.gambar.spider },
        // sidhi percakapan 2
        { slide: 0, bg: assets.gambar.bgLv2, alert: playerStatsArray, charakter: assets.gambar.sidhimantrastory,
            dialog:1
        },
        // Apiar percakapan
        {
            slide: 1, bg: assets.gambar.bgLv2, alert: ApiarStatsArray, charakter: assets.gambar.golemApi,
            namecharakter: "Apiar", dialog:1
        },
        //battle 2
        { slide: 2, bg: assets.gambar.bgLv2, charakter: assets.gambar.golemApi}
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
                    onGameEnd(opponentStats); // Pemain kalah
                } else {
                    onGameEnd(playerStats); // Pemain menang
                }
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);


    const currentSlide = flow[currentStep].slide;
    const currentAlert = flow[currentStep]?.alert;
    const currentBg = flow[currentStep].bg;
    const currentCharakter = flow[currentStep].charakter;
    const currentNameCharakter = flow[currentStep].namecharakter;
    const currentDialog = flow[currentStep].dialog;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])



    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentBg})` }}>
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
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>{Textdialog[0][currentDialog]}</p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    pointerEvents: 'auto',
                                    cursor: 'pointer',
                                }}
                                onClick={handleNext}
                            >
                            </button>
                        </div>

                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${currentCharakter})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none',
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
                                pointerEvents: 'none',
                            }}
                        ></div>

                        {showAlert && currentAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">Sidi Mantra</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${currentCharakter})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            left: '43%',
                                            top: '20%',
                                            pointerEvents: 'none',
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
                                        {currentAlert
                                            .filter(stat => stat.name !== "PlayersLv")
                                            .map((stat, index) => (
                                                <div
                                                    key={index}
                                                    className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol'
                                                >
                                                    <img
                                                        src={stat.icon}
                                                        alt=""
                                                        className='ml-3 my-1 w-[35px] h-[35px]'
                                                    />
                                                    <p className={`${stat.style} text-[35px]`}>{stat.value}</p>
                                                </div>
                                            ))}
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
                        style={{ backgroundImage: `url(${currentBg})` }}>
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
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>{Textdialog[1][currentDialog]}</p>
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
                                backgroundImage: `url(${currentCharakter})`,
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

                        {showAlert && currentAlert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                                <div className="bg-custom-bg-info bg-opacity-[97%] p-6 shadow-md w-[40%] h-[80%] justify-center items-center">
                                    <p className="mt-[0%] flex justify-center text-[5vh] font-girassol text-white">{currentNameCharakter}</p>
                                    <div className='z-0 absolute h-[30%] w-[15%]'
                                        style={{
                                            backgroundImage: `url(${currentCharakter})`,
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
                                        {currentAlert
                                            .filter(stat => stat.name !== "PlayersLv") // Menghilangkan objek PlayersLv
                                            .map((stat, index) => (
                                                <div
                                                    key={index}
                                                    className='bg-custom-div w-[25%] h-[15%] flex flex-row gap-6 items-center font-girassol'
                                                >
                                                    <img
                                                        src={stat.icon}
                                                        alt=""
                                                        className='ml-3 my-1 w-[35px] h-[35px]'
                                                    />
                                                    <p className={`${stat.style} text-[35px]`}>{stat.value}</p>
                                                </div>
                                            ))}
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
                        style={{ backgroundImage: `url(${currentBg})` }}>
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
                                    maxHealth={playerStats.maxHealth}
                                />
                            </div>

                            <div className='absolute flex justify-center items-center left-[5%] mt-[3.5%]'>
                                <div className='absolute hexagon z-20 '></div> {/* Atur top di sini */}
                                <div className='absolute hexagon1 z-10 '></div> {/* Atur top di sini */}
                                <p className='absolute text-white text-[9vh] mt-[10px] font-jua z-30'>1</p>
                            </div>

                        </div>

                        <div className='relative flex justify-end top-[2%] right-[2%]'>
                            <img src={currentCharakter} alt="" className={`absolute mr-[5%] w-[18%] mt-[3%] `} />
                            <p className='absolute z-30 font-girassol text-white text-[3vh] mt-[0.5%] right-[20%] leading-relaxed'>Giant Spider</p>

                            <img src={assets.gambar.barH} alt="papan" className='absolute ml-[3%] w-[32%] ' />

                            <div className='absolute w-[29%] z-10 ml-[6%] mt-[2.2%]'>
                                <Playerdetail
                                    health={opponentHealth}
                                    maxHealth={opponentStats.maxHealth}
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
                                        message={announcerMessage || `apa yang dilakukan ${playerStats.name} ?`}
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
