import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

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

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password for Gmail
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

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

    // Email content for the company
    const companyEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #7c3aed; margin: 0;">New Contact Form Submission</h2>
          <p style="color: #666; margin: 5px 0;">Medford Technologies Website</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Name:</td>
              <td style="padding: 8px 0; color: #333;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #333;">${email}</td>
            </tr>
            ${designation ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Designation:</td>
              <td style="padding: 8px 0; color: #333;">${designation}</td>
            </tr>
            ` : ''}
            ${organization ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Organization:</td>
              <td style="padding: 8px 0; color: #333;">${organization}</td>
            </tr>
            ` : ''}
            ${enquire ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Enquiry Type:</td>
              <td style="padding: 8px 0; color: #333;">${enquire}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
          <p>This email was sent from the Medford Technologies contact form.</p>
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Email content for the user (auto-reply)
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #7c3aed; margin: 0;">Thank You for Contacting Us!</h2>
          <p style="color: #666; margin: 5px 0;">Medford Technologies</p>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #333; margin: 0 0 15px 0;">Dear ${fullName},</p>
          <p style="color: #555; line-height: 1.6; margin: 0 0 15px 0;">
            Thank you for reaching out to us! We have received your inquiry and our team will review it shortly.
          </p>
          <p style="color: #555; line-height: 1.6; margin: 0 0 15px 0;">
            We typically respond to inquiries within 24-48 hours during business days. If your inquiry is urgent, 
            please feel free to call us at <strong>+91 90807 05892</strong>.
          </p>
          <p style="color: #555; line-height: 1.6; margin: 0;">
            Best regards,<br>
            <strong>The Medford Technologies Team</strong>
          </p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
          <p style="color: #666; margin: 5px 0;"><strong>Enquiry Type:</strong> ${enquire || 'General Inquiry'}</p>
          <p style="color: #666; margin: 5px 0;"><strong>Organization:</strong> ${organization || 'Not specified'}</p>
          <p style="color: #555; line-height: 1.6; margin-top: 15px; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #7c3aed; color: white; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Connect With Us</h3>
          <p style="margin: 5px 0;">📧 support@medford.in</p>
          <p style="margin: 5px 0;">📞 +91 90807 05892</p>
          <p style="margin: 15px 0 5px 0; font-size: 14px;">Follow us on social media for updates!</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    try {
      // Send email to company
      const companyMailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO || 'support@medford.in',
        subject: `New Contact Form Submission from ${fullName}`,
        html: companyEmailContent,
        replyTo: email
      };

      // Send auto-reply to user
      const userMailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Thank you for contacting Medford Technologies',
        html: userEmailContent
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(companyMailOptions),
        transporter.sendMail(userMailOptions)
      ]);

      console.log(`✅ Emails sent successfully for ${fullName} (${email})`);

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

    // Company email content
    const companyEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7c3aed; margin: 0; font-size: 28px;">🚀 New Career Application!</h1>
          <p style="color: #666; margin: 10px 0; font-size: 16px;">Someone is interested in joining MedFord Technologies</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Applicant Details</h3>
          <p style="color: #666; margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
          <p style="color: #666; margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
          <p style="color: #666; margin: 8px 0;"><strong>📱 Phone:</strong> ${number}</p>
          <p style="color: #666; margin: 8px 0;"><strong>💼 Position Type:</strong> ${jobType.charAt(0).toUpperCase() + jobType.slice(1)}</p>
          <p style="color: #666; margin: 8px 0;"><strong>🎯 Desired Role:</strong> ${role}</p>
          <p style="color: #666; margin: 8px 0;"><strong>✅ Terms Accepted:</strong> Yes</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #7c3aed; color: white; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Next Steps</h3>
          <p style="margin: 5px 0;">Review the application and reach out to the candidate</p>
          <p style="margin: 5px 0;">📧 Reply to: ${email}</p>
          <p style="margin: 5px 0;">📞 Contact: ${number}</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>This email was sent from the MedFord Technologies career application form.</p>
        </div>
      </div>
    `;

    // User auto-reply email content
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7c3aed; margin: 0; font-size: 28px;">Thank You for Your Application! 🎉</h1>
          <p style="color: #666; margin: 10px 0; font-size: 16px;">We've received your career application</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Hello ${name}!</h3>
          <p style="color: #555; line-height: 1.6;">
            Thank you for your interest in joining MedFord Technologies! We're excited to learn that you're interested in the <strong>${role}</strong> position as a <strong>${jobType}</strong>.
          </p>
          <p style="color: #555; line-height: 1.6;">
            Our HR team will review your application and get back to you within 3-5 business days. We appreciate your patience during this process.
          </p>
        </div>
        
        <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Your Application Summary</h3>
          <p style="color: #666; margin: 5px 0;"><strong>Position:</strong> ${role}</p>
          <p style="color: #666; margin: 5px 0;"><strong>Type:</strong> ${jobType.charAt(0).toUpperCase() + jobType.slice(1)}</p>
          <p style="color: #666; margin: 5px 0;"><strong>Contact Email:</strong> ${email}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #7c3aed; color: white; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Stay Connected</h3>
          <p style="margin: 5px 0;">📧 hr@medford.in</p>
          <p style="margin: 5px 0;">📞 +91 90807 05892</p>
          <p style="margin: 15px 0 5px 0; font-size: 14px;">Follow us on social media for company updates!</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>This is an automated response. If you have any questions, please contact our HR team.</p>
        </div>
      </div>
    `;

    try {
      // Send email to company (HR team)
      const companyMailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO || 'support@medford.in',
        subject: `New Career Application: ${name} for ${role} (${jobType})`,
        html: companyEmailContent,
        replyTo: email
      };

      // Send auto-reply to applicant
      const userMailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Thank you for your application - MedFord Technologies',
        html: userEmailContent
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(companyMailOptions),
        transporter.sendMail(userMailOptions)
      ]);

      console.log(`✅ Career application emails sent successfully for ${name} (${email})`);

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

// Serve static files from the dist directory (created by vite build)
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Render
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// For all routes, serve the index.html file (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});