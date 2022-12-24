import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form=document.querySelector('.form');

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  console.log(delay);
  console.log(step);
  console.log(amount);
  
  
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)      
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);          
        }, delay);
    
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        }, delay);
    
      });
    delay += step;
  }
}

  

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });
}



