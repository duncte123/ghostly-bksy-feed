// main problem to get around: the slang use of 'speedrun' to denote doing something unrelated to speedrunning fast
// ex. Lowtax speedrun, christmas shopping speedrun, etc

const matchText: string[] = [
  // obvious
  '#dannyphantom',
  '#danny_phantom',
  // characters
  '#dannyfenton',
  '#wesweston',
  '#sammanson',
  '#tuckerfoley',
  '#jazzfenton',
  '#maddiefenton',
  '#jackfenton',
  '#vladmasters',
  '#vladplasmius',
  // Full names non hashtags
  'Danny Phantom',
  // Series
  '#5yl',
  '#fiveyearslater',
  '#aglitchintime',
  '#fairgame',
]

const matchPatterns: RegExp[] = [
  //just trying something
  /danny phantom/im,
]

// Accounts that are primarily danny phantom content, congrats if you made it in!
const matchUsers: string[] = [
  'did:plc:f6yjyxxw6ottpnneidcgszxn', // davidkaufman23.bsky.social (ofc danny himself)
  'did:plc:jr6p5wyegabd6lihdwwmm746', // pichikui.bsky.social (mainly for testing this)
]

export { matchPatterns, matchUsers, matchText }
