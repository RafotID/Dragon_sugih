import React, { useEffect, useState } from 'react';
import { assets } from '../assets/indeks';
import { useNavigate, useParams } from 'react-router-dom';

const Story = () => {
    // Array yang menyimpan teks dialog dari semua slide
    const navigate = useNavigate()
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

    const { id } = useParams()

    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            // setCurrentStep(currentStep + 1);
            return navigate(`/story/${Number(currentStep) + 1}`)
        } else {
            navigate("/battle"); // Pindah halaman ke "/battle" setelah langkah terakhir
        }
    };
    const currentSlide = flow[currentStep].slide;
    const currentIndex = flow[currentStep].textIndex;
    const currentTitle = flow[currentStep].textTitle;

    useEffect(() => {
        setCurrentStep(id)
    }, [id])


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

                        <p className="absolute flex justify-center items-center  w-[50%] h-[10%] top-[1.5vh] left-[24.5%] right-[15%] text-center text-custom-grey-text font-jomhuria text-[4.9vh] sm:text-[60px] md:text-[6vh] lg:text-[5.5vh] leading-relaxed z-10">
                            {title[0][currentTitle]} {/* Title */}
                        </p>

                        <p className="absolute h-[22vh] top-[17vh] sm:top-[19vh] md:top-[17vh] lg:top-[18vh] left-[8%] right-[8%] text-center text-black font-poppins text-[2.6vh] sm:text-[3.5vh] lg:text-[3.2vh] leading-relaxed z-10 px-10 overflow-y-scroll scrollbar-hide sm:h-[22vh]">
                            {dialogTexts[0][currentIndex]} {/* Dialog Text */}
                        </p>

                        <button
                            onClick={handleNext}
                            className="absolute bottom-[8%] sm:bottom-[6%] left-[10%] flex justify-center items-center w-[80%] h-[10%] sm:h-[13%] z-10"
                            style={{
                                backgroundImage: `url(${assets.gambar.button2})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
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
                    <div className="relative flex items-center justify-between w-full sm:flex-col sm:ml-[4vh] md:flex-col flex-col h-full md:-top-20 lg:flex-row">
                        {/* Bagian Gambar */}
                        <div className="w-full lg:bottom-[-15%] md:w-[90%] sm:w-[90%] relative h-full flex justify-center items-end">
                            <img
                                src={assets.gambar.sidhimantrastory}
                                alt="Sidhimantra"
                                className="h-[80%]  sm:h-[90%] sm:w-[90%] md:h-[80%] lg:h-[90%] w-[90%] max-w-full mx-auto"
                            />
                        </div>


                        {/* Bagian Teks */}
                        <div className="relative -top-24 w-full sm:right-5 sm:w-full mt-5 lg:mt-[35%]">
                            <img
                                src={assets.gambar.PapanText}
                                alt="Papan Teks"
                                className="mx-auto px-6 pb-[5%] h-[50vh] sm:h-[54vh] md:h-[55vh] lg:h-[55vh]  lg:w-[80vh] "
                            />
                            <p className="absolute flex justify-center items-center h-[9.9%] w-[50%] top-[1.6vh]  lg:top-[1.5vh] left-[25%] right-[10%] text-center text-custom-grey-text font-jomhuria text-5xl lg:text-[7vh] leading-relaxed sm:text-[7vh] z-10">
                                {title[0][currentTitle]} {/* Title */}
                            </p>
                            <p className="absolute h-[20vh] lg:left-[23%] lg:p-0 lg:right-[22%] lg:top-[30%] lg:h-[24vh] top-[30%] text-[2.6vh] sm:top-[28%] sm:h-[26vh] sm:text-[3.3vh] sm:py-6 md:px-10 lg:px-[1vh] left-[7%] right-[7%] text-center text-black font-poppins text-2xl lg:text-[3.5vh] md:text-[3.5vh] leading-relaxed z-10 px-10 sm:overflow-y-scroll overflow-y-scroll scrollbar-hide">
                                {dialogTexts[0][currentIndex]} {/* Dialog Text */}
                            </p>
                            <button
                                onClick={handleNext}
                                className="absolute bottom-[12%] sm:bottom-[6%] md:bottom-[12%] lg:bottom-[13%] left-[15.5%] flex justify-center items-center w-[70%] h-[10%] sm:h-[13%] z-10"
                                style={{
                                    backgroundImage: `url(${assets.gambar.button2})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    transform: 'rotateY(180deg)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Slide 3 */}
            {currentSlide === 2 && (
                <div className="bg-fixed bg-cover bg-center h-screen relative flex justify-center items-center w-full overflow-hidden lg:justify-between"
                    style={{ backgroundImage: `url(${assets.gambar.bgPercakapan})` }}
                >
                    <div>
                        <div className="absolute -left-3 md:left-[-4%] w-[40vh] flex items-center justify-between z-0 sm:flex-col sm:ml-[4vh] md:flex-col flex-col h-full md:top-[-40%] lg:flex-col -top-[38%] lg:left-[2%] lg:w-[70vh] lg:top-[-23vh]">
                            {/* Bagian Gambar */}
                            <div className="w-full lg:bottom-[-15%] md:w-[90%] md:top-[2%] sm:w-[90%] relative h-full flex justify-center items-end lg:top-[20%]">
                                <img
                                    src={assets.gambar.sidhimantrastory}
                                    alt="Sidhimantra"
                                    className="h-[50%] sm:h-[90%] sm:w-[90%] md:w-[100%] md:h-[55%] lg:h-[80%] w-[90%] max-w-full mx-auto"
                                />
                            </div>


                            {/* Bagian Teks */}
                            <div className="relative -top-28 w-full sm:right-5 sm:w-full mt-5 sm:top-[-30%] md:top-[-15%] lg:mt-[35%]">
                                <img
                                    src={assets.gambar.PapanText}
                                    alt="Papan Teks"
                                    className="mx-auto px-6 pb-[5%] h-[135%] sm:h-[54%] md:h-[175%] lg:h-[55vh] lg:w-[80vh]"
                                />
                                <p className="absolute flex justify-center items-center h-[9.9%] w-[50%] top-[1vh] md:text-[4vh] md:top-[8%] lg:top-[1.5vh] left-[25%] right-[10%] text-center text-custom-grey-text font-jomhuria text-[4vh] lg:text-[7vh] leading-relaxed sm:text-[7vh] z-10 ">
                                    {title[0][currentTitle]} {/* Title */}
                                </p>
                                <p className="absolute h-[69%] w-[90%] lg:left-[15%] lg:p-0 lg:right-[22%] lg:top-[33%] lg:h-[24vh] top-[38%] text-[1.8vh] sm:top-[28%] sm:h-[26vh] sm:text-[3.3vh] sm:py-6 md:px-[10%] md:text-[2.2vh] md:top-[40%] lg:px-[1vh] left-[5.5%] right-[7%] text-center text-black font-poppins text-2xl lg:text-[3.5vh] leading-relaxed z-10 px-10 sm:overflow-y-scroll overflow-y-scroll scrollbar-hide lg:w-[70%]">
                                    {dialogTexts[2][currentIndex]} {/* Dialog Text */}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleNext}
                            className="absolute bottom-[1%] sm:bottom-[6%] md:bottom-[12%] md:left-[15%] lg:bottom-[1%] left-[2%] flex justify-center items-center w-[20%] h-[10%] lg:w-[7%] lg:left-[47%] sm:h-[13%] z-10"
                            style={{
                                backgroundImage: `url(${assets.gambar.button2})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                transform: 'rotateY(180deg)',
                            }}
                        />
                    </div>

                    <div>
                        <div className="absolute right-[-4%] w-[40vh] flex items-center justify-between z-0 sm:flex-col sm:ml-[4vh] md:flex-col flex-col h-full md:top-[-10%] lg:flex-col top-[10%] lg:right-[0%] lg:w-[70vh] lg:top-[-5%]">
                            {/* Bagian Gambar */}
                            <div className="w-full lg:bottom-[-15%] md:w-[90%] sm:w-[90%] relative h-full flex justify-center items-end lg:top-[20%]">
                                <img
                                    src={assets.gambar.manik}
                                    alt="Sidhimantra"
                                    className="h-[40%] sm:h-[90%] sm:w-[90%] md:h-[48%] lg:h-[80%] lg:w-[70%] w-[70%] max-w-full mx-auto"
                                />
                            </div>


                            {/* Bagian Teks */}
                            <div className="relative -top-28 w-full sm:right-5 sm:w-full mt-5 sm:top-[-30%] md:top-[-15%] lg:mt-[35%]">
                                <img
                                    src={assets.gambar.PapanText}
                                    alt="Papan Teks"
                                    className="mx-auto px-6 pb-[5%] h-[135%] sm:h-[54%] md:h-[175%] lg:h-[55vh] lg:w-[80vh]"
                                />
                                <p className="absolute flex justify-center items-center h-[9.9%] w-[50%] top-[1vh] md:text-[4vh] md:top-[8%] lg:top-[1.5vh] left-[25%] right-[10%] text-center text-custom-grey-text font-jomhuria text-[4vh] lg:text-[7vh] leading-relaxed sm:text-[7vh] z-10 ">
                                    {title[1][currentTitle]} {/* Title */}
                                </p>
                                <p className="absolute h-[69%] w-[90%] lg:left-[15%] lg:p-0 lg:right-[22%] lg:top-[33%] lg:h-[24vh] top-[38%] text-[1.8vh] sm:top-[28%] sm:h-[26vh] sm:text-[3.3vh] sm:py-6 md:px-[10%] md:text-[2.2vh] md:top-[40%] lg:px-[1vh] left-[5.5%] right-[7%] text-center text-black font-poppins text-2xl lg:text-[3.5vh] leading-relaxed z-10 px-10 sm:overflow-y-scroll overflow-y-scroll scrollbar-hide lg:w-[70%]">
                                    {dialogTexts[3][currentIndex]} {/* Dialog Text */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>



            )}

        </>
    );
};

export default Story;