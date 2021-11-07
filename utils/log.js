const USE_LOGS = true     // change here to turn process logs on/off

function log(message) {
  if (USE_LOGS) {
    console.log(message)
  }
}

module.exports = log