import React, { useState } from 'react';
import { assets } from '../assets/indeks';

const Story = () => {
    // Array yang menyimpan teks dialog dari semua slide
    const dialogTexts = [
        // scene 1
        [
            "Di sebuah desa terdapat laki laki tua yang selalu berdoa kepada dewa untuk meminta momongan",
            "Setelah sekian lama berdoa, Sidi Mantra dikaruniai seorang anak laki-laki",
            "Manik dalam bahasa Sanskerta berarti permata, Angkeran berarti 'Angker' atau misterius",
            "Waktu berlalu, Manik Angkeran tumbuh dewasa",
            "Adegan berpindah ke keadaan keuangan yang hancur karena si Manik Angkeran yang suka berjudi dan selalu kalah",
            "Sidi Mantra yang sudah kesal lalu Sidi Mantra mengusir Manik Angkeran",
            "Adegan campur tangan dewa Sidi Mantra pergi ke gunung untuk meminta bantuan dewa",
            "pergilah manik angkeran menuju gunung untuk meminta petunjuk kepada dewa",
            "Adegan berpindah menuju gunung dan peperangan",
            "Di setiap jalan Sidi mantra akan melewati banyak rintangan ada lima rintangan untuk menuju gunung kamu harus melewati untuk melanjutkan perjalanan",
            "Di awal perjalanan bertemulah dengan penjaga pintu gunung  Giant Super",
            " Tiba tiba terdengar suara dari dalam hutan.Giant Spider keluar dari dalam hutan menghadang sidi mantra"
        ],
        // scene 2
        [
            "Wahai dewa tolong berikan saya momongan agar saya tidak hidup sendirian",
            "Akhirnya, doaku dikabulkan! Aku dikaruniai seorang putra, ku beri nama Manik Angkeran",
            "Aku harus cepat ke puncak gunung sebelum matahari terbenam. Langit mulai gelap",

        ],
        // scene 3
        [
            "Manik, kau sudah dewasa. ku berharap kau membuat keputusan yang bijaksana dan membawa kehormatan bagi keluarga kita.",
            "Manik, kau telah menghabiskan harta dan menumpuk utang. Aku tidak bisa membantu mu lagi. Kau harus pergi",

        ],
        [
            "Ayah, aku telah menemukan cara cepat untuk mendapatkan uang. Judi adalah jawabannya!",
            "Ayah, tolong! Beri aku satu kesempatan lagi!",

        ]
    ];

    const title = [
        [
            "Kisah Perjalan",
            "Dialog",
            "Info Penting",
            "Sidi Mantra",
            "Sekilas Info",
        ],
        [
            "Kisah Perjalan",
            "Dialog",
            "Info Penting",
            "Manik Angkeran",
        ]
    ]

    // Array yang menentukan alur slide dan indeks teks
    const flow = [
        { slide: 0, textTitle: 0, textIndex: 0 },
        { slide: 1, textTitle: 1, textIndex: 0 },
        { slide: 0, textTitle: 0, textIndex: 1 },
        { slide: 1, textTitle: 1, textIndex: 1 },
        { slide: 0, textTitle: 4, textIndex: 2 },
        { slide: 0, textTitle: 0, textIndex: 3 },
        { slide: 2, textTitle: 3, textIndex: 0 },
        { slide: 0, textTitle: 0, textIndex: 4 },
        { slide: 2, textTitle: 3, textIndex: 1 },
        { slide: 0, textTitle: 0, textIndex: 5 },
        { slide: 0, textTitle: 0, textIndex: 6 },
        { slide: 0, textTitle: 0, textIndex: 7 },
        { slide: 0, textTitle: 0, textIndex: 8 },
        { slide: 0, textTitle: 2, textIndex: 9 },
        { slide: 0, textTitle: 0, textIndex: 10 },
        { slide: 1, textTitle: 1, textIndex: 2 },
        { slide: 0, textTitle: 0, textIndex: 11 },
    ];

    const [currentStep, setCurrentStep] = useState(0); // Indeks untuk mengontrol alur cerita

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            setCurrentStep(currentStep + 1); // Pindah ke langkah berikutnya
        }
    };

    const currentSlide = flow[currentStep].slide;
    const currentIndex = flow[currentStep].textIndex;
    const currentTitle = flow[currentStep].textTitle;

    return (
        <>
            {/* Slide 1 */}
            {currentSlide === 0 && (
                <div
                    className="bg-fixed bg-cover bg-center h-screen relative flex justify-center items-center"
                    style={{ backgroundImage: `url(${assets.gambar.bgPercakapan})` }}
                >
                    <div className="relative">
                        <img src={assets.gambar.PapanText} alt="Papan Teks" className="mx-auto px-5 h-[50vh]" />

                        <p className="absolute flex justify-center items-center  w-[50%] h-[10%] top-[1.3vh] left-[24.5%] right-[15%] text-center text-custom-grey-text font-jomhuria text-[33px] sm:text-[60px] md:text-[60px] lg:text-[42px] leading-relaxed z-10">
                            {title[0][currentTitle]} {/* Title */}
                        </p>

                        <p className="absolute h-[22vh] top-[17vh] sm:top-[19vh] md:top-[19vh] lg:top-[18vh] left-[8%] right-[8%] text-center text-black font-poppins text-[18px] sm:text-[34px] lg:text-[3.3vh] leading-relaxed z-10 px-10 overflow-y-scroll scrollbar-hide sm:h-[22vh]">
                            {dialogTexts[0][currentIndex]} {/* Dialog Text */}
                        </p>

                        <button
                            onClick={handleNext}
                            className="absolute bottom-[8%] sm:bottom-[6%] left-[10%] flex justify-center items-center w-[80%] h-[10%] sm:h-[13%] z-10"
                            style={{
                                backgroundImage: `url(${assets.gambar.button2})`,
                                backgroundSize: 'contain',
                                backgroundPosition : 'center',
                                backgroundRepeat: 'no-repeat',
                                transform: 'rotateY(180deg)',
                            }}
                        />
                    </div>
                </div>

            )}

            {/* Slide 2 */}
            {currentSlide === 1 && (
                <div className="bg-fixed bg-cover bg-center h-screen relative flex justify-center items-center w-full overflow-hidden"
                    style={{ backgroundImage: `url(${assets.gambar.bgPercakapan})` }}
                >
                    <div className="relative flex items-center justify-between w-full sm:flex-row flex-col h-full">
                        {/* Bagian Gambar */}
                        <div className="w-full sm:w-[90%] relative h-full flex justify-center items-end">
                            <img
                                src={assets.gambar.sidhimantrastory}
                                alt="Sidhimantra"
                                className="h-[60vh] sm:h-[85vh] md:h-[85vh] lg:h-[80vh] sm:w-[70vh] w-[90%] max-w-full mx-auto"
                            />
                        </div>


                        {/* Bagian Teks */}
                        <div className="relative -top-24 w-full sm:right-5 sm:w-full mt-5 sm:mt-80  ">
                            <img
                                src={assets.gambar.PapanText}
                                alt="Papan Teks"
                                className="mx-auto px-6 h-[50vh] sm:h-[54vh] md:h-[55vh] lg:h-[55vh]  lg:w-[80vh]"
                            />
                            <p className="absolute flex justify-center items-center h-[9.9%] w-[50%] top-[1.6vh] md:top-[-1vh] lg:top-[-1vh] left-[25%] right-[10%] text-center text-custom-grey-text font-jomhuria text-5xl lg:text-[7vh] leading-relaxed z-10">
                                {title[0][currentTitle]} {/* Title */}
                            </p>
                            <p className="absolute lg:left-[23%] lg:p-0 lg:right-[22%] lg:top-[35%] lg:h-[24vh] top-[130px] sm:top-[120px] sm:h-[26vh] sm:py-6 md:px-10 lg:px-[1vh] left-[7%] right-[7%] text-center text-black font-poppins text-2xl lg:text-[3.5vh] leading-relaxed z-10 px-10 sm:overflow-y-scroll overflow-y-scroll scrollbar-hide">
                                {dialogTexts[0][currentIndex]} {/* Dialog Text */}
                            </p>
                            <button
                                onClick={handleNext}
                                className="absolute w-[80px] sm:w-[150px] h-[50px] sm:h-[55px] z-20"
                                style={{
                                    backgroundImage: `url(${assets.gambar.button2})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    left: '48%',
                                    bottom: '3.2vh',
                                    transform: 'translateX(-50%) rotateY(180deg)',
                                }}
                            />
                        </div>
                    </div>
                </div>



            )}

            {currentSlide === 2 && (
                <div
                className="bg-fixed bg-cover bg-center h-screen relative flex justify-end items-end"
                style={{ backgroundImage: `url(${assets.gambar.bgPercakapan})` }}
            >
                <div className="relative flex items-end justify-evenly w-[100%]">
                    <div className="relative w-1/2 flex justify-start">
                        <img src={assets.gambar.sidhimantrastory} alt="Mantra" className="mx-auto h-[40vh] sm:h-[60vh] w-[62vh] left-16 absolute -top-[360px] " />
                        <img src={assets.gambar.PapanText} alt="Papan Teks" className=" pl-10 h-[385px] w-[550px] z-30 " />
                        <p className="absolute flex justify-center items-center text-center text-custom-grey-text font-jomhuria px-[212px] text-[45px] leading-relaxed top-[-5px] pl-[38%] z-30">
                            {title[0][currentTitle]} {/* title dari slide 3 */}
                        </p>
                        <p className="absolute w-[400px] inset-0 flex justify-center items-center text-center text-black font-poppins ml-24 text-2xl leading-[1.5] pt-14 z-50">
                            {dialogTexts[2][currentIndex]} {/* Teks dari slide 3 */}
                        </p>
                    </div>
                    <div className='w-[50vh] flex justify-center pl-10'>
                        <button
                            onClick={handleNext}
                            className="absolute w-[80px] sm:w-[150px] h-[50px] sm:h-[55px] xs "
                            style={{
                                backgroundImage: `url(${assets.gambar.button2})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                bottom: '15px',
                                left: '44%',
                                transform: 'rotateY(180deg)',
                            }}
                        />
                    </div>
                    <div className="relative w-1/2 flex justify-end">
                        <p className="absolute z-50 flex items-center text-center text-custom-grey-text font-jomhuria pr-[33.5%] text-[45px] leading-relaxed top-[-5px]">
                            {title[1][currentTitle]} {/* title dari slide 1 */}
                        </p>
                        <img src={assets.gambar.PapanText} alt="Papan Teks" className="pr-10 h-[385px] w-[550px] z-30" />
                        <img src={assets.gambar.manik} alt="Manik" className="mx-auto h-[40vh] absolute -top-56 pr-40" />
                        <p className="absolute w-[400px] inset-0 flex justify-center items-center text-center text-black font-poppins ml-[20%] text-2xl leading-[1.5] pt-16 z-50">
                            {dialogTexts[3][currentIndex]} {/* Teks dari slide 2 */}
                        </p>
                    </div>
                </div>
            </div>
            )}

        </>
    );
};

export default Story;