const duration = (createdAt, stringMinutes = "15 minutes") => {
  let durationInMinutes = +stringMinutes.substr(0, 2);
  createdAt = new Date(createdAt);

  let minutes = createdAt.getMinutes();
  minutes += durationInMinutes;
  createdAt.setMinutes(minutes);

  let time = createdAt - new Date();
  time < 0 ? (time = 0) : (time = Math.floor(time / 60000));
  return time;
};
const timer = (createdAt, stringMinutes, id) => {
  let min = duration(createdAt, stringMinutes);
  let sec;
  min === 0 ? (sec = 0) : (sec = 59);
  let countdown = setInterval(function() {
    if (document.getElementById(id)) {
      if (min > 0 && sec === 0) {
        min--;
        sec = 59;
      } else if (min > 0 && sec > 0) {
        sec--;
      } else if (min === 0 && sec === 0) {
        min = 0;
        sec = 0;
        clearInterval(countdown);
      } else if (sec < 0 && min < 0) {
        min = 0;
        sec = 0;
        clearInterval(countdown);
      }
      document.getElementById(id).innerHTML = `${min} : ${sec}`;
    } else {
      clearInterval(countdown);
    }
  }, 1000);
};
module.exports = {
  duration: duration,
  timer: timer
};
