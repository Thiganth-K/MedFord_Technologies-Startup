# Contact Form Email Setup Guide

## Overview
This guide will help you set up email functionality for your Medford Technologies contact form so that form submissions are automatically sent to your work email.

## Setup Instructions

### 1. Email Configuration (.env file)

Update your `.env` file with the following email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-gmail-address@gmail.com
EMAIL_TO=support@medford.in

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. Gmail Setup (if using Gmail)

If you're using Gmail, you need to set up an "App Password":

1. Go to your Google Account settings
2. Select "Security" from the left navigation
3. Under "How you sign in to Google," select "App passwords"
4. Select "Mail" and the device you're using
5. Generate the password and use it in the `EMAIL_PASS` field

### 3. Alternative Email Services

If you prefer other email services, here are the configurations:

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

#### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

#### Custom SMTP (Your hosting provider)
```env
EMAIL_HOST=mail.your-domain.com
EMAIL_PORT=587
# or PORT=465 for SSL
```

### 4. Server Configuration

Your server.js file has been updated with:
- Email sending functionality using Nodemailer
- Contact form endpoint at `/api/contact`
- Professional email templates for both company and user
- Form validation and error handling

### 5. Form Functionality

The contact form now includes:
- Form state management
- Real-time validation
- Loading states during submission
- Success/error messages
- Automatic form reset after successful submission
- Professional email formatting

### 6. Email Features

When a user submits the form:
1. **Company Email**: Sent to `support@medford.in` with all form details
2. **User Auto-reply**: Sent to the user confirming receipt
3. **Professional Templates**: Both emails use professional HTML templates
4. **Contact Information**: Includes all your business contact details

### 7. Testing the Setup

1. Update your `.env` file with real email credentials
2. Restart your server: `npm start`
3. Test the contact form on your website
4. Check that emails are received in both inboxes

### 8. Deployment Considerations

When deploying to production:
- Ensure environment variables are set on your hosting platform
- Use secure email credentials
- Consider using dedicated email services like SendGrid or Mailgun for higher volume
- Test email delivery in production environment

### 9. Security Best Practices

- Never commit your `.env` file to version control
- Use strong app passwords
- Consider implementing rate limiting for form submissions
- Add CAPTCHA if you experience spam issues

### 10. Troubleshooting

Common issues and solutions:
- **Authentication failed**: Check email credentials and app password
- **Connection timeout**: Verify SMTP settings and port numbers
- **Emails in spam**: Configure SPF, DKIM records for your domain
- **Form not submitting**: Check browser console for JavaScript errors

## Contact Form Features

The updated contact form includes:
- Required field validation (Name, Email, Message)
- Professional email templates
- Loading indicators
- Success/error messaging
- Form reset after submission
- Responsive design
- Accessibility features

## Email Template Features

- Professional branding with Medford Technologies colors
- Structured layout with contact details
- Auto-reply functionality for customer service
- Mobile-responsive email design
- Clear call-to-action elements

Your contact form is now ready to collect and forward inquiries directly to your work email!