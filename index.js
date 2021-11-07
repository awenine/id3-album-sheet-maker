require('dotenv').config()
const authorizeAndRunSheetScript = require('./authorizeAndRunSheetScript');
const createSheets = require('./createSheets');
const getNestedMp3s = require('./getNestedMp3s');
const id3TagConfig = require('./id3TagConfig');
const returnID3Tags = require('./returnID3Tags');
const getSheetConfig = require('./getSheetConfig');

const id3TagFolders = 
  getNestedMp3s(process.env.MP3_ROOT_FOLDER)
    .slice(12,14) //for testing, to speed up id3 tag retrieval of less data
    .map(paths => returnID3Tags(paths, id3TagConfig))

authorizeAndRunSheetScript(createSheets,id3TagFolders,getSheetConfig) // to test

// console.log("id3TagFolders: ",id3TagFolders.map(release => release.map(track => track.comment.)));