function lengthObjToMiliseconds(lengthObject) {
  return ((lengthObject.hours * 3600000) + (lengthObject.minutes * 60000) + (lengthObject.seconds * 1000))
}

module.exports = lengthObjToMiliseconds