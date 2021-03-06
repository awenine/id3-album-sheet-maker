require('dotenv').config();
const {google} = require('googleapis');
const log = require('./utils/log');

function createSheets(auth, data, getSheetConfig, getWriteCellsConfig) {
  const sheetTitles = data.map((release,index) => {
    if (!release[0].comment) console.log(`release at ${index} has no comment tag`)
    // log(release[0].comment.text)
    return release[0].comment.text
  })
  const sheets = google.sheets({version: 'v4', auth});

  const sheetRequest = {
    spreadsheetId: process.env.SHEET_ID,
    resource: {
      requests: sheetTitles.map(title => {
        return {
          addSheet: {
            properties: getSheetConfig(title) // adjust this file to change sheet options
          }
        }
      }),
    },
    auth,
  }
  const writeCellsRequest = {
    spreadsheetId: process.env.SHEET_ID,
    resource: {
      valueInputOption: 'RAW', // can use 'USER_ENTERED' if we want sheets to parse data, ie for formulas, dates etc
      data: data.map(release => getWriteCellsConfig(release)), // adjust this file to format cell data
    },
    auth,
  }
  //* create sheets with config
  sheets.spreadsheets.batchUpdate(sheetRequest, (error, response) => {
    if (error) return console.log('The API returned an error when creating sheets: ' + error);
    const createResult = response.result;
    log(`Sheets created, result: ${createResult}`);
    //* write cells with config
    sheets.spreadsheets.values.batchUpdate(writeCellsRequest, (err, res) => {
      if (err) return console.log('The API returned an error when writing cells: ' + err);
      const writeResult = res.result;
      log(`Values written, result: ${writeResult}`);
    })
  });
}

module.exports = createSheets