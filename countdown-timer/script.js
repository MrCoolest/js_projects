const days_div = document.querySelector('#days');
const hours_div = document.querySelector('#hours');
const minutes_div = document.querySelector('#minutes');
const seconds_div = document.querySelector('#seconds');
const parent_div = document.querySelector('.countdown-container');


function counter(){
     const newyear =  new Date('1 Jan 2022');
     const current_date = new Date();
     const checking_date = current_date < newyear;
     // console.log(checking_date, current_date, '\n', newyear);
     if(!checking_date){
          parent_div.innerHTML = `<h2> You'r Given Date is too old <h2>`
     }
     else{
          const difference = Math.abs(newyear - current_date);
          
          const totalseconds = difference /1000; 

          const days =  Math.floor(totalseconds / 3600 / 24);
          const hours = Math.floor(totalseconds / 3600) % 24;
          const minutes = Math.floor(totalseconds / 60) % 60;
          const seconds = Math.floor(totalseconds) % 60;

          const foramteDate = (time) => time < 10 ?   `0${time}` : time; 

          days_div.textContent = foramteDate(days);
          hours_div.textContent = foramteDate(hours);
          minutes_div.textContent = foramteDate(minutes);
          seconds_div.textContent = foramteDate(seconds);
     }
}

// counter();

setInterval(counter, 1000);