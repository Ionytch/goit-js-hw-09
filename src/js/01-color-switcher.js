const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;


startBtn.addEventListener("click", () => {
   timerId = setInterval(() => {
       console.log(timerId, `${Math.random()}`);
        document.body.style.backgroundColor= getRandomHexColor();
       if (navigator.userActivation.isActive) {
           startBtn.disabled = true;
       }
       return document.body.style.backgroundColor;
    }, 1000);
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped!`);
    if (navigator.userActivation.isActive) {
           startBtn.disabled = false;
       }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}