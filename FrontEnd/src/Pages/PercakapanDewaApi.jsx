import React from 'react'
import { assets } from '../assets/indeks'
import { useNavigate } from 'react-router-dom'

const PercakapanDewaApi = () => {
    
const navigate = useNavigate ();
       

    return (
        <div className='relative h-screen overflow-hidden'>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${assets.gambar.bgBattle})`, zIndex: 0 }} // Tambahkan zIndex jika dibutuhkan
            ></div>


            <div className='absolute flex justify-end w-screen pt-3 sm:pl-6 sm:pt-6 z-20'>
                <button onClick={() => navigate('/story/31')}
                    className='w-[50px]  pl-10 sm:w-[100px] md:w-[100px] h-[50px] sm:h-[55px] md:h-[60px]'
                    style={{
                        backgroundImage: `url(${assets.gambar.tombolNext})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>

            {/* Elemen gambar lainnya */}
            <div className='flex justify-between h-screen'>
                {/* Bagian Pertama: Dewa Api dan papan textBattle */}
                <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                    {/* Gambar Sidhimantra */}
                    <div className='w-[50%] z-10 flex justify-center'>
                        <img
                            src={assets.gambar.sidhimantrastory}
                            alt="Dewa Api"
                            className='h-[80%] w-auto' // Mengatur gambar dalam kolom
                        />
                    </div>


                    {/* Papan textBattle - Ukuran diperbesar */}
                    <div className='mt-[-10%] w-[60%] flex justify-center z-20'>
                     
                        <img
                            src={assets.gambar.papanBattel}
                            alt="papan battle"
                            className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                        />
                    </div>
                </div>


                <div className='flex flex-col justify-center items-center h-full w-[50%]'>
                    {/* Gambar Sidhimantra */}
                    <div className=' mt-[-14%] w-[55%] z-10 flex justify-center'>
                        <img
                            src={assets.gambar.DewaApi}
                            alt="Dewa Api"
                            className='h-[120%] w-[100%]' // Mengatur gambar dalam kolom
                        />
                    </div>

                    {/* Papan textBattle - Ukuran diperbesar */}
                    <div className=' mt-[-3%] w-[60%] flex justify-center z-20'>
                        <img
                            src={assets.gambar.papanBattel}
                            alt="papan battle"
                            className="h-[200%] w-[120%]" // Membuat papan lebih besar dari ukuran sebelumnya
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PercakapanDewaApi