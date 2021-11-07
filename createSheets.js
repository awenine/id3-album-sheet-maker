require('dotenv').config();
const {google} = require('googleapis');
const log = require('./utils/log');

function createSheets(auth, data, getSheetConfig, getWriteCellsConfig) {
  //* get catalogue numbers (stored in comments) to create sheets
  const sheetTitles = data.map(release => release[0].comment.text)
  //* define sheets with authorization 
  const sheets = google.sheets({version: 'v4', auth});
  //* create sheets with config
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
  sheets.spreadsheets.batchUpdate(sheetRequest, (error, response) => {
    if (error) return console.log('The API returned an error when creating sheets: ' + error);
    const result = response.result;
    log(`Sheets created, result: ${result}`);
  });
  //* write cells with config
  const writeCellsRequest = {
    spreadsheetId: process.env.SHEET_ID,
    resource: {
      valueInputOption: 'RAW', // can use 'USER_ENTERED' if we want sheets to parse data, ie for formulas, dates etc
      data: data.map(release => getWriteCellsConfig(release)),
    },
    auth,
  }
  sheets.spreadsheets.values.batchUpdate(writeCellsRequest, (error, response) => {
    if (error) return console.log('The API returned an error when writing cells: ' + error);
    const result = response.result;
    log(`Values written, result: ${result}`);
  })
}

module.exports = createSheets