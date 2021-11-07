function incrementLetter(letter, number) {
  const letterCode = letter.charCodeAt(0) + number
  if (letterCode > 90) {
    console.log('Error: not enough room for given cell range')
    return;
  } 
  return String.fromCharCode(letterCode)
}

module.exports = incrementLetter