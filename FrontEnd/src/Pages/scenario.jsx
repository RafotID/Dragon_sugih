import { assets } from '../assets/indeks';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Scenario = () => {
    const navigate = useNavigate();

    const texT = [
        "Sidi Mantra, seorang lelaki tua yang sangat menginginkan seorang anak, Akhirnya ia dikaruniai seorang putra oleh Dewa,  yang diberi nama Manik Angkeran. Namun, seiring pertumbuhannya Manik Angkeran kecanduan judi, itu membuat kekayaan ayahnya habis dan menimbulkan hutang yang besar. Merasa putus asa dan marah ,Akhirnya Sidi Mantra terpaksa mengusirnya keluar dari rumah. Dalam keputusasaannya, Sidi Mantra meminta bantuan kepada dewa .Dengan arahan dewa , Sidi Mantra mendapat emas dari naga Basugih untuk melunasi hutang putranya",
        "Kami berterima kasih karena telah menyelesaikan perjalanan ini bersama Sidi Mantra. Kami harap cerita ini membawa makna dan pesan bagi Anda, bahwa terkadang harta yang paling berharga bukanlah emas, melainkan cinta, kebijaksanaan, dan perubahan dalam diri kita.Terima kasih telah memainkan game ini. Perjalanan Anda tidak hanya mengubah nasib karakter, tetapi juga membuka wawasan tentang nilai kehidupan. Sampai jumpa di petualangan berikutnya!"
    ];

    const flow = [
        { slide: 0, tittle: assets.gambar.scenario, text: 0, button : assets.gambar.tombolNext },
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
    const currentButton = flow[currentStep].button;

    const handleClick = () => {
        navigate('/story/0');
    };

    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen'>
                    {/* Layer background gambar */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.background2})` }}
                    >
                    </div>
                    {/* Layer hitam dengan opacity */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Tombol kiri atas */}
                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/story/0')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${currentButton})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>

                    {/* Konten halaman */}
                    <div className='relative flex flex-col items-center h-full'>
                        {/* Gambar Sidhimantra */}
                        <img
                            src={currentTitle}
                            alt="Sidhimantra"
                            className='w-[350px] sm:w-[450px] md:w-[500px] pt-40 h-auto object-contain sm:pt-32 md:pt-16 lg:pt-[8vh]'
                        />

                        {/* Gambar BarText di bagian bawah */}
                        <div className='absolute bottom-3 flex justify-center w-full px-3 sm:px-5 sm:pb-8 md:px-[7%] lg:px-[10%]'>
                            <div className='relative flex justify-center w-full h-full'>
                                <img
                                    src={assets.gambar.barTextLarge}
                                    alt="Bar Text"
                                    className='h-full w-full object-contain'
                                />

                                <div className='absolute pb-6 sm:pt-9 top-0 left-0 w-full h-full flex items-center justify-center md:overflow-y-scroll overflow-y-scroll scrollbar-hide'>
                                    <p className='text-black px-3 sm:px-5 md:px-10 font-poppins text-center text-base sm:text-[100%] md:text-[110%] lg:text-[185%] leading-relaxed sm:leading-[1.75] md:leading-[1.8] lg:leading-[1.6]'>
                                        {texT[currentText]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Scenario;
