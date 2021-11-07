require('dotenv').config();
const readline = require('readline');
const {google} = require('googleapis');

function createSheets(auth, data, getSheetConfig) {
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
  sheets.spreadsheets.batchUpdate(sheetRequest, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const result = res.result;
    console.log("sheets created, result: ",result);
  });
  //* write cells with config


}

module.exports = createSheets