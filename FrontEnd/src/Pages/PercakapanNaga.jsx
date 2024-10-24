import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/indeks';

const PercakapanNaga = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    

    const texT = [
        "Siapa kau, dan apa urusanmu . . . ?",
        "Namaku sidi Mantra, ku datang kesini untuk memohon bantuanmu Naga Basugih!",
        "Sidi mantra kembali ke desanya tanpa membawa emas, tetapi dengan kebijaksanaan baru. Ia menyadari bahwa kekayaan sejati bukanlah harta, melainkan cinta dan bimbingan untuk anaknya. Melihat perubahan ayahnya, sang anak memutuskan untuk meninggalkan kebiasaan buruknya dan memulai hidup baru. Bersama, mereka menatap masa depan yang lebih cerah, dengan harapan dan tekad yang lebih kuat."
    ];

    const flow = [
        { slide: 0, tittle: assets.gambar.naga, text: 0 },
        { slide: 1, tittle: assets.gambar.sidhimantrastory, text: 1 },
        { slide: 2, text: 2 }
    ];

    const [currentStep, setCurrentStep] = useState(Number(id));

    useEffect(() => {
        setCurrentStep(Number(id));
    }, [id]);

    const handleNext = () => {
        if (currentStep < flow.length - 1) {
            navigate(`/PercakapanNaga/${Number(currentStep) + 1}`);
        }
    };



    const currentSlide = flow[currentStep].slide;
    const currentTitle = flow[currentStep].tittle;
    const currentText = flow[currentStep].text;

    return (
        <>
            {currentSlide === 0 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgDewa})` }}
                    ></div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

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
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>
                                {texT[currentText]}
                            </p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleNext}
                            ></button>
                        </div>

                        {/* Fix the issue here by correctly referencing currentTitle */}
                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${currentTitle})`, // Use the correct reference from flow
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none',
                            }}
                        ></div>

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
                    </div>
                </div>
            )}
            {currentSlide === 1 && (
                <div className='relative h-screen overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${assets.gambar.bgDewa})` }}
                    ></div>

                    <div className='bg-gradient-to-r from-custom-linier-1 via-custom-linier-2 to-custom-linier-3 opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='bg-gradient-to-t from-custom-linier-4 via-custom-linier-5 to-transparent h-[30%] top-[70%] opacity-[50%] absolute inset-0'>
                    </div>

                    <div className='relative h-screen'>

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
                            <p className='justify-center items-center flex font-poppins text-[25px] pl-20'>
                                {texT[currentText]}
                            </p>
                            <button
                                className='absolute z-50 h-[20%] w-[28%] left-[92%] bottom-[20%]'
                                style={{
                                    backgroundImage: `url(${assets.gambar.buttonN})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleNext}
                            ></button>
                        </div>

                        {/* Fix the issue here by correctly referencing currentTitle */}
                        <div className='z-0 absolute h-[100%] w-[60%]'
                            style={{
                                backgroundImage: `url(${currentTitle})`, // Use the correct reference from flow
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                left: '20%',
                                bottom: '0%',
                                pointerEvents: 'none',
                            }}
                        ></div>

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
                    </div>
                </div>
            )}
            {currentSlide === 2 && (
                <div className='relative h-screen overflow-hidden'>
                    <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                        <button onClick={() => navigate('/Scenario/1')}
                            className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                            style={{
                                backgroundImage: `url(${assets.gambar.tombolNext})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </div>
                    <div
                        className="absolute flex justify-center items-center inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: `url(${assets.gambar.bgBattle})` }}>

                        <div className="bg-white bg-opacity-[70%] absolute flex justify-center items-center p-4 shadow-lg rounded-lg w-[80%] h-[70%] z-10">
                            <p className='justify-center items-center flex font-poppins text-[5vh] px-20 text-center'>
                                {texT[currentText]}
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default PercakapanNaga;
