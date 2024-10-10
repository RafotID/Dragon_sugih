export const wait = ms =>
  new Promise(resolve => {
      setTimeout(() => {
          resolve()
      }, ms)
  })

  // Serangan Player
  export const attack = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.attack - (attacker.level - receiver.level) * 1.25;
    
      const finalDamage = receivedDamage ;
    
      return finalDamage;
    };

    export const livesteal = ({ receiver }) => {
      return receiver.livesteal + receiver.level * 0.25;
    };

    export const magic = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.magic - (attacker.level - receiver.level) * 1.25;
    
      const finalDamage = receivedDamage - receiver.magicDefense / 2;
    
      return finalDamage;
    };

    export const heal = ({ receiver }) => {
      return receiver.heal + receiver.level * 0.25;
    };


    // Serangan AI
   
    export const cakar = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.cakar - (attacker.level - receiver.level) * 1.25;
    
      const finalDamage = receivedDamage - receiver.defense / 2;
    
      return finalDamage;
    };

    export const gigit = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.gigit - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense / 2;
    
      return finalDamage;
    };

    export const lari = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.lari - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense / 2;
    
      return finalDamage;
    };
    