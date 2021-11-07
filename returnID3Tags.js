const fs = require('fs')
const NodeID3 = require('node-id3')
const log = require('./utils/log')

function returnID3Tags(pathArray, id3configObj) {
  return pathArray.map(mp3 => {
    const mp3Buffer = fs.readFileSync(mp3)
    const tags = NodeID3.read(mp3Buffer,id3configObj)
    // log(`${mp3} tags fetched`)       //* logs every track fetched
    return tags
  })
}

module.exports = returnID3Tags