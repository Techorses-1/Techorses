const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Service = require('./models/Service'); // ✅ Renamed
const LetsTalk = require('./models/LetsTalk');
const GeneralInquiry = require('./models/GeneralInquiry');
const cors = require('cors');
const axios = require('axios');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Mongo error:', err));

// Nodemailer Transport (Hostinger)
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function verifyRecaptcha(recaptchaResponse) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

    console.log('Verifying reCAPTCHA with response:', recaptchaResponse?.substring(0, 20) + '...');

    const response = await axios.post(verificationUrl, null, {
      params: {
        secret: secretKey,
        response: recaptchaResponse
      }
    });

    console.log('reCAPTCHA verification result:', response.data);

    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// ✅ Route: POST /api/service-inquiry (UPDATED WITH reCAPTCHA)
app.post('/service-inquiry', async (req, res) => {
  const { name, phone, email, subject, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

  try {
    // ✅ VERIFY RECAPTCHA FIRST
    const isRecaptchaValid = await verifyRecaptcha(recaptchaResponse);

    if (!isRecaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.'
      });
    }

    const service = new Service({ name, phone, email, subject, message });
    await service.save();

    // Email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for your inquiry: ${subject}`,
      text: `Hi ${name},\n\nThanks for reaching out about ${subject}.\n\nWe'll get back to you shortly.`
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Service Inquiry from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    });

    res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Service Inquiry Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// ✅ Route: POST /api/lets-talk (ALREADY HAS reCAPTCHA)
app.post('/lets-talk', async (req, res) => {
  const { name, phone, email, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

  try {
    // ✅ VERIFY RECAPTCHA FIRST
    const isRecaptchaValid = await verifyRecaptcha(recaptchaResponse);

    if (!isRecaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.'
      });
    }

    // Continue with existing logic if reCAPTCHA is valid
    const talk = new LetsTalk({ name, phone, email, message });
    await talk.save();

    // Email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out!`,
      text: `Hi ${name},\n\nThanks for your message. We will get back to you very soon!`
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Let's Talk Submission from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error("Let's Talk form error:", error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// ✅ Route: POST /api/general-inquiry (UPDATED WITH reCAPTCHA)
app.post('/general-inquiry', async (req, res) => {
  const { name, email, phone, subject, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

  try {
    // ✅ VERIFY RECAPTCHA FIRST
    const isRecaptchaValid = await verifyRecaptcha(recaptchaResponse);

    if (!isRecaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.'
      });
    }

    const inquiry = new GeneralInquiry({ name, email, phone, subject, message });
    await inquiry.save();

    // Email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for contacting us!`,
      text: `Hi ${name},\n\nThanks for your message. We will get back to you very soon!`
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New General Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`
    });

    res.status(200).json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("General Inquiry Error:", error);
    res.status(500).json({ success: false, message: "Failed to submit inquiry" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});