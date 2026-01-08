const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const JWT_SECRET = process.env.JWT_SECRET;

const sendEmail = async ({ name, designation, email, organization, message, enquiry }) => {
    console.log(process.env.EMAIL_PASSWORD, process.env.EMAIL_USER);
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'keerthishanmugamkk@gmail.com',
        subject: `New Enquiry from ${name}`,
        html: `
            <h3>New Enquiry Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Designation:</strong> ${designation}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Enquiry Type:</strong> ${enquiry}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Invalid request');
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send('Invalid request');
    }
    jwt.verify(token, JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).send('Invalid request');
        }
        next();
    });
};

app.post('/submit', verifyToken, async (req, res) => {
    const { name, designation, email, organization, message, enquiry, isbot } = req.body;
    if(!name || !designation || !email || !organization || !message || !enquiry){
        res.status(400).send('Required Fields not filled');
    }
    
    if(isbot) {
        res.status(200).send('Form submitted and email sent!');
        return;
    }
    try {
        await sendEmail({ name, designation, email, organization, message, enquiry, isbot });
        res.status(200).send('Form submitted and email sent!');
    } catch (error) {
        res.status(500).send('Failed to send email');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
