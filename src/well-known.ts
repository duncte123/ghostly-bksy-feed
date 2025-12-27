import express from 'express'
import { AppContext } from './config'

const makeRouter = (ctx: AppContext) => {
  const router = express.Router()

  router.get('/', (_req, res) => {
    res.redirect(302, 'https://bsky.app/profile/im.going-g.host/feed/ghost-zone');
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
