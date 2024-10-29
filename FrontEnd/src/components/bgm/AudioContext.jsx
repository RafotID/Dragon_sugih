import React, { createContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import bgmStory from '../../assets/bgmStory.mp3'; // Impor langsung

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(bgmStory)); // Gunakan impor langsung
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;

    // Mulai atau berhenti audio berdasarkan isPlaying
    if (isPlaying) {
      audio.play().catch((error) => console.error("Audio Play Error:", error));
    } else {
      audio.pause();
    }

    return () => {
      // Bersihkan audio ketika tidak digunakan
      audio.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    const path = location.pathname;
    const shouldPlayAudio = [
      '/Privasi', 
      '/Caracter', 
      '/sidhimantra', 
      '/ManikAngkeran', 
      '/NagaBasugih', 
      '/PercakapanDewaApi', 
      // Gunakan regex untuk mencocokkan path '/Scenario/:id'
      /^\/Scenario\/\d+$/,
      /^\/PercakapanNaga\/\d+$/ 
    ].some(route => typeof route === 'string' ? path.startsWith(route) : route.test(path)) || 
    path.match(/^\/story\/\d+$/);

    if (shouldPlayAudio) {
      setIsPlaying(true); // Mulai audio jika di halaman yang benar
    } else {
      setIsPlaying(false); // Hentikan audio di halaman lain
    }
  }, [location.pathname]);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
