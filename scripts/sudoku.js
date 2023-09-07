import { removeDuplicates, removeElement, colorPalette } from './general.js'
import { startTimer, resetTimer, displayTime } from './timer.js'
import {createCells, createRows, createColumns, createBoxes, moveSelected } from './cell.js'

let shift = false;
let gameState = 'input';
const errorMessage = document.querySelector('.error-message');
const note = document.querySelector('.note');
let timer;

const cellArr = [];

const rows = [];
const columns = [];
const boxes = [];

let selectedCells = [];
let errors = [];
let defaultCells = [];

//color palette
let selectedColor = 'transparent';
colorPalette.forEach(colorbox => {
  colorbox.htmlElement.addEventListener('click', () => {
    colorPalette.forEach(colorbox => colorbox.unhighlight());

    if(selectedColor !== colorbox.color){
      selectedColor = colorbox.color;
      colorbox.highlight();    
    }
    else selectedColor = 'transparent';
  });
})

function removeError(cell){
  cell.htmlElement.classList.remove('error');
  removeElement(errors, cell);
}

function unhighlightAll(){
  selectedCells = [];
  cellArr.forEach(cell => cell.htmlElement.classList.remove('selected'));
}

function checkShift(){
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Shift') shift = true;
  })
  
  document.addEventListener('keyup', (event) => {
    if(event.key === 'Shift') shift = false;
  })  
}

function showErrorText(){
  if(errors.length === 0){
    errorMessage.innerHTML = 'So far so good!';
    errorMessage.style.color = 'rgb(0, 160, 0)';
  } 

  else{
    errorMessage.innerHTML = `${errors.length} contradictions found.`;
    errorMessage.style.color = 'red';
  } 
}

function checkErrors(){
  cellArr.forEach(cell => cell.htmlElement.classList.remove('error'));
  errors = [];

  rows.forEach(row => row.checkError(errors));
  columns.forEach(column => column.checkError(errors));
  boxes.forEach(box => box.checkError(errors));

  errors.forEach(cell => cell.htmlElement.classList.add('error'));
  errors = removeDuplicates(errors);
}

function changeButton(){
  if(gameState === 'input'){
    document.querySelector('.submit-button').innerHTML = 'Start game';
    document.querySelector('.reset-button').innerHTML = 'Reset';
  }
  
  else if(gameState === 'playing'){
    document.querySelector('.submit-button').innerHTML = 'Submit';
  }

  else if(gameState === 'finished'){
    document.querySelector('.reset-button').innerHTML = 'Play again';
  }
}

function checkFinished(){
  let finish = true;
  cellArr.forEach(cell => {
    if(cell.numbers.length !== 1) finish = false;
  })
  checkErrors();
  if(errors.length > 0) finish = false;

  return finish;
}

//main
createCells(cellArr);

createRows(rows, cellArr);
createColumns(columns, cellArr);
createBoxes(boxes, cellArr);

//Buttons
document.querySelector('.submit-button').addEventListener('click', () => {
  unhighlightAll();
  switch(gameState){
    case 'input':
      checkErrors();
      if(errors.length > 0){
        errorMessage.innerHTML = `There are ${errors.length} in the puzzle. Check again before solving.`;
        errorMessage.style.color = 'red';
      } 

      else{
        timer = setInterval(() => startTimer(), 1000);

        gameState = 'playing';
        changeButton();
        errorMessage.innerHTML = '';
        cellArr.forEach(cell => {
          if(cell.numbers.length === 1){
            defaultCells.push(cell);
            cell.htmlElement.classList.add('default');
          } 
        })
      }
      break;
    case 'playing':
      if(checkFinished()){
        clearInterval(timer);
        displayTime();
        gameState = 'finished';
        errorMessage.innerHTML = 'Finished!';
        errorMessage.style.color = 'rgb(0, 160, 0)';
        changeButton();
      }
      else{
        errorMessage.innerHTML = 'You have not solved the puzzle yet.';
        errorMessage.style.color = 'red';
      } 
      break;
  }
})

document.querySelector('.new-game-button').addEventListener('click', () => {
  resetTimer();
  clearInterval(timer);
  unhighlightAll();
  defaultCells = [];
  note.value = '';
  cellArr.forEach(cell => {
    gameState = 'input';
    cell.empty(selectedCells);
    changeButton();
    errorMessage.innerHTML = '';
    cell.htmlElement.classList.remove('default');
    cell.htmlElement.style.backgroundColor = 'transparent';
  });
})

document.querySelector('.reset-button').addEventListener('click', () => {
  resetTimer();
  unhighlightAll();
  errorMessage.innerHTML = '';
  cellArr.forEach(cell => {
    if(!defaultCells.includes(cell)){
      cell.empty(selectedCells);
      cell.htmlElement.style.backgroundColor = 'transparent';
    } 
  })
  if(gameState === 'finished') gameState = 'playing';
})

//highlight cells
checkShift();

cellArr.forEach(cell => {
  cell.htmlElement.addEventListener('click', () => {
    if(!shift) selectedCells = [];

    selectedCells.push(cell);
    removeError(cell); //if it exists

    cellArr.forEach(cell => cell.unhighlight());
    selectedCells.forEach(cell => cell.highlight());
  });
});

//get input
const allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
document.addEventListener('keydown', (event) => {
  selectedCells.forEach(cell => {
    if(!defaultCells.includes(cell)){
      if(allowedNumbers.includes(parseInt(event.key))){
        if(cell.numbers.includes(event.key))
          removeElement(cell.numbers, event.key);
        else
          cell.numbers.push(event.key); 

        if(!shift) cell.adjustFontSize(selectedCells);
      }
      switch(event.key){
        case 'c': 
          cell.empty(selectedCells);  break;
        case 'f':
          cell.color = selectedColor;
          cell.fillColor(); break;
        case 'd':
          cell.color = 'transparent';
          cell.fillColor(); break;
      }          
      cell.displayNumbers(); //update new changes
    }

    switch(event.key){ //move selected cell when an arrow key is pressed
      case 'ArrowLeft':
        moveSelected('left', selectedCells, rows, columns); break;
      case 'ArrowRight':
        moveSelected('right', selectedCells, rows, columns); break;
      case 'ArrowUp':
        moveSelected('up', selectedCells, rows, columns); break;
      case 'ArrowDown':
        moveSelected('down', selectedCells, rows, columns); break;
      case 'u':
        cellArr.forEach(cell => cell.undo()); break;
    }
  });
});

//Check errors
document.querySelector('.check-button').addEventListener('click', () => {
  unhighlightAll();
  checkErrors();
  showErrorText();
});  

//note
note.addEventListener('click', () => unhighlightAll()); 