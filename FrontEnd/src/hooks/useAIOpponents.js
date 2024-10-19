import { useEffect, useState } from 'react';

export const useAIOpponents = (turn) => {
  const [aiChoice, setAiChoice] = useState('');

  useEffect(() => {
    // Membuat pilihan setiap kali turn berubah
    if (turn === 1) {
      const options = ['cakar', 'lari', 'gigit'];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAiChoice(choice);
    } else {
      setAiChoice('')
    }
  }, [turn]);

  return aiChoice;
};

export const useAImonsterApi = (turn) => {
  const [aiChoice, setAiChoice] = useState('');

  useEffect(() => {
    // Membuat pilihan setiap kali turn berubah
    if (turn === 1) {
      const options = ['tinjuan', 'suhuTinggi', 'suhu'];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAiChoice(choice);
    } else {
      setAiChoice('')
    }
  }, [turn]);

  return aiChoice;
};

export const useAibuaya= (turn) => {
  const [aiChoice, setAiChoice] = useState('');

  useEffect(() => {
    // Membuat pilihan setiap kali turn berubah
    if (turn === 1) {
      const options = ['air', 'adaptasi', 'pukulan'];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAiChoice(choice);
    } else {
      setAiChoice('')
    }
  }, [turn]);

  return aiChoice;
};

export const useAImonsterEs = (turn) => {
  const [aiChoice, setAiChoice] = useState('');

  useEffect(() => {
    // Membuat pilihan setiap kali turn berubah
    if (turn === 1) {
      const options = ['badaiSalju', 'batu', 'teriakan'];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAiChoice(choice);
    } else {
      setAiChoice('')
    }
  }, [turn]);

  return aiChoice;
};

export const useAIserigala= (turn) => {
  const [aiChoice, setAiChoice] = useState('');

  useEffect(() => {
    // Membuat pilihan setiap kali turn berubah
    if (turn === 1) {
      const options = ['cakaran', 'tendangan', 'auman'];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAiChoice(choice);
    } else {
      setAiChoice('')
    }
  }, [turn]);

  return aiChoice;
};
