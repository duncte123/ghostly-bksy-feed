import express from 'express'
import { AppContext } from './config'
import { fetchDid } from './util/bskyApiUtils'
import { Database } from './db'

const makeRouter = (ctx: AppContext, db: Database) => {
  const router = express.Router()

  router.get('/', (_req, res) => {
    res.redirect(302, 'https://bsky.app/profile/im.going-g.host/feed/ghost-zone');
  });

  router.delete('/post', express.json(), async (req, res) => {
    console.log('Got post delte request', JSON.stringify(req.body))

    if (!req.body || !req.body.token || !req.body.username || !req.body.postId) {
      return res.sendStatus(404);
    }

    const { token, username, postId } = req.body;

    if (token !== process.env.FEED_PASSWORD) {
      return res.sendStatus(404);
    }

    let finalUsername = username;

    if (!finalUsername.startsWith('did:plc')) {
      finalUsername = await fetchDid(username);
    }

    const postUri = `at://${finalUsername}/app.bsky.feed.post/${postId}`;

    await db.deleteFrom('post')
      .where('uri', '=', postUri)
      .execute();

    res.sendStatus(204);
  });

  router.get('/.well-known/did.json', (_req, res) => {
    if (!ctx.cfg.serviceDid.endsWith(ctx.cfg.hostname)) {
      return res.sendStatus(404)
    }
    res.json({
      '@context': ['https://www.w3.org/ns/did/v1'],
      id: ctx.cfg.serviceDid,
      service: [
        {
          id: '#bsky_fg',
          type: 'BskyFeedGenerator',
          serviceEndpoint: `https://${ctx.cfg.hostname}`,
        },
      ],
    })
  })

  return router
}
export default makeRouter
