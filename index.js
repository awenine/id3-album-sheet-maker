require('dotenv').config()
const getNestedMp3s = require('./getNestedMp3s');
const id3TagConfig = require('./id3TagConfig');
const returnID3Tags = require('./returnID3Tags');

const mp3Folders = getNestedMp3s(process.env.MP3_ROOT_FOLDER)
  .slice(0,5)
  .map(paths => returnID3Tags(paths, id3TagConfig));

console.log(mp3Folders);