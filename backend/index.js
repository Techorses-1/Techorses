const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Service = require('./models/Service'); // ✅ Renamed
const LetsTalk = require('./models/LetsTalk');
const GeneralInquiry = require('./models/GeneralInquiry');
const GlobalInquiry = require('./models/GlobalInquiry'); // ✅ NEW
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit'); // ✅ NEW

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ NEW: needed because the server is behind nginx (so rate limit sees the real user IP)
app.set('trust proxy', 1);

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

// =====================================================================
// ✅ NEW Route: POST /api/global-inquiry (NO reCAPTCHA - uses rate limit)
// =====================================================================

// Max 5 submissions per IP every 15 minutes
const globalInquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again after some time.'
  }
});

app.post('/global-inquiry', globalInquiryLimiter, async (req, res) => {
  try {
    // Read + clean values
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const phone = String(req.body.phone || '').trim();
    const service = String(req.body.service || '').trim();
    const message = String(req.body.message || '').trim();

    // ---------- Server side validation ----------
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ success: false, message: 'Please enter a valid name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const phoneRegex = /^\+?[\d\s-]{7,16}$/;
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phoneRegex.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return res.status(400).json({ success: false, message: 'Please enter a valid phone number.' });
    }

    const allowedServices = [
      'Web Development',
      'Custom Software',
      'Marketing Solution',
      'Graphic Design',
      'UI/UX Design',
      'Mobile App'
    ];
    if (service && !allowedServices.includes(service)) {
      return res.status(400).json({ success: false, message: 'Please select a valid service.' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ success: false, message: 'Message is too long (max 2000 characters).' });
    }

    // ---------- Save to DB ----------
    const inquiry = new GlobalInquiry({ name, email, phone, service, message });
    await inquiry.save();

    // Optional fields fallback for emails
    const serviceText = service || 'Not specified';
    const messageText = message || 'No message';

    // ---------- Email to user ----------
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: service
        ? `Thanks for contacting us about ${service}`
        : `Thanks for contacting us!`,
      text: service
        ? `Hi ${name},\n\nThanks for contacting us about ${service}. We have received your message and our team will get back to you very soon!\n\nRegards,\nTeam Techorses`
        : `Hi ${name},\n\nThanks for contacting us. We have received your message and our team will get back to you very soon!\n\nRegards,\nTeam Techorses`
    });

    // ---------- Email to admin ----------
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Global Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceText}\n\nMessage:\n${messageText}`
    });

    res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Global Inquiry Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
});

app.get('/', (req, res) => {
  res.send('New Hello World From Techorses!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});