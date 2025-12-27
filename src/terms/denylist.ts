const bannedText: string[] = [
  // dp specific tags to block
  '#pompouspep',
  '#pompep',
  // TODO: add other problematic ships (and sadly learn the names of those *sigh*)

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
  ' spank ',
  ' spankink ',
  ' spunk ',
  ' tosser ',
  ' turd ',
  ' twat ',
  ' vagina ',
  ' wank ',
  ' whore ',
  // *sigh*
  '#yaoi',
  '#hentai',
  '#r34',
  '#rule43',
  '#spank',
]

// Exclude posts from these users
const bannedUsers: string[] = [
  'did:plc:ju7elc27naswr6mnvpevfqxn', // sperezart.bsky.social (untagged nsfw artist, sorry, trying to keep the feed clean)
  'did:plc:rypydv2x5sswveg6haa4vbrc', // evercras.bsky.social (untagged nsfw artist, sorry, trying to keep the feed clean)
  'did:plc:myv7p4kiyipudlh2y4mzo5td', // otulissa.bsky.social (untagged nsfw artist, sorry, trying to keep the feed clean)
  'did:plc:vgvx54edh36hak6deqpz3xt5', // jac26qq308.bsky.social (untagged nsfw artist, sorry, trying to keep the feed clean)
  'did:plc:p6cxe24t5uywfs5rzozkkomq', // zeusai.bsky.social (AI Slop)
  'did:plc:m7o4sqt7j6n6pht5vnkey77h', // emfres1.bsky.social (untagged drug abuse content)
  'did:plc:rwlypgeog55lvyfnaa6uscsz', // tvileplume.bsky.social (NSFW)
  'did:plc:yv7ewqwhsslkbxtjilx4ruzg', // strangecutlery.bsky.social (NSFW)
]

export { bannedText, bannedUsers }
