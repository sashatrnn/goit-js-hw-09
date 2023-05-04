import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onStartClick);

let selectedDate;

function onStartClick() {
  startBtn.disabled = true;
  if (!selectedDate) {
    Notiflix.Notify.failure('Please choose a date first');
    startBtn.disabled = false;
    return;
  }
  const targetDate = selectedDate.getTime() - Date.now();
  newTime(targetDate);

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const targetDate = selectedDate.getTime() - currentTime;
    newTime(targetDate);

    if (targetDate <= 1000) {
      clearInterval(intervalId);
      Notiflix.Notify.info('Finish!');
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function newTime(ms) {
  const time = convertMs(ms);
  daysEl.textContent = time.days.toString().padStart(2, '0');
  hoursEl.textContent = time.hours.toString().padStart(2, '0');
  minutesEl.textContent = time.minutes.toString().padStart(2, '0');
  secondsEl.textContent = time.seconds.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen(selectedDates) {
    startBtn.disabled = true;
  },
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);
