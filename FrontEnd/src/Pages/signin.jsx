import React, { useState } from 'react';
import { assets } from '../assets/indeks';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, auth } from '../firebase';
import axiosInstance from '../Component/api/axiosInstance'; // Mengimpor Axios instance
import Swal from 'sweetalert2'

const Signin = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            // Kirim data token ke backend menggunakan Axios instance
            await axiosInstance.post('/login', { token }).then((res) => {
                console.log('User UID:', res.data);
                const { statusCode, message, data } = res.data;

                if (statusCode === 200) {
                    console.log(statusCode, message, data);

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Sign In Success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/LoadingBar'); // Redirect setelah berhasil login
                }

                setLoading(false);
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email atau username salah",
            });
            setError('gagal login');
            setLoading(false);
            console.log(error);
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
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className='absolute top-0 right-0 m-2 sm:m-4'>
                <img
                    src={assets.gambar.dragonCaifu}
                    alt="Dragon Caifu"
                    className='w-[100px] sm:w-[150px] md:w-[200px] z-10'
                />
            </div>

            {/* Konten halaman */}
            <div className="relative flex items-center justify-center h-full p-10">
                <div className="bg-custom-green-bg p-8 rounded-[40px] shadow-lg max-w-[1000px] max-h-[500px] w-full h-full bg-opacity-65 md:w-[800px]">
                    <h2 className="text-6xl mb-4 text-center font-inria-serif text-custom-green-text">Sign in</h2>
                    <div className='flex justify-center text-3xl font-inika'>
                        <div className='border-custom-grey-border bg-custom-gray border-[1px] bg-opacity-55 w-[400px] h-[60px] flex items-center justify-center'>
                            <h3 className='text-custom-green-text'>
                                <Link to="/signin" className="hover:underline">Sign in</Link>
                            </h3>
                        </div>
                        <div className='border-white bg-custom-green-signup border-[1px] w-[400px] h-[60px] flex items-center justify-center'>
                            <h3 className='text-custom-green-text-Signup'>
                                <Link to="/signup" className="hover:underline">Sign up</Link>
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-6 mt-8 flex justify-end items-center relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded bg-custom-grey-input bg-opacity-55 placeholder-custom-green-text font-poppins"
                                placeholder="Email"
                            />
                            <img src={assets.gambar.iconEmail} alt="icon email" className='absolute mr-7 w-6' />
                        </div>

                        <div className="mb-4 flex justify-end items-center relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded bg-custom-grey-input bg-opacity-55 placeholder-custom-green-text font-poppins"
                                placeholder="Password"
                            />
                            <img src={assets.gambar.iconPassword} alt="icon gembok" className='absolute mr-7 w-6' />
                        </div>

                        <div className='mt-8 font-inika'>
                            <p className='mb-1'>forgotten password ? </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white p-2 rounded hover:bg-custom-green-signup text-3xl bg-custom-green-singnin&signup"
                            >
                                 {loading ? "Loading ..." : "Sign up"}
                            </button>
                            <p className='text-center text-[20px] mt-2'>don't have an account? sign up</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;
