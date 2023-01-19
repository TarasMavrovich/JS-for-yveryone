import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    //my code
    const maxHealthFirstFighter = firstFighter.health;
    const maxHealthSecondFighter = secondFighter.health;

    let firstFighterIsBlocking = false;
    let secondFighterIsBlocking = false;

    let firstFighterCritIsReady = true;
    let firstFighterCombo = [...controls.PlayerOneCriticalHitCombination];

    let secondFighterCritIsReady = true;
    let secondFighterCombo = [...controls.PlayerTwoCriticalHitCombination];

    function checkFirstFighterHealth() {
      let width = firstFighter.health / maxHealthFirstFighter * 100 + '%';
      if(firstFighter.health <= 0) {
          width =  0 + '%';
          resolve(secondFighter);
      }
      document.getElementById('left-fighter-indicator').style.width = width;
    }

    function checkSecondFighterHealth() {
      let width = secondFighter.health / maxHealthSecondFighter * 100 + '%';
      if(secondFighter.health <= 0){
          width =  0 + '%';
          resolve(firstFighter);
      }
      document.getElementById('right-fighter-indicator').style.width = width;
    }

    document.addEventListener('keydown', function(event) {
      // First player block
      if(event.code == controls.PlayerOneBlock){
        firstFighterIsBlocking = true;
      }
      // Second player block
      if(event.code == controls.PlayerTwoBlock){
        secondFighterIsBlocking = true;
      }
      // First player crit combo
      for (let index = 0; index < controls.PlayerOneCriticalHitCombination.length; index++) {
        if(event.code == controls.PlayerOneCriticalHitCombination[index]) {
          firstFighterCombo.forEach(key => {
            if(key == event.code) {
              firstFighterCombo.splice(firstFighterCombo.indexOf(event.code), 1);
              if(firstFighterCombo.length == 0 && firstFighterCritIsReady) {
                firstFighterCritIsReady = false;
                secondFighter.health -= firstFighter.attack * 2;
                setTimeout(() => {
                    firstFighterCritIsReady = true;
                }, 10000);
                checkSecondFighterHealth();
              }
            }
          });
        }
      }
      // Second player crit combo
      for (let index = 0; index < controls.PlayerTwoCriticalHitCombination.length; index++) {
        if(event.code == controls.PlayerTwoCriticalHitCombination[index]) {
          secondFighterCombo.forEach(key => {
            if(key == event.code) {
              secondFighterCombo.splice(secondFighterCombo.indexOf(event.code), 1);
              if(secondFighterCombo.length == 0 && secondFighterCritIsReady) {
                secondFighterCritIsReady = false;
                firstFighter.health -= secondFighter.attack * 2;
                setTimeout(() => {
                  secondFighterCritIsReady = true;
                }, 10000);
                checkFirstFighterHealth();
              }
            }
          });
        }
      }
    })

    document.addEventListener('keyup', function(event) {
      // First player stop block
      if(event.code == controls.PlayerOneBlock) {
        firstFighterIsBlocking = false;
      }
      // Second player stop block
      if(event.code == controls.PlayerTwoBlock) {
        secondFighterIsBlocking = false;
      }
      // First player attack
      if(event.code == controls.PlayerOneAttack && !firstFighterIsBlocking) {
        const damage = secondFighterIsBlocking ? getDamage(firstFighter, secondFighter) : getHitPower(firstFighter);
        secondFighter.health -= damage;
        checkSecondFighterHealth();
      }
      // Second player attack
      if(event.code == controls.PlayerTwoAttack && !secondFighterIsBlocking){
        const damage = firstFighterIsBlocking ? getDamage(secondFighter, firstFighter) : getHitPower(secondFighter);
        firstFighter.health -= damage;
        checkFirstFighterHealth();
      }
      // First player undo combo
      for (let index = 0; index < controls.PlayerOneCriticalHitCombination.length; index++) {
        if(event.code == controls.PlayerOneCriticalHitCombination[index]){
          firstFighterCombo = [...controls.PlayerOneCriticalHitCombination];
        }
      }
      // Second player undo combo
      for (let index = 0; index < controls.PlayerTwoCriticalHitCombination.length; index++) {
        if(event.code == controls.PlayerTwoCriticalHitCombination[index]){
          secondFighterCombo = [...controls.PlayerTwoCriticalHitCombination];
        }
      }
    })
    // if (firstFighter)
  });
}

export function getDamage(attacker, defender) {
  const getDamage =  getHitPower(attacker) - getBlockPower(defender);
  return getDamage > 0 ? getDamage : 0;
  // return damage
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance
  // return hit power
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance
  // return block power
}
