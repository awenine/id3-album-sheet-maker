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
    const items = fs.readdirSync(folder).map(releaseFolder => `${folder}/${releaseFolder}`)
    let output = items;
    const mp3s = output.filter(file => file.slice(-4) === '.mp3')
    if (mp3s.length) infoFolders.push(mp3s)
    else {
      const nestedDirs = items.filter(item => fs.statSync(item).isDirectory())

      if (nestedDirs.length) {
        output = nestedDirs.flatMap(dir => fs.readdirSync(`${dir}`).map(item => `${dir}/${item}`))
      }
      const nestedMp3s = output.filter(file => file.slice(-4) === '.mp3')
      
      if (nestedMp3s.length) infoFolders.push(nestedMp3s)
    }
  })

  return infoFolders
}


module.exports = getNestedMp3s