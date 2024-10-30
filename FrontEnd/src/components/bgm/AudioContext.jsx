import React, { createContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import bgmStory from '../../assets/bgmStory.mp3'; // Impor langsung

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const bgmAudioRef = useRef(null); // Referensi audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Lacak interaksi
  const location = useLocation();

  // Inisialisasi audio saat komponen dimount
  useEffect(() => {
    bgmAudioRef.current = new Audio(bgmStory);
    const bgmAudio = bgmAudioRef.current;
    bgmAudio.loop = true;
    bgmAudio.volume = 0.5;

    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        sessionStorage.setItem('hasInteracted', 'true'); // Simpan status interaksi
      }
      if (isPlaying) {
        bgmAudio.play().catch((e) => console.log('Autoplay blocked:', e));
      }
    };

    // Dengarkan interaksi pengguna (klik atau gerakan mouse)
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('mousemove', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
      bgmAudio.pause(); // Bersihkan audio saat unmount
    };
  }, [isPlaying, hasInteracted]);

  useEffect(() => {
    // Cek jika pengguna sudah berinteraksi sebelumnya
    const wasInteracted = sessionStorage.getItem('hasInteracted') === 'true';
    if (wasInteracted) {
      setHasInteracted(true);
    }
  }, []);

  useEffect(() => {
    const bgmAudio = bgmAudioRef.current;

    if (isPlaying && hasInteracted) {
      bgmAudio.play().catch((error) => console.error('Audio Play Error:', error));
    } else {
      bgmAudio.pause();
    }

    return () => {
      bgmAudio.pause();
    };
  }, [isPlaying, hasInteracted]);

  useEffect(() => {
    const path = location.pathname;
    const routesToMatch = [
      '/Privasi',
      '/Caracter',
      '/sidhimantra',
      '/ManikAngkeran',
      '/NagaBasugih',
      '/PercakapanDewaApi',
    ];

    const regexRoutes = [/^\/Scenario\/\d+$/, /^\/PercakapanNaga\/\d+$/, /^\/story\/\d+$/];

    const shouldPlayAudio =
      routesToMatch.some(route => path.startsWith(route)) ||
      regexRoutes.some(regex => regex.test(path));

    setIsPlaying(shouldPlayAudio);
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
