import React from 'react';
import Character from '../Component/Character';

const Level1 = () => {
  return (
    <div> 
      <Character
        spriteSheet="/spritelist.png"
        frameWidth={70}
        frameHeight={20}
        totalFrames={3}
        speed={10}
        startX={500}
        startY={200}
        attackSheet="/spritelist.png"
        attackFrames={6}
      />
    </div>
  );
};

export default Level1;
