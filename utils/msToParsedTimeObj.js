function msToParsedTimeObj(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  
  const hours = Math.floor(minutes/60)
  if (hours) minutes -= hours*60
  if (seconds === 60) {
    minutes += 1
    seconds = 0
  }

  return {
    hours,
    minutes,
    seconds,
  }
}

module.exports = msToParsedTimeObj