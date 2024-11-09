import cron from "node-cron";
import { checkSubscriptions } from "./utils";
import { configDotenv } from "dotenv";

// Load environment variables
configDotenv();

// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running daily subscription check...");
  checkSubscriptions();
});
