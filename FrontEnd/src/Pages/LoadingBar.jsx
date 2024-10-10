import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/indeks';
import '../components/style.css'; 

const DNA_LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100); // update progress setiap 100ms (10 detik untuk mencapai 100%)

    if (progress === 100) {
      clearInterval(interval);
      navigate("/Caracter"); // pindah halaman setelah loading selesai
    }

    return () => clearInterval(interval);
  }, [progress, navigate]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${assets.gambar.background1})` }}>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-[80vw] h-[20vh]">
          {/* Heliks DNA */}
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              {/* Heliks kiri */}
              <path
                d={`M${50 + (index * 150)},50 Q${90 + (index * 150)},100 ${130 + (index * 150)},50 T${250 + (index * 150)},50`}
                stroke={`url(#grad${(index % 2) + 1})`}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (1000 * (progress / 100))}
                className="animate-flow"
              />
              {/* Heliks kanan */}
              <path
                d={`M${50 + (index * 150)},150 Q${90 + (index * 150)},100 ${130 + (index * 150)},150 T${250 + (index * 150)},150`}
                stroke={`url(#grad${((index + 1) % 2) + 1})`}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (1000 * (progress / 100))}
                className="animate-flow"
              />
              {/* Garis penghubung */}
              <path
                d={`M${70 + (index * 150)},50 L${70 + (index * 150)},150`}
                stroke={`url(#grad${(index % 2) + 1})`}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M${110 + (index * 150)},50 L${110 + (index * 150)},150`}
                stroke={`url(#grad${((index + 1) % 2) + 1})`}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </React.Fragment>
          ))}
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} /> {/* Merah */}
              <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 1 }} /> {/* Hitam */}
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#8F00FF", stopOpacity: 1 }} /> {/* Hitam */}
              <stop offset="100%" style={{ stopColor: "#8F00FF", stopOpacity: 1 }} /> {/* Merah */}
            </linearGradient>
          </defs>
          {/* Bentuk berubah-ubah di sepanjang heliks */}
          <circle
            cx={`${(progress / 100) * 800}`}
            cy="100"
            r="10" // Ukuran lingkaran diubah menjadi lebih besar
            fill="transparent"
            stroke="#FFFFFF" // Lingkaran berwarna putih
            strokeWidth="10"
            className="animate-shape"
          />
          {/* Progresif bar */}
          <path
            d={`M0,100 L${(progress / 100) * 800},100`}
            stroke="#FFFFFF"
            strokeWidth="6"
            fill="none"
            className="progressive-bar"
          />
        </svg>
      </div>
    </div>
  );
};

export default DNA_LoadingBar;
