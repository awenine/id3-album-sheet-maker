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
    // "tabColor": {                  // make colour coding change system (based on index?)
    //   object (Color)
    // },
    // "tabColorStyle": {
    //   object (ColorStyle)
    // },
    // "rightToLeft": boolean,
    // "dataSourceSheetProperties": {
    //   object (DataSourceSheetProperties)
    // }
  }    
}

module.exports = getSheetConfig