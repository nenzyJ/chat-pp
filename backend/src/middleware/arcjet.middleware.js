import aj from "../lib/arcjet.js";

import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, res);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests, please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({ message: "Access denied." });
      }
    }
    //check for spoofed bots
    if( decision.results.some(isSpoofedBot)){
        return res.status(403).json({
            error: "Access denied. Spoofed bot detected.",
            message: "Access denied. Spoofed bot detected."
        });
    }
    next();
  } catch (error) {
    console.log("Arcjet middleware error:", error);
  }
};
