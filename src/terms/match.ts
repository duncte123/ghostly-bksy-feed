// main problem to get around: the slang use of 'speedrun' to denote doing something unrelated to speedrunning fast
// ex. Lowtax speedrun, christmas shopping speedrun, etc

const matchText: string[] = [
  // obvious
  ' #speedrun',
  ' #speedrunner',
  // events
  ' agdq',
  'arpgme',
  ' benelux speedrunner gathering ',
  ' bsg annual ',
  ' black in a flash',
  ' esa winter ',
  ' esa summer ',
  'fastest furs',
  'flame fatales',
  'finnruns',
  'frame fatales',
  'frost fatales',
  'games done quick',
  'gamesdonequick',
  ' #gdq',
  ' gdq',
  ' gdqueer ',
  'interglitches',
  'lady arcaders',
  'midspring speedfling',
  'midwest speedfest',
  'obscurathon',
  'power up with pride',
  'prevent a thon',
  'really really long a thon',
  'really really lots of lore',
  'rtainjapan',
  '#rtain',
  ' sgdq ',
  'soaringspeedfest',
  'speedfest',
  'speedons',
  // speedrun + 'word'
  'speedrun marathon',
  'speedrun mode',
  'speedrun practice',
  'speedrun training',
  'speedrun routing',
  'speedrun stream',
  'speedrun accessibility',
  // 'word' + speedrun
  'first speedrun',
  // bluesky (test; disable in release)
  //'bluesky',
]

const matchPatterns: RegExp[] = [
  //SRC
  /(^|[\s\W])speedrun\.com($|[\W\s])/im,
  //oengus
  /(^|[\s\W])oengus\.io($|[\W\s])/im,
  //oengus short urls
  /(^|[\s\W])oengus\.fun($|[\W\s])/im,
  //horaro
  /(^|[\s\W])horaro\.org($|[\W\s])/im,
  //'speedrun' AND a link to twitch.tv
  /speedrun[\s\S]*?twitch.tv/im,
  //'speedrun' AND a link to youtube
  /speedrun($|.*)youtu.be/im,
  //'speedrun' AND 'pb'
  /(^|[\s\W])speedrun($|.*)pb($|[\W\s])/im,
  //'pb' AND 'speedrun'
  /(^|[\s\W])pb($|.*)speedrun($|[\W\s])/im,
  //twitch.tv/gamesdonequick
  /twitch\.tv\/gamesdonequick/im,
  //'really really' AND a link to twitch.tv
  /really really($|.*)twitch.tv/im,
]

// these users ONLY talk about speedrunning - scheduler bots, etc
const matchUsers: string[] = [
  'did:plc:rqbyxmhdeyjsygglwxkhwnlb', // bigbadgameathon.bsky.social
  'did:plc:sucjrnduu3iytwhtt36g2d54', // gamesdonequick.bsky.social
  'did:plc:i52rffe5ktfyfgiunsirz7ge', // ladyarcaders.com
  'did:plc:zsk2ehpsgci254k3r3czqcpe', // pixelperfectevents.bsky.social
  'did:plc:q7ecflq2zteowyqgysmstb2e', // powerupwithpride.bsky.social
  'did:plc:yggbmd27ii4z3cpgpabaa2gn', // preventathon.bsky.social
  'did:plc:x6b5kfl6bnrgplbentbei6mg', // therpgvalkyries.bsky.social
  'did:plc:pz54re7np33stvrgz4bj6nbl', // rtajapan.bsky.social
  'did:plc:mfmbxqdlvkunpb2i2rwdtvhn', // therun.bsky.social
  'did:plc:275rmae3bc63ib5pcsmmtw5d', // fastestfurs.com
  'did:plc:5f3tjhknxvpmjt2mazg7n57g', // bsgmarathon.bsky.social
]

export { matchPatterns, matchUsers, matchText }
