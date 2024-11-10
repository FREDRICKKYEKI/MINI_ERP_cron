"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const utils_1 = require("./utils");
console.log("Starting cron job...");
// Schedule the cron job to run daily at midnight
node_cron_1.default.schedule("0 0 * * *", () => {
    console.log("Running daily subscription check...");
    (0, utils_1.checkSubscriptions)();
});
