import {removeDuplicates, splitString} from './general.js'

const boxNumbers = [
  [1, 2, 3, 10, 11, 12, 19, 20, 21],
  [4, 5, 6, 13, 14, 15, 22, 23, 24],
  [7, 8, 9, 16, 17, 18, 25, 26, 27],
  [28, 29, 30, 37, 38, 39, 46, 47, 48],
  [31, 32, 33, 40, 41, 42, 49, 50, 51],
  [34, 35, 36, 43, 44, 45, 52, 53, 54],
  [55, 56, 57, 64, 65, 66, 73, 74, 75],
  [58, 59, 60, 67, 68, 69, 76, 77, 78],
  [61, 62, 63, 70, 71, 72, 79, 80, 81]
]

class Cell{
  constructor(index, row, col){
    this.htmlElement = document.getElementById(index);
    this.row = row;
    this.column = col;

    this.box = this.asignsBox(index);
    this.numbers = [];
    this.fontSize = 24;

    this.color = 'transparent';
    this.previousMoves = [];
  }

  asignsBox(num){
    for(var i in boxNumbers)
      if(boxNumbers[i].includes(num)) return parseInt(i) + 1;
  }

  highlight(){
    this.htmlElement.classList.add('selected');
  }

  unhighlight(){
    this.htmlElement.classList.remove('selected');
  }

  fillColor(){
    this.htmlElement.style.backgroundColor = this.color;
  }

  displayNumbers(){
    this.numbers = removeDuplicates(this.numbers); //remove duplicate
    this.numbers.sort(); //sort 

    //create display string
    let string = '';
    for(var i in this.numbers) string += this.numbers[i];

    if(this.numbers.length <= 5)
      this.htmlElement.innerHTML = `<div>${string}</div>`;
    else{
      const [string1, string2] = splitString(string);
      this.htmlElement.innerHTML = `<div>${string1}</div> <div>${string2}</div>`
    }
  }

  adjustFontSize(selectedCells){
    if(this.numbers.length === 1 && selectedCells.length === 1) 
      this.fontSize = 24;
    
    else this.fontSize = 15;

    this.htmlElement.style.fontSize = `${this.fontSize}px`;
  }

  empty(selectedCells){
    this.numbers = [];
    this.displayNumbers(selectedCells);
  }
}

class Unit{
  constructor(num){
    this.cells = [];
    this.index = num;
  }

  checkError(errors){
    this.cells.forEach(cell => cell.htmlElement.classList.remove('error'));

    this.cells.forEach(cell1 => {
      this.cells.forEach(cell2 => {
        const condition = cell1.numbers.length === 1 && cell2.numbers.length === 1 && cell1 !== cell2 && cell1.numbers[0] === cell2.numbers[0] && cell1.fontSize === 24 && cell2.fontSize === 24;

        if(condition){
          errors.push(cell1);
          errors.push(cell2);
        }
      })
    });
  }
}

class Row extends Unit{
  constructor(num, cellArray){
    super(num);
    cellArray.forEach(cell => {
      if(cell.row === num) this.cells.push(cell);
    })
  }
}

class Column extends Unit{
  constructor(num, cellArray){
    super(num);
    cellArray.forEach(cell => {
      if(cell.column === num) this.cells.push(cell);
    })
  }
}

class Box extends Unit{
  constructor(num, cellArray){
    super(num);
    cellArray.forEach(cell => {
      if(cell.box === num) this.cells.push(cell);
    })
  }
}

function createCells(cellArr){
  let index=1;
  for(var row=1; row<=9; row++){
    for(var col=1; col<=9; col++){
      const cell = new Cell(index, row, col);
      cellArr.push(cell);
      index++;
    }
  }
}

function createRows(rows, cellArr){
  for(var i=1; i<=9; i++){
    const row = new Row(i, cellArr);
    rows.push(row);
  }
}

function createColumns(columns, cellArr){
  for(var i=1; i<=9; i++){
    const column = new Column(i, cellArr);
    columns.push(column);
  }
}

function createBoxes(boxes, cellArr){
  for(var i=1; i<=9; i++){
    const box = new Box(i, cellArr);
    boxes.push(box);
  }
}

function moveSelected(direction, selectedCells, rows, columns){
  if(selectedCells.length === 1){
    const oldCell = selectedCells[0];
    let newCell;
    const row = rows[oldCell.row - 1].cells;
    const column = columns[oldCell.column - 1].cells;    

    switch(direction){
      case 'left':
        row.forEach(cell => {
          if(cell.column === oldCell.column - 1) newCell = cell;
        }); break;

      case 'right':
        row.forEach(cell => {
          if(cell.column === oldCell.column + 1) newCell = cell;
        }); break;

      case 'up':
        column.forEach(cell => {
          if(cell.row === oldCell.row - 1) newCell = cell;
        }); break;

      case 'down':
        column.forEach(cell => {
          if(cell.row === oldCell.row + 1) newCell = cell;
        }); break;
    }
    
    if(newCell){
      selectedCells[0].unhighlight();
      selectedCells[0] = newCell;
      selectedCells.forEach(cell => cell.highlight());  
    }
  }
}

export {createCells, createRows, createColumns, createBoxes};
export {moveSelected};
export {Cell};