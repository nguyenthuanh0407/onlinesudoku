//Generate grid
let displayContent = '';
for(var i=1; i<=81; i++){
  displayContent += `<div class="cell" id="${i}"></div>`;
}
document.querySelector('.grid').innerHTML = displayContent;   

//Box border
let left = []; for(i=0; i<=26; i++) left.push(1 + 3*i);
let right = []; for(i=0; i<=26; i++) right.push(3 + 3*i);
let up = []; for(i=0; i<3; i++) for(var j=0; j<9; j++) up.push(1 + i*27 +j);
let down = []; for(i=0; i<3; i++) for(j=0; j<9; j++) down.push(19 + i*27 +j);

left.forEach(index => {
  document.getElementById(index).classList.add('left');
});

right.forEach(index => {
  document.getElementById(index).classList.add('right');
});

up.forEach(index => {
  document.getElementById(index).classList.add('up');
});

down.forEach(index => {
  document.getElementById(index).classList.add('down');
});

function removeDuplicates(arr) {
  let unique = [];
  arr.forEach(element => {
      if (!unique.includes(element)) {
          unique.push(element);
      }
  });
  return unique;
}

function removeElement(array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

function splitString(str){
  const string1 = str.slice(0, 5);
  const string2 = str.slice(5);

  return [string1, string2];
}



const colors = ['rgb(179, 0, 0)', 'rgb(235, 129, 0)', 'rgb(209, 209, 1)', 'rgb(252, 107, 131)', 'rgb(46, 46, 196)', 'rgb(0, 153, 0)', 'rgb(0, 163, 163)', 'rgb(126, 33, 126)', 'rgb(0, 221, 0)'];

//Color box
class ColorBox{
  constructor(index){
    this.color = colors[index-1];
    this.htmlElement = document.getElementById(`color${index}`);
  }

  highlight(){
    this.htmlElement.classList.add('selected-square');
  }
  
  unhighlight(){
    this.htmlElement.classList.remove('selected-square');
  }
}

let colorPalette = [];

for(var index = 1; index<=9; index++){
  const colorbox = new ColorBox(index);
  colorPalette.push(colorbox);
}

export {colorPalette};
export {removeDuplicates, removeElement, splitString };