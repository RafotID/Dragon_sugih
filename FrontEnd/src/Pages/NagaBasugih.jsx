import React from 'react'
import { assets } from '../assets/indeks';
import { useNavigate } from 'react-router-dom';
const NagaBasugih = () => {

    const navigate = useNavigate ();
    
    return (
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
            <div className='absolute pt-3 pl-2 sm:pl-6 sm:pt-6 z-20'>
                <button onClick={() => navigate ('/Caracter')}
                    className='w-[80px] pl-20 sm:w-[150px]  md:w-[150px] h-[50px] sm:h-[55px] md:h-[60px]'
                    style={{
                        backgroundImage: `url(${assets.gambar.button2})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>

            {/* Konten halaman */}
            <div className='relative flex flex-col items-center h-full'>
                {/* Gambar Sidhimantra */}
                <img
                    src={assets.gambar.NagaBasugih}
                    alt="Sidhimantra"
                    className='w-[300px] sm:w-[350px] md:w-[350px] h-auto object-contain pt-8 sm:pt-8 md:pt-0'
                />

                {/* Gambar BarText di bagian bawah */}
                <div className='absolute bottom-8 flex justify-center w-full h-48 px-3 sm:h-48 sm:px-5 md:h-52'>
                    <div className='relative flex justify-center w-full h-full'>
                        <img
                            src={assets.gambar.barText}
                            alt="Bar Text"
                            className='h-auto w-full object-contain'
                        />

                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                            <p className='text-black px-[10%] font-inria-serif text-center font-bold text-lg sm:text-2xl md:text-4xl lg:text-5xl'>
                            naga emas dalam legenda
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NagaBasugih;