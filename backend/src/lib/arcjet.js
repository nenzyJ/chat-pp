import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";

import {ENV} from './env.js';

const aj = arcjet({

  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: ENV.NODE_ENV === "development" ? "DRY_RUN" : "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: ENV.NODE_ENV === "development" ? "DRY_RUN" : "LIVE", // DRY_RUN for development, LIVE for production
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
        mode: "LIVE",
        max: 100, 
        interval: 60, 
    }),
  ],
});

export default aj;