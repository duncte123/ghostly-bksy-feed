import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'
import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'
import { matchPatterns, matchText, matchUsers } from './terms/match'
import { bannedText, bannedUsers } from './terms/denylist'

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return

    const ops = await getOpsByType(evt)

    const postsToDelete = ops.posts.deletes.map((del) => del.uri)
    const postsToCreate = ops.posts.creates
      .filter((create) => {
        const txt = create.record.text.replace('-', ' ').toLowerCase()

        // cannot get TS to work with create.record.labels - fix later
        const plainTextLabels = JSON.stringify(create.record.labels ?? '{}')

        // exclude labeled NSFW
        const postIsNsfw =
          plainTextLabels.includes('porn') ||
          plainTextLabels.includes('nudity') ||
          plainTextLabels.includes('sexual') ||
          plainTextLabels.includes('graphic-media')

        // exclude posts without ALT text
        let allImagesHaveAltText = true

        // Disable alt checks for now, will re-enable when this becomes a problem
        /*if (create.record.embed?.images instanceof Array) {
          create.record.embed.images.map((image) => {
            if (!image.alt) {
              allImagesHaveAltText = false
            }
          })
        }*/

        // TODO: exclude replies from whitelisted accounts

        return (
          (matchText.some((term) => txt.includes(term)) ||
            matchPatterns.some((pattern) => pattern.test(txt)) ||
            matchUsers.includes(create.author)) &&
          allImagesHaveAltText &&
          !bannedUsers.includes(create.author) &&
          !bannedText.some((term) => txt.includes(term)) &&
          !postIsNsfw
        )
      }) // validation function
      .map((create) => {
        // map speedrun related posts to a db row
        console.log(`Found post by ${create?.author}: ${create?.record?.text}`)

        //console.log(JSON.stringify(create))
        //console.log(JSON.stringify(create.record.labels))
        //console.log(JSON.stringify(create.record.embed?.images))

        return {
          uri: create.uri,
          cid: create.cid,
          indexedAt: new Date().toISOString(),
        }
      })

    if (postsToDelete.length > 0) {
      await this.db
        .deleteFrom('post')
        .where('uri', 'in', postsToDelete)
        .execute()
    }
    if (postsToCreate.length > 0) {
      await this.db
        .insertInto('post')
        .values(postsToCreate)
        .onConflict((oc) => oc.doNothing())
        .execute()
    }
  }
}
