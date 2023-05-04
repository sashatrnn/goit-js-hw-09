const body = document.body;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(changeColor, 1000);
}

function onStopClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;

  clearInterval(intervalId);
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
