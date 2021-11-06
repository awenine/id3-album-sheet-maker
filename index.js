const fs = require('fs')
const NodeID3 = require('node-id3')
require('dotenv')

console.log(process.env.MP3_ROOT_FOLDER);

const releaseFolders = fs.readdirSync(process.env.MP3_ROOT_FOLDER)
  .filter(release => fs.statSync(`${process.env.MP3_ROOT_FOLDER}/${release}`).isDirectory())
  .flatMap(release => {
    const innerFolder = fs.readdirSync(`${process.env.MP3_ROOT_FOLDER}/${release}`)
    .filter(item => fs.statSync(`${process.env.MP3_ROOT_FOLDER}/${release}/${item}`).isDirectory())
    .map(item => `${process.env.MP3_ROOT_FOLDER}/${release}/${item}`)
    return innerFolder
  })
  
let infoFolders = []

releaseFolders.forEach(folder => {
  const items = fs.readdirSync(folder)
  let output = items;
  const nestedDirs = items.filter(item => fs.statSync(`${folder}/${item}`).isDirectory())

  if (nestedDirs.length > 0) {
    output = nestedDirs.flatMap(dir => fs.readdirSync(`${folder}/${dir}`))
  }

  const mp3s = output.filter(file => file.slice(-4) === '.mp3')
  if (mp3s.length) infoFolders.push(mp3s)
})

console.log("infoFolders: ",infoFolders);
