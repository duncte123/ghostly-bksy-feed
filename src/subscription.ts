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
        // Remove replies from whitelisted users
        if (create.record.reply && matchUsers.includes(create.author)) {
          return false;
        }

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
        let imageAltsMatchTerms = false

        // TODO: fix this algo: post did not get through: https://bsky.app/profile/scarletghostx.bsky.social/post/3mb5exu5sbk26 (i can see it in the db tho??? idk what bluesky is doing anymore with feeds)
        if (create.record.embed?.images && Array.isArray(create.record.embed.images)) {
          create.record.embed.images.map((image) => {
            if (image.alt) {
              // TODO: possibly extract this into a method
              imageAltsMatchTerms ||= ((
                matchText.some((term) => image.alt.includes(term)) ||
                matchPatterns.some((pattern) => pattern.test(image.alt))
                // Make sure to exclude banned terms from image alts as well
              ) && !bannedText.some((term) => image.alt.includes(term)));
            }
          })
        }

        return (
          (matchText.some((term) => txt.includes(term)) ||
            matchPatterns.some((pattern) => pattern.test(txt)) ||
            matchUsers.includes(create.author) || imageAltsMatchTerms) &&
          // allImagesHaveAltText &&
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
