import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
let transporter = null;

/**
 * Initialize the email transporter
 * @returns {Object} The nodemailer transporter
 */
export const initializeTransporter = () => {
  const hasEmailCreds = process.env.EMAIL_USER && (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD);
  
  if (hasEmailCreds) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error);
      } else {
        console.log('✅ Email transporter is ready');
      }
    });

  } else {
    // Dev fallback: create a stub transporter that logs emails instead of sending them
    console.warn('⚠️ Email credentials missing. Using dev-stub transporter — emails will be logged to the server console.');
    transporter = {
      sendMail: async (mailOptions) => {
        console.log('\n--- DEV EMAIL OUTPUT (not sent) ---');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('HTML:', mailOptions.html);
        console.log('--- END DEV EMAIL OUTPUT ---\n');
        return Promise.resolve({ accepted: [mailOptions.to || process.env.EMAIL_TO || 'dev@example.local'] });
      }
    };
  }

  return transporter;
};

/**
 * Get the email transporter (initializes if not already done)
 * @returns {Object} The nodemailer transporter
 */
export const getTransporter = () => {
  if (!transporter) {
    return initializeTransporter();
  }
  return transporter;
};

/**
 * Send a simple enquiry email (legacy format from original app.js)
 * @param {Object} params - Email parameters
 * @param {string} params.name - Sender name
 * @param {string} params.designation - Sender designation
 * @param {string} params.email - Sender email
 * @param {string} params.organization - Sender organization
 * @param {string} params.message - Message content
 * @param {string} params.enquiry - Enquiry type
 */
export const sendEmail = async ({ name, designation, email, organization, message, enquiry }) => {
  const emailTransporter = getTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || 'reach.medford@gmail.com',
    subject: `New Enquiry from ${name}`,
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h3 style="color: #7c3aed;">New Enquiry Received</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Designation:</td>
            <td style="padding: 8px; color: #333;">${designation || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px; color: #333;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Organization:</td>
            <td style="padding: 8px; color: #333;">${organization || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Enquiry Type:</td>
            <td style="padding: 8px; color: #333;">${enquiry || 'General'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <h4 style="color: #333; margin-top: 0;">Message:</h4>
          <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

/**
 * Send contact form emails (to company + auto-reply to user)
 * @param {Object} params - Contact form data
 */
export const sendContactFormEmails = async ({ fullName, designation, email, organization, enquire, message }) => {
  const emailTransporter = getTransporter();

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

  // Send email to company
  const companyMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || 'support@medford.in',
    subject: `New Contact Form Submission from ${fullName}`,
    html: companyEmailContent,
    replyTo: email
  };

  // Send auto-reply to user
  const userMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting Medford Technologies',
    html: userEmailContent
  };

  // Send both emails
  await Promise.all([
    emailTransporter.sendMail(companyMailOptions),
    emailTransporter.sendMail(userMailOptions)
  ]);

  console.log(`✅ Contact form emails sent successfully for ${fullName} (${email})`);
  return { success: true };
};

/**
 * Send career application emails (to company + auto-reply to applicant)
 * @param {Object} params - Career form data
 */
export const sendCareerFormEmails = async ({ name, jobType, role, number, email }) => {
  const emailTransporter = getTransporter();

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

  // Send email to company (HR team)
  const companyMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || 'support@medford.in',
    subject: `New Career Application: ${name} for ${role} (${jobType})`,
    html: companyEmailContent,
    replyTo: email
  };

  // Send auto-reply to applicant
  const userMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for your application - MedFord Technologies',
    html: userEmailContent
  };

  // Send both emails
  await Promise.all([
    emailTransporter.sendMail(companyMailOptions),
    emailTransporter.sendMail(userMailOptions)
  ]);

  console.log(`✅ Career application emails sent successfully for ${name} (${email})`);
  return { success: true };
};

// Export default object with all functions
export default {
  initializeTransporter,
  getTransporter,
  sendEmail,
  sendContactFormEmails,
  sendCareerFormEmails
};
