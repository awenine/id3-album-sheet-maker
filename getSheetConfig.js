function getSheetConfig(sheetTitle) {
  //* see: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetProperties for reference
  return {
    // "sheetId": integer,
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