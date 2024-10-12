import { useEffect, useState } from 'react';

export const useAIOpponents = (turn) => {
  const [aiChoice, setAiChoice] = useState('');

  useEffect(() => {
    // Membuat pilihan setiap kali turn berubah
    if (turn === 1) {
      const options = ['cakar', 'lari', 'gigit'];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAiChoice(choice);
      console.log(`AI memilih: ${choice}`);
    } else {
      setAiChoice('')
    }
  }, [turn]);

  return aiChoice;
};
