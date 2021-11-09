const incrementLetter = require("./utils/incrementLetter");

function getWriteCellsConfig(releaseData) {
  const releaseFormat = [  
    [ // Column A
      'Artist',
      'Album',
      'Year',
      'Genre',
      '',
      'Tracklist:'
      // after will come track numbers
    ],
    [ // Column B
      // will be filled according to release data
    ]
  ]

  releaseData.forEach((trackData, index) => {
    releaseFormat[0].push(trackData.trackNumber)
    if (index === 0) releaseFormat[1].push(trackData.performerInfo,trackData.album,trackData.year,trackData.genre,'','');
    releaseFormat[1].push(trackData.title)
  });

  const STARTING_POINT = {column: 'B', row: 2} // change starting point of range here

  return {
      range: `'${releaseData[0].comment.text}'!${STARTING_POINT.column}${+STARTING_POINT.row}:${incrementLetter(STARTING_POINT.column, releaseFormat.length-1)}${+STARTING_POINT.row + releaseFormat[0].length}`,
      majorDimension: "COLUMNS", // if removed, will default to 'ROWS'
      values: releaseFormat
  }
}

module.exports = getWriteCellsConfig