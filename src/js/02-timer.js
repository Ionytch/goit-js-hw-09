import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require("flatpickr/dist/themes/dark.css");

const inputText = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
// console.log(todayDate);
let newDate = null;
const daysRef = document.querySelector('.value[data-days]');
const hoursRef = document.querySelector('.value[data-hours]');
const minutesRef = document.querySelector('.value[data-minutes]');
const secondsRef = document.querySelector('.value[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    newDate = selectedDates[0];
    if (selectedDates[0] <= options.defaultDate) {
      Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
      selectedDates[0] = new Date();
    } else {
      
      startBtn.disabled = false;
      
    }
    
  }
      
};

flatpickr(inputText, options);

let timerId = null;
startBtn.addEventListener("click", () => {
 timerId = setInterval(convertMs, 1000);
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs() {
  const todayDate = new Date();
  const ms = newDate - todayDate;
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  console.log({ days, hours, minutes, seconds });

   daysRef.textContent = days;
   hoursRef.textContent = hours;
   minutesRef.textContent = minutes;
   secondsRef.textContent = seconds;
  if (ms < 1000) {
    clearInterval(timerId)
  }
  
  
}




