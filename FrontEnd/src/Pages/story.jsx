import React, { useEffect, useState } from 'react';
import { assets } from '../assets/indeks';
import { Link, useNavigate, useParams } from 'react-router-dom';


const Story = () => {
    // Array yang menyimpan teks dialog dari semua slide
    const navigate = useNavigate()
    const dialogTexts = [
        // scene 1
        [
            "Di sebuah desa terdapat laki laki tua yang selalu berdoa kepada dewa , ia berdoa meminta seorang anak karena sudah lama ia hidup sendirian.",
            "Setelah sekian  lama  berdoa  Sidi Mantra akhirnya di beri seorang anak laki laki oleh dewa yang di beri nama Manik Angkeran",
            "Manik dalam bahasa sansakerta berarti permata, Angkeran berarti “Angker” atau misterius",
            "Waktu berlalu, Manik Angkeran tumbuh dewasa dan sangat gemar bermain judi",
            "Adegan berpindah ke keadaan keuangan yang hancur karena si Manik Angkeran yang suka berjudi dan selalu kalah",
            "Sidi Mantra yang sudah kesal akhirnya mengusir Manik Angkeran",

            "Sidi Mantra pergi ke kuil di atas  gunung untuk meminta bantuan kepada dewa",
            "lalu pergilah sidi mantra menuju kuil untuk meminta petunjuk kepada dewa agar masalahnya teratasi",

            "Adegan berpindah menuju pintu gunung , di perjalanan manik angkeran dihadang oleh monster yang menjaga wilayah tersebut",

            "setiap perjalanan, kamu akan menghadapi banyak rintangan untuk menuju gunung kamu harus melewati semua rintangan untuk melanjutkan perjalanan",

            "Di awal perjalanan bertemulah dengan penjaga pintu gunung  si Giant Super  yang menghalangi jalan",

            " di tengah perjalanan tiba tiba terdengar suara dari dalam hutan.Laba laba besar keluar dari dalam hutan menghadang Sidi mantra",

            " Sidi mantra melanjutkan perjalanan ke gunung untuk meminta petunjuk dewa",
            "kamu akan melewati hutan terbakar yang dijaga oleh Apiar sang golem api",
            "kamu akan melewati hutan salju yang dijaga oleh Frostar",
            "kamu akan melewati rawa rawa yang sangat bau dijaga oleh Crockar",
            "kamu akan melawan monster terakhir dari game ini",

        ],
        // scene 2
        [
            "Wahai dewa tolong berikan saya seorang anak agar saya tidak hidup sendirian lagi",
            "terima kasih dewa karena telah memberikan aku seorang anak , anak ini akan kuberi nama  Manik Angkeran",
            "Aku harus cepat ke puncak gunung sebelum matahari terbenam. ",
            "serangan mu memang kuat,tapi tidak membuatku patah semangat untuk menuju kepuncak gunung",
            "Udara mulai terasa sangat panas .Semoga aku bisa melewatinya tanpa terbakar.",
            "Api tidak menghentikan ku. Satu langkah lebih dekat ke tujuanku",
            "Udara dingin ini... tidak salah lagi, ini wilayah  Frostar. Aku harus terus bergerak atau beku di tempat.",
            "Ternyata, es juga bisa pecah. Saatnya lanjut sebelum mati beku.",
            "Rawa ini terasa berat... dan bau lumpur tak sedap mulai menyengat. Crockar pasti sudah mengincarku",
            "Lumpur tidak bisa menahan ku. Aku tetap berdiri kokoh mengalahka mu. Siap untuk lawan berikutnya",
            "Hutan ini penuh dengan bayangan... Aku bisa merasakan serigala mengawasi dari segala arah. Lupor pasti di sini",
            "Serangan mu tidak cukup cepat untuk menumbangkan ku",

        ],
        // scene 3
        [
            "Manik, kau sudah dewasa. ku berharap kau membuat keputusan yang bijaksana dan membawa kehormatan bagi keluarga kita.",
            "Manik, kau telah menghabiskan harta dan menumpuk hutang. Aku tidak bisa membantu mu lagi. Kau harus pergi",

        ],
        [
            "Tenang ayah, aku telah menemukan cara cepat untuk mendapatkan uang. Judi adalah jawabannya!",
            "Tidak Ayah, tolong! Beri aku satu kesempatan lagi!",

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

        { slide: 1, textTitle: 1, textIndex: 3 }, //ini dialog sebelum ke apiar
        { slide: 0, textTitle: 0, textIndex: 13 },
        { slide: 1, textTitle: 0, textIndex: 4 },

        { slide: 1, textTitle: 1, textIndex: 5 }, //ini dialog sebelum ke frostar
        { slide: 0, textTitle: 0, textIndex: 14 },
        { slide: 1, textTitle: 0, textIndex: 6 }, //22

        { slide: 1, textTitle: 1, textIndex: 7 }, //ini dialog sebelum ke buaya
        { slide: 0, textTitle: 0, textIndex: 15 },
        { slide: 1, textTitle: 0, textIndex: 8 },

        { slide: 1, textTitle: 0, textIndex: 9 }, //ini dialog sebelum serigala
        { slide: 0, textTitle: 0, textIndex: 16 },
        { slide: 1, textTitle: 0, textIndex: 10 },

        { slide: 1, textTitle: 0, textIndex: 11 },// dialog sesudah perang lawan serigala dan lanjut story menuju dewa


    ];

    const { id } = useParams()

    const [currentStep, setCurrentStep] = useState(id); // Indeks untuk mengontrol alur cerita

    // Fungsi untuk berpindah ke langkah berikutnya berdasarkan alur
    const handleNext = () => {
        if (currentStep < 16) {
            // Pindah ke slide berikutnya
            navigate(`/story/${Number(currentStep) + 1}`);
        } else if (currentStep == 16) {
            navigate("/penghubung/0");
        } else if (currentStep > 16 && currentStep < 19) {
            navigate(`/story/${Number(currentStep) + 1}`);
        } else if (currentStep == 19) {

            navigate(`/penghubung/battle2/${Number(0)}`

            )
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
                            }}>

                        </button>

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
                                {dialogTexts[1][currentIndex]} {/* Dialog Text */}
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