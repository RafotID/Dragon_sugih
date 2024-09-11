import React from 'react'
import { assets } from '../assets/indeks';
const Privasi = () => {
    return (
        <>
            <div
                className="bg-fixed bg-cover bg-center h-screen relative"
                style={{ backgroundImage: `url(${assets.gambar.background1})` }}
            >
                {/* Gambar Caifu di kanan atas */}
                <div className='absolute top-0 right-0 m-4'>
                    <img src={assets.gambar.dragonCaifu} alt="Dragon Caifu"
                        className='w-[150px] md:w-[200px] z-5' />
                </div>

                <div className='bg-custom-gray bg-opacity-40 w-1250 h-730 z-10 flex-col'>
                    <div className='bg-custom-green w-315 h-179 text-3xl flex'>
                        <p>Pengingat privasi</p>
                    </div>

                    <p>Harap diperhatikan bahwa kami mengumpulkan dan menggunakan data
                        berikut:

                        Nama akun, Alamat email, Sandi

                        Data ini digunakan untuk:

                        Identified akun, Register, Login
                    </p>

                    <div>
                        <div>

                        </div>
                    </div>
                </div>





            </div>


        </>

    )
}

export default Privasi