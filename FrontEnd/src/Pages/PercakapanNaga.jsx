import React from 'react'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PercakapanNaga = () => {
    const navigate = useNavigate();

    const texT = [
        "Sidi Mantra, seorang lelaki tua yang sangat menginginkan seorang anak, Akhirnya ia dikaruniai seorang putra oleh Dewa,  yang diberi nama Manik Angkeran. Namun, seiring pertumbuhannya Manik Angkeran kecanduan judi, itu membuat kekayaan ayahnya habis dan menimbulkan hutang yang besar. Merasa putus asa dan marah ,Akhirnya Sidi Mantra terpaksa mengusirnya keluar dari rumah. Dalam keputusasaannya, Sidi Mantra meminta bantuan kepada dewa .Dengan arahan dewa , Sidi Mantra mendapat emas dari naga Basugih untuk melunasi hutang putranya",
        "Kami berterima kasih karena telah menyelesaikan perjalanan ini bersama Sidi Mantra. Kami harap cerita ini membawa makna dan pesan bagi Anda, bahwa terkadang harta yang paling berharga bukanlah emas, melainkan cinta, kebijaksanaan, dan perubahan dalam diri kita.Terima kasih telah memainkan game ini. Perjalanan Anda tidak hanya mengubah nasib karakter, tetapi juga membuka wawasan tentang nilai kehidupan. Sampai jumpa di petualangan berikutnya!"
    ];


    const flow = [
        { slide: 0, tittle: assets.gambar.scenario, text: 0 },
        { slide: 0, tittle: assets.gambar.tmksh, text: 1 }
    ];
    const { id } = useParams();

    const [currentStep, setCurrentStep] = useState(id);

    useEffect(() => {
        setCurrentStep(id)
    }, [id])

    const currentSlide = flow[currentStep].slide;
    const currentTitle = flow[currentStep].tittle;
    const currentText = flow[currentStep].text;

    return (
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
                                    <p className='text-custom-number-physical text-[35px]'>{playerattack}</p>
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
    )
}

export default PercakapanNaga