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
    
      const finalDamage = receivedDamage - receiver.defense / 2  ;
    
      return finalDamage;
    };

    export const livesteal = ({ receiver }) => {
      return receiver.livesteal + receiver.level * 0.25;
    };

    export const magic = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.magic - (attacker.level - receiver.level) * 1.25;
    
      const finalDamage = receivedDamage - receiver.defense / 2;
    
      return finalDamage;
    };

    export const heal = ({ receiver }) => {
      return receiver.heal + receiver.level * 0.25;
    };


    // Serangan GiantSpider
   
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

    //serangan MonsterApi 

    export const suhu = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.suhu - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage;
    
      return finalDamage;
    };

    export const suhuTinggi = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.suhuTinggi - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage ;
    
      return finalDamage;
    };
    
    export const tinjuan = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.tinjuan - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense / 2;
    
      return finalDamage;
    };
    
    // serangan monsterEs
    export const batu = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.batu - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense/2;
    
      return finalDamage;
    };
    

    export const teriakan = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.teriakan - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage ;
    
      return finalDamage;
    };
    

    export const badaiSalju = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.badaiSalju - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense/ 2;
    
      return finalDamage;
    };

    // serangan Buaya
    export const air = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.air - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense/ 2;
    
      return finalDamage;
    };

    export const adaptasi = ({ receiver }) => {
      return receiver.adaptasi + receiver.level * 0.25;
    };
    
    export const pukulan = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.pukulan - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense/ 2;
    
      return finalDamage;
    };

    // serangan serigala
    export const cakaran = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.cakaran - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage ;
    
      return finalDamage;
    };

     export const auman = ({ receiver }) => {
      return receiver.auman + receiver.level * 0.25;
    };

    export const tendangan = ({ attacker, receiver }) => {
      const receivedDamage =
        attacker.tendangan - (attacker.level - receiver.level) * 1.25;

    
      const finalDamage = receivedDamage - receiver.defense/ 2;
    
      return finalDamage;
    };
    
    