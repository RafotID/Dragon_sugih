import { assets } from '../assets/indeks';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import AudioContext from '../components/bgm/AudioContext';

const Privasi = () => {
    const { isPlaying, toggleAudio } = useContext(AudioContext);
    const navigate = useNavigate();

    // Auto play ketika halaman pertama dimuat
    useEffect(() => {
        if (!isPlaying) {
            toggleAudio(); // Mengaktifkan audio jika belum bermain
        }
    }, [isPlaying, toggleAudio]);

    const handleClick = () => {
        toggleAudio(); // Memastikan audio diputar saat tombol "Terima" diklik
        navigate('/LoadingBar');
    };

    return (
        <>
            <div
                className="bg-fixed bg-cover bg-center h-screen overflow-hidden relative"
                style={{ backgroundImage: `url(${assets.gambar.background1})` }}
            >
                {/* Gambar Caifu di kanan atas */}
                <div className='absolute top-0 right-0 m-2 sm:m-4'>
                    <img
                        src={assets.gambar.dragonCaifu}
                        alt="Dragon Caifu"
                        className='w-[100px] sm:w-[150px] md:w-[200px] z-10'
                    />
                </div>

                <div className='relative flex justify-center items-center min-h-screen p-4 sm:p-6 md:p-10'>
                    {/* Kontainer yang lebih responsif */}
                    <div className='bg-custom-gray bg-opacity-80 w-full max-w-[95%] sm:max-w-[800px] min-h-[450px] sm:min-h-[500px] md:min-h-[530px] z-10 flex-col border-2 border-black'>
                        <div className='bg-custom-green w-full h-[80px] sm:h-[100px] text-xl sm:text-2xl md:text-3xl flex items-center'>
                            <p className='ml-4 sm:ml-5 text-yellow-400 font-inter font-bold'>Pengingat privasi</p>
                        </div>

                        <p className="p-5 sm:p-7 text-lg sm:text-xl md:text-2xl font-itim">
                            Harap diperhatikan bahwa kami mengumpulkan dan menggunakan data berikut:
                        </p>

                        <ul className="list-disc list-inside px-6 sm:px-8 md:px-10 pl-16 md:pl-[14vh] sm:pl-[12vh] text-lg sm:text-xl md:text-2xl font-itim">
                            <li>Alamat email, Sandi</li>
                        </ul>

                        <p className='pt-5 sm:pt-7 font-itim pl-10 sm:pl-16 text-lg sm:text-xl md:text-2xl'>
                            Data ini digunakan untuk:
                        </p>

                        <ul className="list-disc list-inside px-6 sm:px-8 md:px-10 pl-16 md:pl-[14vh] pt-5 sm:pt-8 sm:pl-[12vh] text-lg sm:text-xl md:text-2xl font-itim">
                            <li>Identified akun, Register, Login</li>
                        </ul>

                        <div className='flex pt-16 sm:pt-10 justify-center'>
                            <div className='flex justify-between w-[80%] sm:w-[65%] md:w-[70%] text-lg sm:text-xl md:text-2xl text-black font-inter font-bold'>
                                <button 
                                    onClick={() => navigate('/signin')} 
                                    className='flex items-start justify-center w-[160px] sm:w-[150px] md:w-[170px] h-[40px] sm:h-[55px] md:h-[60px] sm:pt-[5px] bg-cover bg-center'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.button})`
                                    }}>
                                    Tolak
                                </button>
                                <button 
                                    onClick={handleClick} 
                                    className='flex items-start justify-center w-[160px] sm:w-[150px] md:w-[170px] h-[40px] sm:h-[55px] md:h-[60px] sm:pt-[5px] bg-cover bg-center'
                                    style={{
                                        backgroundImage: `url(${assets.gambar.button})`
                                    }}>
                                    Terima
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Privasi;
