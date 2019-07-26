const duration = (createdAt, stringMinutes) => {
  let durationInMinutes = +stringMinutes.substr(0, 2);
  createdAt = new Date(createdAt);

  let minutes = createdAt.getMinutes();
  minutes += durationInMinutes;
  createdAt.setMinutes(minutes);

  let time = createdAt - new Date();
  time = Math.floor(time / 60000);
  return time;
};
const timer = (createdAt, stringMinutes, id) => {
  let time = duration(createdAt, stringMinutes);
  let countdown = setInterval(function() {
    document.getElementById(id).innerHTML = time;
    time--;
    if (time === -1) {
      clearInterval(countdown);
    }
  }, 1000);
};
module.exports = {
  duration: duration,
  timer: timer
};
