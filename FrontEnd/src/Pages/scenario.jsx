import { assets } from '../assets/indeks'
import React from 'react'

const Sidhimantra = () => {
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
                <button
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
                    src={assets.gambar.scenario}
                    alt="Sidhimantra"
                    className='w-[350px] sm:w-[450px] md:w-[500px] pt-40 h-auto object-contain sm:pt-32 md:pt-16 lg:pt-[8vh]'
                />

                {/* Gambar BarText di bagian bawah */}
                <div className='absolute bottom-3 flex justify-center w-full px-3 sm:px-5 sm:pb-8 md:px-[7%] lg:px-[10%]'>
                    <div className='relative flex justify-center w-full h-full'>
                        <img
                            src={assets.gambar.barTextLarge}
                            alt="Bar Text"
                            className='h-full w-full object-contain '
                        />

                        <div className='absolute pb-6 pt-auto py-auto sm:pt-9 sm:py-5 top-0 left-0 w-full h-full flex items-center justify-center md:overflow-y-scroll overflow-y-scroll scrollbar-hide'>
                            <p className='text-black px-3 sm:px-5 md:px-10  font-poppins text-center text-base sm:text-[100%] md:text-[110%] lg:text-[185%] leading-relaxed sm:leading-[1.75] md:leading-[1.8] lg:leading-[1.6] '>
                                In a village, Sidi Mantra, an old man who desperately wanted an heir, was finally blessed with a son named Manik Angkeran. However, as he grew older, Manik Angkeran became entangled in a gambling addiction, which destroyed his father's wealth and incurred huge debts. Feeling desperate, Sidi Mantra was forced to kick him out of the house. Manik Angkeran slept under a tree and in desperation, Sidi Mantra sought the help of the gods. With their guidance, he got gold from the dragon Basugih to pay off his son's debt.
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Sidhimantra;
