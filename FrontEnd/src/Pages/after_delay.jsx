import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assets } from '../assets/indeks';

function GameComponent() {
    const [actionMessage, setActionMessage] = useState('Loading');
    const [dots, setDots] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Start the delay
        const timer = setTimeout(() => {
            // Pindah ke halaman lain setelah 3 detik
            navigate('/signin'); // Ganti dengan path halaman yang diinginkan
        }, 3000);

        // Cleanup timer when component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        // Interval for adding dots animation
        const dotInterval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500); // Adjust speed of dots

        // Cleanup the interval on unmount
        return () => clearInterval(dotInterval);
    }, []);

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
            
            {/* Konten Teks di tengah */}
            <div className="flex flex-col items-center justify-center h-screen">
                <div className={`text-white text-2xl ${actionMessage === 'Loading' ? 'animate-pulse' : ''}`}>
                    {actionMessage} {actionMessage === 'Loading' && <span>{dots}</span>}
                </div>
            </div>
        </div>
    );
}

export default GameComponent;
