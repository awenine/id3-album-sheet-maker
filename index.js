require('dotenv').config()
const authorizeAndRunSheetScript = require('./authorizeAndRunSheetScript');
const createSheets = require('./createSheets');
const getNestedMp3s = require('./getNestedMp3s');
const id3TagConfig = require('./id3TagConfig');
const returnMp3Data = require('./returnMp3Data');
const getSheetConfig = require('./getSheetConfig');
const log = require('./utils/log');
const getWriteCellsConfig = require('./getWriteCellsConfig');
const msToParsedTimeObj = require('./utils/msToParsedTimeObj');
const lengthObjToMiliseconds = require('./utils/lengthObjToMiliseconds');

const id3TagFolders = 
  getNestedMp3s(process.env.MP3_ROOT_FOLDER)
    .slice(8,13)   //* for getting a smaller range of folders
    .map(paths => {
      const tags = returnMp3Data(paths, id3TagConfig)
      log(`${paths[0].split('/')[4]} id3 tags fetched`)
      return tags
    })

authorizeAndRunSheetScript(createSheets,id3TagFolders,getSheetConfig, getWriteCellsConfig)