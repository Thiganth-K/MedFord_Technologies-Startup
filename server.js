import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';

// Import mail module
import { initializeTransporter, sendContactFormEmails, sendCareerFormEmails } from './mail.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize email transporter from app.js mail module
initializeTransporter();

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, designation, email, organization, enquire, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Log the form submission for debugging
    console.log('📧 Contact form submission received:', {
      name: fullName,
      email: email,
      organization: organization || 'Not specified',
      enquiry: enquire || 'General',
      timestamp: new Date().toLocaleString()
    });

    try {
      // Use mail module from app.js to send emails
      await sendContactFormEmails({ fullName, designation, email, organization, enquire, message });
    } catch (emailError) {
      console.error('⚠️ Email sending failed, but form submission recorded:', emailError.message);
      // Continue without failing the form submission
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    });
  }
});

// Career form submission endpoint
app.post('/api/career', async (req, res) => {
  try {
    const { name, jobType, role, number, email, acceptTerms } = req.body;

    // Validate required fields
    if (!name || !email || !role || !number || !acceptTerms) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields and accept the terms and conditions.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    console.log(`📧 Processing career application from ${name} for ${role} position`);

    try {
      // Use mail module from app.js to send emails
      await sendCareerFormEmails({ name, jobType, role, number, email });
    } catch (emailError) {
      console.error('⚠️ Email sending failed, but application recorded:', emailError.message);
      // Continue without failing the application submission
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your application! We will review it and get back to you within 3-5 business days.'
    });

  } catch (error) {
    console.error('❌ Error processing career application:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error submitting your application. Please try again later.'
    });
  }
});

// Serve static files from the dist directory (created by `npm run build`) if it exists.
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));

  // For all routes, serve the index.html file (client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  // If dist doesn't exist (dev environment), keep API available and provide guidance
  console.warn('Warning: `dist` directory not found. Static client files are not being served. Run `npm run build` to create a production build, or run `npm run dev` for development.');

  // Health check endpoint for Render / readiness probe
  app.get('/healthz', (req, res) => {
    res.status(200).send('ok');
  });

  // Fallback for non-API routes in dev — return helpful message
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.status(404).send('Client build not found. Run `npm run build` or use `npm run dev` for development.');
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});