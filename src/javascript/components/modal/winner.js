import { showModal } from "./modal";

export function showWinnerModal(fighter) {
  //my code
  const winner = {
    title: 'He is a winner!!!',
    bodyElement: fighter.name
  }
  
  showModal(winner);

  setTimeout(() => {
    location.reload();
  }, 3000);
  // call showModal function 
}
