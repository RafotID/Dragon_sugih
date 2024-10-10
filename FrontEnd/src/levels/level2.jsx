import React from 'react';
import Character from '../components/Character';

const Level2 = () => {
  return (
    <div>
      <Character
        spriteSheet="/assets/character-sprite-level2.png"
        frameWidth={64}
        frameHeight={64}
        totalFrames={4}
        speed={10}
        startX={100}
        startY={150}
        attackSheet="/assets/character-attack-level2.png"
        attackFrames={8}
      />
    </div>
  );
};

export default Level2;
