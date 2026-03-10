import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
  const { fullName, designation, email, organization, enquire, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required fields.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const companyEmailContent = `
    <h3>New Contact Form Submission</h3>
    <p><b>Name:</b> ${fullName}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Designation:</b> ${designation || "-"}</p>
    <p><b>Organization:</b> ${organization || "-"}</p>
    <p><b>Enquiry:</b> ${enquire || "-"}</p>
    <p><b>Message:</b> ${message}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || "support@medford.in",
      subject: `New Enquiry from ${fullName}`,
      html: companyEmailContent,
      replyTo: email,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};