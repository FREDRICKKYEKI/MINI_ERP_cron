"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSubscriptions = exports.sendEmail = exports.transporter = void 0;
/**
 * @description This file contains utility functions used in the application
 */
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = require("./db");
const config_1 = require("./config");
// Configure nodemailer transporter if actually sending emails
/**
 * @description This is a nodemailer transporter that uses Gmail to send emails
 */
exports.transporter = nodemailer_1.default.createTransport({
    service: "", // ENVS.CRON_EMAIL_SERVICE,
    auth: {
        user: config_1.ENVS.CRON_EMAIL,
        pass: config_1.ENVS.CRON_EMAIL_PASSWORD,
    },
});
/** Function to send email (or simulate email sending)
 * @param email - Email address of the recipient
 * @param subject - Subject of the email
 * @param message - Body of the email
 * @throws Error if sending email fails
 * @returns Promise<void>
 * */
const sendEmail = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    // send email
    yield exports.transporter.sendMail({
        from: config_1.ENVS.CRON_EMAIL,
        to: email,
        subject: subject,
        text: message,
    });
});
exports.sendEmail = sendEmail;
const updateDB = (subscription) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new db_1.VirtualDatabase();
    const data = yield db.Subscription.update({ status: "expired" }, { where: { id: subscription.id } });
    if (data.status !== "200") {
        throw new Error(`Failed to update subscription status for ${subscription.id}`);
    }
    return data;
});
/**
 * @description This function checks all active subscriptions and sends reminders to users
 */
const checkSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(today.getDate() + 5);
    try {
        // Fetch all active subscriptions
        const db = new db_1.VirtualDatabase();
        const subscriptions = yield db.Subscription.findAll({
            include: "User",
        });
        // Process each subscription
        subscriptions.forEach((subscription) => {
            const { expiry_date, User: { email, name }, } = subscription;
            const expiryDate = new Date(expiry_date);
            // Check if subscription expires today
            if (expiryDate.toDateString() === today.toDateString()) {
                (0, exports.sendEmail)(email, "Subscription Expired", `Hello ${name}, your subscription has expired today.`);
                // Update subscription status to expired
                updateDB(subscription).then((data) => {
                    console.log("Subscription status updated to expired");
                });
            }
            // Check if subscription expires in five days
            else if (expiryDate.toDateString() === fiveDaysFromNow.toDateString()) {
                (0, exports.sendEmail)(email, "Subscription Expiring Soon", `Hello ${name}, your subscription will expire in 5 days.`);
            }
        });
    }
    catch (error) {
        console.error("Error checking subscriptions:", error);
    }
});
exports.checkSubscriptions = checkSubscriptions;
