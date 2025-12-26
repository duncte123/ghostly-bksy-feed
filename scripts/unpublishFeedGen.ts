import dotenv from 'dotenv'
import { AtpAgent, BlobRef } from '@atproto/api'
import fs from 'fs/promises'
import { ids } from '../src/lexicon/lexicons'
import inquirer from 'inquirer'

const run = async () => {
  dotenv.config()
  // YOUR bluesky handle
  // Ex: user.bsky.social
  const handle = 'im.going-g.host'

  // YOUR bluesky password, or preferably an App Password (found in your client settings)
  // Ex: abcd-1234-efgh-5678
  const password = process.env.FEED_PASSWORD as string

  // A short name for the record that will show in urls
  // Lowercase with no spaces.
  // Ex: whats-hot
  const recordName = 'ghost-zone'

  // optional custom service (null for our purposes)
  const service = null

  const answers = await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to delete this record? Any likes that your feed has will be lost:',
        default: false,
      }
    ])

  const { confirm } = answers

  if (!confirm) {
    console.log('Aborting...')
    return
  }

  // only update this if in a test environment
  const agent = new AtpAgent({ service: service ? service : 'https://bsky.social' })
  await agent.login({ identifier: handle, password })

  await agent.com.atproto.repo.deleteRecord({
    repo: agent.session?.did ?? '',
    collection: ids.AppBskyFeedGenerator,
    rkey: recordName,
  })

  console.log('All done 🎉')
}

run()
