import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { name, email, phone, message } = req.body;

  const smsText = `
New Form Submission 🚀
Name: ${name}
Email: ${email} 
Message: ${message}
`;

  try {
    await client.messages.create({
      body: smsText,
      from: process.env.TWILIO_PHONE,
      to: "+917993011040", // Admin / your number
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}
