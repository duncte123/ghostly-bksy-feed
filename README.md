# The Ghost Zone Bluesky Feed

A fork of the SpeedFeed (https://github.com/goth-uhaul/hjb-speedfeed). I really liked how the SpeedFeed worked and offered the functionality that I wanted so I forked it and turned it into a ghost zone.

# Keywords

The feed algorithm looks for certain words, regex matches, and bsky users. See `src/subscription.ts` for the full list.

# Running the Server

Install dependencies with `yarn` and then run the server with `yarn start`. This will start the server on port 3200.

# Publishing the Feed

Fill out `.env.example`, rename it to `.env`, and run `yarn publishFeed`.
