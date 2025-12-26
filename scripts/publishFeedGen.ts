import dotenv from 'dotenv'
import inquirer from 'inquirer'
import { AtpAgent, BlobRef, AppBskyFeedDefs } from '@atproto/api'
import fs from 'fs/promises'
import { ids } from '../src/lexicon/lexicons'

const run = async () => {
  dotenv.config() // YOUR bluesky handle
  // Ex: user.bsky.social
  const handle = 'im.going-g.host'

  // optional custom service (null for our purposes)
  const service = null

  // YOUR bluesky password, or preferably an App Password (found in your client settings)
  // Ex: abcd-1234-efgh-5678
  const password = process.env.FEED_PASSWORD as string

  // A short name for the record that will show in urls
  // Lowercase with no spaces.
  // Ex: whats-hot
  const recordName = 'ghost-zone'

  // A display name for your feed
  // Ex: What's Hot
  const displayName = '👻 The Ghost zone'

  // (Optional) A description of your feed
  // Ex: Top trending content from the whole network
  const description =
    'Everything Danny Phantom related! Also known as the fandom that embraces the definition of vivisection. For guaranteed inclusion, use #DannyPhantom. FAQ: https://github.com/duncte123/ghostly-bksy-feed/blob/main/faq.md.'

  // (Optional) The path to an image to be used as your feed's avatar
  // Ex: ~/path/to/avatar.jpeg
  const avatar: string = 'avatar.jpg'

  // Is this a video-only feed?
  const videoOnly: boolean = false

  // -------------------------------------
  // NO NEED TO TOUCH ANYTHING BELOW HERE
  // -------------------------------------

  if (!process.env.FEEDGEN_SERVICE_DID && !process.env.FEEDGEN_HOSTNAME) {
    throw new Error('Please provide a hostname in the .env file')
  }
  const feedGenDid =
    process.env.FEEDGEN_SERVICE_DID ?? `did:web:${process.env.FEEDGEN_HOSTNAME}`

  // only update this if in a test environment
  const agent = new AtpAgent({
    service: service ? service : 'https://bsky.social',
  })
  await agent.login({ identifier: handle, password })

  let avatarRef: BlobRef | undefined
  if (avatar) {
    let encoding: string
    if (avatar.endsWith('png')) {
      encoding = 'image/png'
    } else if (avatar.endsWith('jpg') || avatar.endsWith('jpeg')) {
      encoding = 'image/jpeg'
    } else {
      throw new Error('expected png or jpeg')
    }
    const img = await fs.readFile(avatar)
    const blobRes = await agent.com.atproto.repo.uploadBlob(img, {
      encoding,
    })
    avatarRef = blobRes.data.blob
  }

  await agent.com.atproto.repo.putRecord({
    repo: agent.session?.did ?? '',
    collection: ids.AppBskyFeedGenerator,
    rkey: recordName,
    record: {
      did: feedGenDid,
      displayName: displayName,
      description: description,
      avatar: avatarRef,
      createdAt: new Date().toISOString(),
      contentMode: videoOnly
        ? AppBskyFeedDefs.CONTENTMODEVIDEO
        : AppBskyFeedDefs.CONTENTMODEUNSPECIFIED,
    },
  })

  console.log('All done 🎉')
}

run()
