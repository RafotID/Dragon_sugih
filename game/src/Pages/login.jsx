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
            <div className="flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded-[40px] shadow-lg max-w-[400] max-h-[400px] w-full h-full bg-opacity-45 md:w-[1000px] md:h-700">
                    <h2 className="text-4xl font-bold mb-4 text-center font-inria-serif">Sign in</h2>
                    <div className='flex justify-between text-3xl'>
                        <div className='border-white'>
                            <h3>
                                Sign in
                            </h3>
                        </div>
                        <div>
                            <h3>
                                sign up
                            </h3>
                        </div>
                    </div>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
