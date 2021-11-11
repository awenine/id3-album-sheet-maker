const incrementLetter = require("./utils/incrementLetter");
const msToParsedTimeObj = require("./utils/msToParsedTimeObj");

function getWriteCellsConfig(releaseData) {
  
  const albumLengthObj = msToParsedTimeObj(releaseData.reduce((acc,item)=> { return acc + item.length.duration},0))


  const releaseFormat = [  
    [ // Column A
      'Artist',
      'Album',
      'Length',
      'Year',
      'Genre',
      '',
      'Tracklist:'
      // after will come track numbers
    ],
    [ // Column B
      // Length in hours
      // will be filled according to release data (track titles)
      releaseData[0].performerInfo,
      releaseData[0].album,
      albumLengthObj.hours,
      releaseData[0].year,
      releaseData[0].genre,
      '',
      ''
    ],
    [ // Column C
      // Length in minutes
      // will be filled according to release data (minutes)
      '',
      '',
      albumLengthObj.minutes,
      '',
      '',
      '',
      ''
    ],
    [ // Column D
      // Length in seconds
      // will be filled according to release data (seconds)
      '',
      '',
      albumLengthObj.seconds,
      '',
      '',
      '',
      ''
    ]
  ]

  releaseData.forEach((trackData) => {
    releaseFormat[0].push(trackData.trackNumber)
    releaseFormat[1].push(trackData.title)
    releaseFormat[2].push(trackData.length.minutes)
    releaseFormat[3].push(trackData.length.seconds)
  });

  const STARTING_POINT = {column: 'B', row: 2} // change starting point of range here

  return {
      range: `'${releaseData[0].comment.text}'!${STARTING_POINT.column}${+STARTING_POINT.row}:${incrementLetter(STARTING_POINT.column, releaseFormat.length-1)}${+STARTING_POINT.row + releaseFormat[0].length}`,
      majorDimension: "COLUMNS", // if removed, will default to 'ROWS'
      values: releaseFormat
  }
}

module.exports = getWriteCellsConfig