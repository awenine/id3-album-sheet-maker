const getCharCodeOfWholeString = (string) => {
  let outputString = '';
  for (let i = 0; i < string.length; i++) {
    outputString += string.split(' ')[0].split('').splice(3).join('').toUpperCase().charCodeAt(i)
  }
  return parseInt(outputString)
} 

function getSheetConfig(sheetTitle, index) {
  //* see: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetProperties for reference
  return {
    sheetId: getCharCodeOfWholeString(sheetTitle),
    title: sheetTitle,
    // "index": integer,
    // "sheetType": enum (SheetType),
    // "gridProperties": {
    //   object (GridProperties)
    // },
    // "hidden": boolean,
    // tabColor: {
    //   red: 1,
    //   green: 0.5,
    //   blue: 0,
    //   alpha: 1
    // },
    // tabColorStyle: {
      // rgbColor: {
      //   red: 1,
      //   green: 0,
      //   blue: 0,
      //   alpha: 1
      // },
    //   themeColor: 'BACKGROUND'
    // },
    // "rightToLeft": boolean,
    // "dataSourceSheetProperties": {
    //   object (DataSourceSheetProperties)
    // }
  }    
}

module.exports = getSheetConfig