require('dotenv').config();
const {google} = require('googleapis');
const log = require('./utils/log');

//? helper function for formatting

const COLOURS = {
  yellow: {red:1,green:1,blue:0,alpha:0.5},
  grey: {red:0.9,green:0.9,blue:0.9,alpha:0.3},
  orange: {red:0.9,green:0.7,blue:0.6,alpha:0.5},
  green: {red:0.2,green:1,blue:0.2,alpha:0.5},
  blue: {red:0.5,green:0.5,blue:1,alpha:0.5},
  purple: {red:1,green:0.5,blue:1,alpha:0.5},
  white: {red:1,green:1,blue:1,alpha:0.5}, 
}

// These functions are used to get a unique ID based on the catalogue number string, gor use as the sheet ID
//* Diplicated in getSheetConfig(), so keep the same when changing one 
const getCharCodeOfWholeString = (string) => {
  let outputString = '';
  for (let i = 0; i < string.length; i++) {
    outputString += string.split(' ')[0].split('').splice(3).join('').toUpperCase().charCodeAt(i)
  }
  return parseInt(outputString)
} 

// not currently used but for reversing above function
const getStringFromCharCode = (code) => {
  const codeString = code + ''
  let outputString = '';
  for (let i = 0; i < codeString.length; i+=2) {
    outputString += String.fromCharCode(parseInt(codeString[i]+codeString[i+1]))
  }
  return outputString
}

const colorRange = (index, startRow, endRow, startCol, endCol, colour) => {
  return {
    repeatCell: {
     range: {
       sheetId: index,
       startRowIndex:startRow,
       endRowIndex:endRow,
       startColumnIndex:startCol,
       endColumnIndex:endCol,
     },
     cell: {
      userEnteredFormat: {
        backgroundColor: colour
      }
     },
     fields: "userEnteredFormat.backgroundColor"
    }
  }
}




function createSheets(auth, data, sheetConfig, writeCellsConfig) {
  const sheetTitles = data.map((release,index) => {
    if (!release[0].comment) console.log(`release at ${index} has no comment tag`)
    // log(release[0].comment.text)
    return release[0].comment.text
  })
  const sheets = google.sheets({version: 'v4', auth});

  const sheetRequest = {
    spreadsheetId: process.env.SHEET_ID,
    resource: {
      requests: sheetTitles.map((title, index) => {
        return {
          addSheet: {
            properties: sheetConfig(title, index) // adjust this file to change sheet options
          },
        }
      }),
    },
    auth,
  }
  const formatCellsRequest = {
    spreadsheetId: process.env.SHEET_ID,
    resource: {
      requests: sheetTitles.flatMap((title,i) => {
        const idCode = getCharCodeOfWholeString(title)
        return [
          colorRange(idCode,0,14,0,1,COLOURS.yellow),
          colorRange(idCode,1,13,0,1,COLOURS.orange),
          colorRange(idCode,14,15,0,7,COLOURS.orange),
          colorRange(idCode,0,14,1,5,COLOURS.grey),
          colorRange(idCode,1,13,1,2,COLOURS.white),
          colorRange(idCode,1,5,4,5,COLOURS.green),
          colorRange(idCode,6,11,4,5,COLOURS.blue),
          colorRange(idCode,0,1,4,12,COLOURS.yellow),
          colorRange(idCode,5,6,4,9,COLOURS.yellow),
          colorRange(idCode,0,14,5,6,COLOURS.grey),
          colorRange(idCode,1,5,5,6,COLOURS.white),
          colorRange(idCode,6,11,5,6,COLOURS.white),
          colorRange(idCode,14,24,7,9,COLOURS.grey),
          colorRange(idCode,0,24,9,10,COLOURS.grey),
          colorRange(idCode,0,1,12,14,COLOURS.purple),
          colorRange(idCode,5,6,2,4,COLOURS.white),
          ]
      }),
    },
    auth,
  }
  const formatCellsRequest2 = {
    spreadsheetId: process.env.SHEET_ID,
    resource: {
      requests: sheetTitles.map((_,sheetIndex) => {
        return {
          repeatCell: {
           range: {
             sheetId: sheetIndex,
             startRowIndex:3,
             endRowIndex:6,
             startColumnIndex:2,
             endColumnIndex:5,
           },
           cell: {
            userEnteredFormat: {
              backgroundColor: {
                red:0,
                green:1,
                blue:1,
                alpha:0.5
              }
            }
           },
           fields: "userEnteredFormat.backgroundColor"
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
      data: data.map(release => writeCellsConfig(release)), // adjust this file to format cell data
    },
    auth,
  }
  //? here we use nested callbacks to perfrom the three processes: creating, formatting, and populating the sheets
  //* create sheets with config
  sheets.spreadsheets.batchUpdate(sheetRequest, (error, response) => {
    if (error) return console.log('The API returned an error when creating sheets: ' + error);
    const createResult = response.result;
    log(`Sheets created, result: ${createResult}`);
    //* format cells
    sheets.spreadsheets.batchUpdate(formatCellsRequest, (error, response) => {
      if (error) return console.log('The API returned an error when formatting sheets: ' + error);
      const formatResult = response.result;
      log(`Sheets formatted, result: ${formatResult}`);
    //* write cells with config
      sheets.spreadsheets.values.batchUpdate(writeCellsRequest, (err, res) => {
        if (err) return console.log('The API returned an error when writing cells: ' + err);
        const writeResult = res.result;
        log(`Values written, result: ${writeResult}`);
      })
    })
  });
}

module.exports = createSheets