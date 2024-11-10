import cron from "node-cron";
import { checkSubscriptions } from "./utils";

console.log("Starting cron job...");
// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running daily subscription check...");
  checkSubscriptions();
});
