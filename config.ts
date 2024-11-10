import { configDotenv } from "dotenv";

// Load environment variables
console.debug("Loading environment variables...");
configDotenv({
  path: ".env",
});

const CRON_SECRET_KEY = process.env.CRON_SECRET_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";
const CRON_ENDPOINT = process.env.CRON_ENDPOINT || "";
const CRON_BACKEND_URL = BACKEND_URL + CRON_ENDPOINT;
const CRON_EMAIL = process.env.CRON_EMAIL || "";
const CRON_EMAIL_PASSWORD = process.env.CRON_EMAIL_PASSWORD || "";

if (
  !CRON_SECRET_KEY ||
  !BACKEND_URL ||
  !CRON_ENDPOINT ||
  !CRON_EMAIL ||
  !CRON_EMAIL_PASSWORD
) {
  console.debug({ CRON_SECRET_KEY, BACKEND_URL, CRON_ENDPOINT });
  throw new Error("Some environment variables are missing");
}

export const ENVS = {
  CRON_SECRET_KEY,
  BACKEND_URL,
  CRON_BACKEND_URL,
  CRON_EMAIL,
  CRON_EMAIL_PASSWORD,
};
