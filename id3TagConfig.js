//* modify this object and pass to 'returnID3Tags' function to define shape of id3 data
// for full glossary see: https://www.npmjs.com/package/node-id3

const id3TagConfig = {
  // include: ['comment'],    // only read the specified tags (default: all)
  exclude: ['APIC'],            // don't read the specified tags (default: [])
  // onlyRaw: true,               // only return raw object (default: false)
  noRaw: true                  // don't generate raw object (default: false)
}

module.exports = id3TagConfig