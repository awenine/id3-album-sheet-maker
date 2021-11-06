const fs = require('fs')
const NodeID3 = require('node-id3')

function returnID3Tags(pathArray, id3configObj) {
  return pathArray.map(mp3 => {
    const mp3Buffer = fs.readFileSync(mp3)
    return NodeID3.read(mp3Buffer,id3configObj)
  })
}

module.exports = returnID3Tags