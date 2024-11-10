# Subscription Management Cron Job

This service is a Node.js cron job that periodically checks user subscriptions and sends email notifications when they are nearing expiration or have expired for the [MINI ERP project](https://github.com/FREDRICKKYEKI/MINI_ERP).

## Features

- **Daily Subscription Check**: Runs every day to inspect all active subscriptions.
- **Automated Notifications**: Sends email notifications to users:
  - 5 days before their subscription expires.
  - On the day their subscription expires.
- **Customizable Email Configuration**: Integrates with an email provider (e.g., Gmail, Roundcube) using `nodemailer`.

## Prerequisites

- **Node.js** and **npm**
- A configured email service with credentials for use with `nodemailer`
- **SQLite** or your preferred database setup to store subscription data

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following content:
    ```plaintext
    CRON_SECRET_KEY=cr0nS3rv1c3S3cr3t
    BACKEND_URL=<your backend url>
    CRON_ENDPOINT=<"e.g, /api/v1/cron">
    CRON_EMAIL=test@example.com
    CRON_EMAIL_PASSWORD=yourpassword
    ```

## Configuration

1. **Database**: Ensure the database (`db.sqlite` or your preferred DB) is initialized with tables for `users` and `subscriptions`. Refer to the SQL schema files for structure if needed.
2. **Email Provider**: Configure the email provider in the `nodemailer` setup in `mailer.js` or similar. Make sure to set the `service` field to match your email provider, e.g., `"Gmail"` or `"Roundcube"`.

## Usage

### Running the Cron Job

To start the cron job manually, run:

```bash
npm run dev
```
