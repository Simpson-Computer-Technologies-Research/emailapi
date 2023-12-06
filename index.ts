// Express api for sending an email with nodemailer
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import { type Mail, fetchMailVariables } from "./utils/env";

// Initialize the express server
const app = express();
app.use(cors());
app.use(express.json());

// Fetch the environment variables
const MailVariables: Mail = fetchMailVariables();
const transporter = nodemailer.createTransport({
  host: MailVariables.host,
  port: MailVariables.port,
  auth: {
    user: MailVariables.email,
    pass: MailVariables.password,
  },
});

/**
 * @route POST /email
 * @desc Send an email
 * @access Public
 */
app.post("/email", async (req, res) => {
  // Destructure the request body
  const { subject, message } = req.body;
  const from = req.body.from as {
    name: string;
    email: string;
    phone: string;
  };

  // Validate the request body
  if (!subject || !message || !from.name || !from.email) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  // Send the email
  transporter
    .sendMail({
      from: from.name,
      to: MailVariables.email,
      subject: subject,
      text: message,
    })
    .then(() => {
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error sending email" });
    });
});
