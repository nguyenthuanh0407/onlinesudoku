let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;
const timeText = document.getElementById('timer');
const errorMessage = document.querySelector('.error-message');

function pad(value) {
  return value.toString().padStart(2, '0');
}

function startTimer(){
  seconds++;
  if(seconds === 60){
    seconds = 0;
    minutes++;
  }
  
  if(minutes === 60){
    minutes = 0;
    hours++;
  }

  if(hours < 1) timeText.innerHTML = `${pad(minutes)}:${pad(seconds)}`;

  else if(days < 1) timeText.innerHTML = `${hours}:${pad(minutes)}:${pad(seconds)}`;

  else timeText.innerHTML = `${days}d:${hours}:${pad(minutes)}:${pad(seconds)}`;
}

function resetTimer(){
  seconds = 0;
  minutes = 0;
  hours = 0;
  days = 0;
  timeText.innerHTML = `${pad(minutes)}:${pad(seconds)}`;
}

function displayTime(){
  errorMessage.innerHTML = `Congratulations! You have solved the puzzle in ${timeText.innerHTML}`;
  errorMessage.style.color = 'rgb(0, 160, 0)';
}

export {startTimer, resetTimer, displayTime};