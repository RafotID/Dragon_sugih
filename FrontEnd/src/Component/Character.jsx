import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const Character = ({ spriteSheet, frameWidth, frameHeight, totalFrames, speed, startX, startY, attackSheet, attackFrames }) => {
  const [frame, setFrame] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [position, setPosition] = useState({ x: startX, y: startY });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAttacking) {
        setFrame((prevFrame) => (prevFrame + 1) % attackFrames);
      } else {
        setFrame((prevFrame) => (prevFrame + 1) % totalFrames);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isAttacking, totalFrames, attackFrames]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + speed }));
        break;
      case 'ArrowLeft':
        setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - speed }));
        break;
      case 'ArrowUp':
        setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - speed }));
        break;
      case 'ArrowDown':
        setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + speed }));
        break;
      case ' ':
        setIsAttacking(true);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === ' ') {
      setIsAttacking(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const spriteStyles = {
    width: `${frameWidth}px`,
    height: `${frameHeight}px`,
    backgroundImage: isAttacking ? `url(${attackSheet})` : `url(${spriteSheet})`,
    backgroundPosition: `-${frame * frameWidth}px 0px`,
    position: 'absolute',
  };

  return (
    <motion.div
      style={spriteStyles}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 100 }}
    />
  );
};

export default Character;
