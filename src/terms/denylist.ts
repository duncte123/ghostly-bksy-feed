const bannedText: string[] = [
  // obvious
  ' nsfw ',
  '#nsfw',
  ' anal ',
  ' anus ',
  ' ballsack ',
  ' biatch ',
  ' blowjob ',
  ' blow job ',
  ' bollock ',
  ' bollok ',
  ' boner ',
  ' boob ',
  ' bum ',
  ' butt ',
  ' buttplug ',
  ' clitoris ',
  ' cock ',
  ' coon ',
  ' cum ',
  ' cumming ',
  ' cunt ',
  ' dick ',
  ' dildo ',
  ' dyke',
  ' fag ',
  ' faggot ',
  ' fellate ',
  ' fellatio ',
  ' felching ',
  ' fudgepacker ',
  ' fudge packer ',
  ' hell ',
  ' homo ',
  ' jizz ',
  ' knobend ',
  ' knob end ',
  ' labia ',
  ' muff ',
  ' nigger ',
  ' nigga ',
  ' penis ',
  ' piss ',
  ' poop ',
  ' prick ',
  ' pube ',
  ' pussy ',
  ' scrotum ',
  ' slut ',
  ' smegma ',
  ' spunk ',
  ' tosser ',
  ' turd ',
  ' twat ',
  ' vagina ',
  ' wank ',
  ' whore ',
]

// Exclude posts from these users
const bannedUsers: string[] = [
  'did:plc:23thhiqwpowmlelje4ft76br', // gam1ng.bsky.social (bot content)
  'did:plc:25vwhhzdpnaujzookpsqxlns', // lpx.bsky.social (low effort content)
  'did:plc:uamgc5xgnuk4c5dfmikxgxcd', // speedrun-new.bsky.social (frequent automated content)
  'did:plc:rrlwqxpvjxqngeiia6idwce3', // speedrunbot.bsky.social (frequent automated content)
]

export { bannedText, bannedUsers }
