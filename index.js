require('dotenv').config()
const getNestedMp3s = require('./getNestedMp3s');

const mp3Folders = getNestedMp3s(process.env.MP3_ROOT_FOLDER);

console.log(mp3Folders);