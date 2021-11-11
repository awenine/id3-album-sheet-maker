const fs = require('fs')
const NodeID3 = require('node-id3')
const getMP3Duration = require('get-mp3-duration')
const log = require('./utils/log')
const msToParsedTimeObj = require('./utils/msToParsedTimeObj')

function returnMp3Data(pathArray, id3configObj) {
  return pathArray.map(mp3 => {
    const mp3Buffer = fs.readFileSync(mp3)
    const tags = NodeID3.read(mp3Buffer,id3configObj)
    const duration = getMP3Duration(mp3Buffer)
    // log(`${mp3} tags fetched`)       //* logs every track fetched
    return {...tags, length: {...msToParsedTimeObj(duration), duration}}
  })
}

module.exports = returnMp3Data