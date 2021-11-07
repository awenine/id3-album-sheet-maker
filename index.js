require('dotenv').config()
const authorizeAndRunSheetScript = require('./authorizeAndRunSheetScript');
const createSheets = require('./createSheets');
const getNestedMp3s = require('./getNestedMp3s');
const id3TagConfig = require('./id3TagConfig');
const returnID3Tags = require('./returnID3Tags');
const getSheetConfig = require('./getSheetConfig');
const log = require('./utils/log');
const getWriteCellsConfig = require('./getWriteCellsConfig');

const id3TagFolders = 
  getNestedMp3s(process.env.MP3_ROOT_FOLDER)
    // .slice(12,14)   //* for getting a smaller range of folders
    .map(paths => {
      const tags = returnID3Tags(paths, id3TagConfig)
      log(`${paths[0].split('/')[4]} id3 tags fetched`)     //* logs every folder name
      return tags
    })

authorizeAndRunSheetScript(createSheets,id3TagFolders,getSheetConfig, getWriteCellsConfig)