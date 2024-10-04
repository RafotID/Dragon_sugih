import { useEffect, useState } from 'react';

export const useAIOpponents = (turn) => {
  const [aiChoice, setAiChoice] = useState('');
  const [hasChosen, setHasChosen] = useState(false); // State untuk melacak apakah AI sudah memilih

  useEffect(() => {
    if (turn === 1 && !hasChosen) {
      const options = ['attack', 'magic', 'heal'];
      setAiChoice(options[Math.floor(Math.random() * options.length)]);
      setHasChosen(true); // Tandai bahwa AI sudah membuat pilihan
      console.log(1);
    } else if (turn > 1) {
      setHasChosen(false); // Reset ketika turn berubah
    }
  }, [turn, hasChosen]);

  return aiChoice;
};
