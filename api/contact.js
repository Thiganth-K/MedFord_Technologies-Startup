import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, designation, email, organization, enquire, message } = req.body;

  // Validate required fields
  if (!fullName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields.'
    });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
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
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${designation ? `<p><strong>Designation:</strong> ${designation}</p>` : ''}
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        ${enquire ? `<p><strong>Enquiry Type:</strong> ${enquire}</p>` : ''}
      </div>
      
      <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">Message</h3>
        <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `;

  try {
    // Send email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'support@medford.in',
      subject: `New Contact Form Submission from ${fullName}`,
      html: companyEmailContent,
      replyTo: email
    });

    console.log(`✅ Email sent successfully for ${fullName} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    });
  }
}
