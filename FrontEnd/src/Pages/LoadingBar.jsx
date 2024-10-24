// components/DNA_LoadingBar.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/indeks';
import '../components/style.css';

const DNA_LoadingBar = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Mengalihkan ke halaman berikutnya setelah 5 detik
    const timer = setTimeout(() => {
      navigate("/Caracter"); // Ganti "/Caracter" dengan route tujuan Anda
    }, 5000);

    // Menambahkan titik-titik "..."
    const dotInterval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500); // Setiap 0,5 detik menambahkan titik

    // Membersihkan timer dan interval saat komponen di-unmount
    return () => {
      clearTimeout(timer);
      clearInterval(dotInterval);
    };
  }, [navigate]);

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.gambar.background1})` }}
      ></div>

      <div className="flex flex-col justify-end items-center min-h-screen bg-black bg-opacity-60">
        {/* Tulisan Loading dengan titik-titik */}
        <h1 className="text-4xl font-bold text-white mb-4 z-10">
          Loading{dots}
        </h1>

        {/* Loading Bar */}
        <div className="relative w-1/2 h-4 bg-gray-300 rounded-full overflow-hidden z-10 mb-[5%]">
          <div className="absolute left-0 top-0 h-full animate-multi-color-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default DNA_LoadingBar;
