require('dotenv').config()
const authorizeAndRunSheetScript = require('./authorizeAndRunSheetScript');
const getNestedMp3s = require('./getNestedMp3s');
const id3TagConfig = require('./id3TagConfig');
const returnID3Tags = require('./returnID3Tags');

const id3TagFolders = 
  getNestedMp3s(process.env.MP3_ROOT_FOLDER)
    .map(paths => returnID3Tags(paths, id3TagConfig));

authorizeAndRunSheetScript(console.log) // to test