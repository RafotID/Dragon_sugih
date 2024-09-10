import React from 'react';
import { assets } from '../assets/indeks';

const Login = () => {
    return (
        <div
            className="bg-fixed bg-cover bg-center h-screen relative"
            style={{ backgroundImage: `url(${assets.gambar.background1})` }}
        >
            {/* Gambar Caifu di kanan atas */}
            <div className='absolute top-0 right-0 m-4'>
                <img src={assets.gambar.dragonCaifu} alt="Dragon Caifu"
                    className='w-[150px] md:w-[200px] z-10' />
            </div>

            {/* Konten Login di tengah */}
            <div className="flex items-center justify-center h-full p-10">
                <div className="bg-white p-8 rounded-[40px] shadow-lg max-w-[1000px] max-h-[500px] w-full h-full bg-opacity-45 md:w-[800px]   ">
                    <h2 className="text-6xl  mb-4 text-center font-inria-serif text-white">Sign in</h2>
                    <div className='flex justify-center text-3xl font-inika'>
                        <div className='border-white bg-white border-2 bg-opacity-50 w-[400px] h-[60px] flex items-center justify-center'>
                            <h3 className='text-white'>
                                Sign in
                            </h3>
                        </div>
                        <div className='border-white bg-white bg-opacity-50 border-2 w-[400px] h-[60px] flex items-center justify-center'>
                            <h3 className='text-white'>
                                Sign up
                            </h3>
                        </div>
                    </div>
                    <form>
                        <div className="mb-4 mt-6 flex justify-end items-center relative">

                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 border border-gray-300 rounded bg-custom-gray placeholder-white"
                                placeholder="Email"
                            />
                            <img src={assets.gambar.iconEmail} alt="icon email" className='absolute mr-7 w-6' />

                        </div>

                        <div className="mb-4 flex justify-end items-center relative">

                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded bg-custom-gray placeholder-white"
                                placeholder="Password"
                            />

                            <img src={assets.gambar.iconPassword} alt="icon gembok" className='absolute mr-7 w-6' />

                        </div>
                        <div className='mt-10 font-inika'>
                            <p>forgotten password ? </p>
                            <button
                                type="submit"
                                className="w-full text-white p-2 rounded hover:bg-blue-600 text-3xl bg-custom-gray"
                            >
                                Sign in
                            </button>
                            <p className='text-center'>don't have an account? sign up</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            id='submit-login'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
