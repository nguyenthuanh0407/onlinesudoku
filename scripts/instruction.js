//Instruction
const instructionBoard = document.getElementById('nothing');
const instructionButton = document.querySelector('.how-to-play-button');
let showInstruction = false;

const instructions = [
  "1. Enter a sudoku puzzle in the grid, then press 'Start game' to start solving the puzzle. Once you're done, submit it.",
  '2. Sudoku rule: Each row, column and 3x3 box needs to be filled out with the numbers 1-9, without repeating any numbers.',
  "3. The 'Check error' button will check for contradictions in the grid.",
  "4. Hold 'Shift' to select multiple cells.",
  "5. Press 'C' to clear all numbers in the selected cells.",
  "6. Press 'F' to fill the selected cells with the selected color.",
  "7. Press 'D' to delete color from the selected cells.",
  "8. Press 'H' to show instructions."
]

function howToPlay(){
  if(!showInstruction){
    instructionBoard.classList.add('instruction-board');
    instructionBoard.innerHTML += '<div class="instruction-text">How to play:<div>';
    instructions.forEach(rule => instructionBoard.innerHTML += `<p>${rule}</p>`);
    instructionButton.innerHTML = 'Hide instruction';
    showInstruction = true;
  }

  else{
    instructionBoard.classList.remove('instruction-board');
    instructionBoard.innerHTML = '';
    instructionButton.innerHTML = 'How to play';
    showInstruction = false;
  }
}

instructionButton.addEventListener('click', () => howToPlay());
document.addEventListener('keydown', (event) => {
  if(event.key === 'h') howToPlay();
})