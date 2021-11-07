const {google} = require('googleapis');

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
    if (index === 0) releaseFormat[1].push(trackData.artist,trackData.album,trackData.year,trackData.genre,'','');
    releaseFormat[1].push(trackData.title)
  });

  return {
      range: `'${releaseData[0].comment.text}'!A:B`,  //Defines sheet and position of data. NOTE - sheet name wrapped in '' so can parse alphanumeric combination, spaces & special characters.
      majorDimension: "COLUMNS",
      values: releaseFormat
  }
}

module.exports = getWriteCellsConfig