import { useState } from 'react'
import { assets } from '../assets/indeks';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Kirim data register ke backend untuk dibuatkan user di Firebase Authentication
            const response = await axios.post('http://localhost:5000/signup', {
                email,
                password,
            });
            console.log('User UID:', response.data.uid);

            alert('Registration successful!');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className='relative h-screen'>
            {/* Layer background gambar */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${assets.gambar.background1})` }}
            ></div>

            {/* Layer hitam dengan opacity */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Konten utama di luar pengaruh layer hitam */}
            <div className="relative flex items-center justify-center h-full p-10">
                <div className="bg-custom-green-bg p-8 rounded-[40px] shadow-lg max-w-[1000px] max-h-[500px] w-full h-full bg-opacity-65 md:w-[800px]">
                    <h2 className="text-6xl mb-4 text-center font-inria-serif text-custom-green-text">Sign up</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-11 mt-12 flex justify-end items-center relative">
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 border border-gray-300 rounded bg-custom-grey-input bg-opacity-55 placeholder-custom-green-text font-poppins"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <img src={assets.gambar.iconEmail} alt="icon email" className='absolute mr-7 w-6' />
                        </div>

                        <div className="mb-4 flex justify-end items-center relative">
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded bg-custom-grey-input bg-opacity-55 placeholder-custom-green-text font-poppins"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img src={assets.gambar.iconPassword} alt="icon gembok" className='absolute mr-7 w-6' />
                        </div>

                        <div className='mt-10 font-inika'>
                            <p className='mb-1'>forgotten password?</p>
                            <button
                                type="submit"
                                className="w-full text-white p-2 rounded hover:bg-custom-green-signup text-3xl bg-custom-green-singnin&signup"
                            >
                                Sign up
                            </button>
                            <div className='mt-8 '>
                                <Link to="/signin" className="hover:underline text-2xl">
                                
                                    <button className='flex items-center gap-x-1 font-poppins text-custom-blue-buuton'>
                                    <img src={assets.gambar.back} alt="" /> back
                                    </button>
                                    </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Signup;
