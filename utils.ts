/**
 * @description This file contains utility functions used in the application
 */
import nodemailer from "nodemailer";
import { VirtualDatabase } from "./db";
import { ENVS } from "./config";

// Configure nodemailer transporter if actually sending emails
/**
 * @description This is a nodemailer transporter that uses Gmail to send emails
 */
export const transporter = nodemailer.createTransport({
  service: "", // ENVS.CRON_EMAIL_SERVICE,
  auth: {
    user: ENVS.CRON_EMAIL,
    pass: ENVS.CRON_EMAIL_PASSWORD,
  },
});

/** Function to send email (or simulate email sending)
 * @param email - Email address of the recipient
 * @param subject - Subject of the email
 * @param message - Body of the email
 * @throws Error if sending email fails
 * @returns Promise<void>
 * */
export const sendEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  // send email
  await transporter.sendMail({
    from: ENVS.CRON_EMAIL,
    to: email,
    subject: subject,
    text: message,
  });
};

const updateDB = async (subscription: any) => {
  const db = new VirtualDatabase();
  const data = await db.Subscription.update(
    { status: "expired" },
    { where: { id: subscription.id } }
  );
  if (data.status !== "200") {
    throw new Error(
      `Failed to update subscription status for ${subscription.id}`
    );
  }
  return data;
};

/**
 * @description This function checks all active subscriptions and sends reminders to users
 */
export const checkSubscriptions = async () => {
  const today = new Date();
  const fiveDaysFromNow = new Date(today);
  fiveDaysFromNow.setDate(today.getDate() + 5);

  try {
    // Fetch all active subscriptions
    const db = new VirtualDatabase();
    const subscriptions = await db.Subscription.findAll({
      include: "User",
    });

    // Process each subscription
    subscriptions.forEach((subscription) => {
      const {
        expiry_date,
        User: { email, name },
      } = subscription;

      const expiryDate = new Date(expiry_date);

      // Check if subscription expires today
      if (expiryDate.toDateString() === today.toDateString()) {
        sendEmail(
          email,
          "Subscription Expired",
          `Hello ${name}, your subscription has expired today.`
        );
        // Update subscription status to expired
        updateDB(subscription).then((data) => {
          console.log("Subscription status updated to expired");
        });
      }
      // Check if subscription expires in five days
      else if (expiryDate.toDateString() === fiveDaysFromNow.toDateString()) {
        sendEmail(
          email,
          "Subscription Expiring Soon",
          `Hello ${name}, your subscription will expire in 5 days.`
        );
      }
    });
  } catch (error) {
    console.error("Error checking subscriptions:", error);
  }
};
