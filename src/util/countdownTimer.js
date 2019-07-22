export function timer(stringMinutes, id) {
  let durtionInMinutes = stringMinutes.substr(0, 2);
  let time = +durtionInMinutes
  let countdown = setInterval(function() {
    document.getElementById(id).innerHTML = time;
    time --;
    if (time == -1) {
      clearInterval(countdown);
    }
  }, 1000);
  
}

export default timer;