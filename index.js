const fs = require('fs')
const NodeID3 = require('node-id3')
require('dotenv')

console.log(process.env.MP3_ROOT_FOLDER);

const releaseFolders = fs.readdirSync(process.env.MP3_ROOT_FOLDER)
  .filter(release => fs.statSync(`${process.env.MP3_ROOT_FOLDER}/${release}`).isDirectory())