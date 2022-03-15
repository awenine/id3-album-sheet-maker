const incrementLetter = require("./utils/incrementLetter");
const msToParsedTimeObj = require("./utils/msToParsedTimeObj");

function getQNWriteCellsConfig(releaseData) {
  
  const albumLengthObj = msToParsedTimeObj(releaseData.reduce((acc,item)=> { return acc + item.length.duration},0))


  const releaseFormat = [  
    [ // Column A
    "Release info"
    ,"Artist"
    ,"Album"
    ,"Catalogue"
    ,"No. of tracks"
    ,"Length"
    ,"Mediafire Link"
    ,"Archive Link"
    ,"Soundcloud stream ID"
    ,"Release day"
    ,"Month"
    ,"Year"
    ,"Genre"
    ,"Track Info"
    ,"Number"
      // after will come track numbers
    ],
    [ // Column B
    ""
    ,releaseData[0].performerInfo
    ,releaseData[0].album
    ,releaseData[0].comment.text
    ,releaseData.length
    ,albumLengthObj.hours
    ,""
    ,""
    ,""
    ,""
    ,""
    ,releaseData[0].year
    ,releaseData[0].genre
    ,""
    ,"Name"
      // after will come track names
    ],
    [ // Column C
    ""
    ,""
    ,""
    ,""
    ,""
    ,albumLengthObj.minutes
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,"Min"
      // after will come track names
    ],
    [ // Column D
    ""
    ,""
    ,""
    ,""
    ,""
    ,albumLengthObj.seconds
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,"Sec"
      // after will come track names
    ],
    [ // Column E
    "Colours"
    ,"colour 1 (background)"
    ,"colour 2 (text)"
    ,"colour 3 (link back)"
    ,"colour 1 (link text)"
    ,"Artist links"
    ,"Twitter Handle"
    ,"Soundcloud URL"
    ,"Facebook Page URL"
    ,"Instagram"
    ,"Discogs"
    ,""
    ,""
    ,""
    ,"soundcloud?"
      // after will come track names
    ],
    [ // Column F
    ""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,"sc id"
      // after will come track names
    ],
    [ // Column G
    "Extra Marker Type"
    ,""
    ,""
    ,""
    ,""
    ,"Video Name"
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,""
    ,"sc colour"
    ],
    [ // Column H
    "Extra Marker Title"
    ,""
    ,""
    ,""
    ,""
    ,"Video ID"
    ],
    [ // Column I
    "Extra Marker Data"
    ,""
    ,""
    ,""
    ,""
    ,"Youtube / Vimeo?"
    ],
    [ // Column J
    ],
    [ // Column K
    "Markers"
    ],
    [ // Column L
    "Coordinates"
    ],
    [ // Column M
      "Marker types"
,"alb"
,"ply"
,"tr#"
,"vd#"
,"ex#"
,"st#"
    ],
    [ // Column N
      "Marker description"
,"album"
,"playlist (soundcloud)"
,"track (number)"
,"video (number)"
,"external link (number)"
,"static content (ie pictures or text)(number)"
    ]
  ]

  releaseData.forEach((trackData) => {
    releaseFormat[0].push(trackData.trackNumber)
    releaseFormat[1].push(trackData.title)
    releaseFormat[2].push(trackData.length.minutes)
    releaseFormat[3].push(trackData.length.seconds)
  });

  const STARTING_POINT = {column: 'A', row: 1} // change starting point of range here

  return {
      range: `'${releaseData[0].comment.text}'!${STARTING_POINT.column}${+STARTING_POINT.row}:${incrementLetter(STARTING_POINT.column, releaseFormat.length-1)}${+STARTING_POINT.row + releaseFormat[0].length}`,
      majorDimension: "COLUMNS", // if removed, will default to 'ROWS'
      values: releaseFormat
  }
}

module.exports = getQNWriteCellsConfig