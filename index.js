require('dotenv').config()
const authorizeAndRunSheetScript = require('./authorizeAndRunSheetScript');
const createSheets = require('./createSheets');
const getNestedMp3s = require('./getNestedMp3s');
const id3TagConfig = require('./id3TagConfig');
const returnMp3Data = require('./returnMp3Data');
const getSheetConfig = require('./getSheetConfig');
const log = require('./utils/log');
const getQNWriteCellsConfig = require('./getQNWriteCellsConfig');

const id3TagFolders = 
  getNestedMp3s(process.env.MP3_ROOT_FOLDER)
    .slice(57)   //* for getting a smaller range of folders
    .map(paths => {
      const tags = returnMp3Data(paths, id3TagConfig)
      log(`${paths[0].split('/')[4]} id3 tags fetched`)
      return tags
    })
//! Albums with issues (may need manual input):
// QNAPP001 (dane law app)
// QNR034 (silent night)
// QNREC002
// Singles (same cat as records) - QNS001, QNS002 


authorizeAndRunSheetScript(createSheets,id3TagFolders,getSheetConfig, getQNWriteCellsConfig)

console.log("\x1b[1;42m","FINISHED","\x1b[0m","- sheet has been written at:","\x1b[1;35m", `https://docs.google.com/spreadsheets/d/${process.env.SHEET_ID}`,"\x1b[0m")