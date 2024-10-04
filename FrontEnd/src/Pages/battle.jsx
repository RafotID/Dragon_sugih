import React, { useState, useEffect } from 'react';
import { assets } from '../assets/indeks';
import '../PusatCss/polygon.css';
import { Playerdetail } from '../Component/Player/Playerdetail';
import { BattleAnnouncer } from '../Component/BattleAnnouncer/BattleAnnouncer';
import { useBattleSequence, useAIOpponents } from '../hooks'; // import hooks yang diperlukan
import { playerStats, opponentStats, wait } from '../shared'; // import data statistik pemain dan lawan
import { styles } from '../Component/Battle/styles.module.css'

const Battle = ({ onGameEnd }) => {
    const img = [
        assets.gambar.sidhimantrastory,
        assets.gambar.spider
    ];

    const flow = [
        { slide: 1 },
        { slide: 0 },
        { slide: 1 },
        { slide: 2 },
    ];
    const [showAlert, setShowAlert] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // Indeks untuk mengontrol alur cerita

    // State dan hooks pertempuran
    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation
    } = useBattleSequence(sequence);

    const aiChoice = useAIOpponents(turn);

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            setCurrentStep(currentStep + 1); // Pindah ke langkah berikutnya
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
            setSequence({ turn, mode: aiChoice });
        }
    }, [turn, aiChoice, inSequence]);

    // Mengakhiri permainan jika salah satu karakter kalah
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(1000);
                onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);

    const currentSlide = flow[currentStep].slide;
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
                                    <p className="mt-[-30%] flex justify-center text-[8px] font-girassol text-white">Sidi Mantra</p>
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
                                        <p className="mt-[80%] flex justify-center text-[7px] font-girassol text-white">Level 44</p>
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
                            <img src={assets.gambar.spider} alt="" className={`absolute mr-[5%] w-[18%] mt-[3%] `} />
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
                                    onAttack={() => setSequence({ mode: 'magic', turn })}
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
                                    onClick={() => setSequence({ mode: 'attack', turn })}
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
                                    onClick={() => setSequence({ mode: 'heal', turn })}
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

        </>
    );
};

export default Battle;