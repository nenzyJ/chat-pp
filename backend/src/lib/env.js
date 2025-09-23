import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLOUNDINARY_CLOUD_NAME: process.env.CLOUNDINARY_CLOUD_NAME,
  CLOUNDINARY_API_KEY: process.env.CLOUNDINARY_API_KEY,
  CLOUNDINARY_API_SECRET: process.env.CLOUNDINARY_API_SECRET,
};
