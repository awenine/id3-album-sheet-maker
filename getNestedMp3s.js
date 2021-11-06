const fs = require('fs')

/* 
 * NOTE - this is built to parse one particular folder structure:
    catalogue folder (ie 'QNR002)
      - release folder (album title, ie 'Forways')
        - mp3s OR folders of mp3s (in the case of a double album), which are flattened
 * folders deeper than that and non-mp3 files are discarded
 * other file structures will need different parsing methods
 */ 

const getNestedMp3s = function (rootFolder) {
  let infoFolders = []

  const releaseFolders = fs.readdirSync(rootFolder)
    .filter(release => fs.statSync(`${rootFolder}/${release}`).isDirectory())
    .flatMap(release => {
      const innerFolder = fs.readdirSync(`${rootFolder}/${release}`)
      .filter(item => fs.statSync(`${rootFolder}/${release}/${item}`).isDirectory())
      .map(item => `${rootFolder}/${release}/${item}`)
      
      return innerFolder
    })

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

  return infoFolders
}


module.exports = getNestedMp3s