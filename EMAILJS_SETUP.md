# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form on your portfolio website.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service

1. After logging in, click on **"Email Services"** in the sidebar
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Once connected, you'll see your **Service ID** - copy this value

## Step 3: Create Email Template

1. Click on **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Configure your template with these variables:

### Template Settings:
- **Template Name**: Portfolio Contact Form
- **Subject**: New message from {{from_name}} via Portfolio

### Email Content (HTML):
```html
<p>You have received a new message from your portfolio contact form.</p>

<h3>Contact Details:</h3>
<ul>
  <li><strong>Name:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Subject:</strong> {{subject}}</li>
</ul>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p style="font-size: 12px; color: #666;">
  This message was sent from your portfolio website contact form.
</p>
```

4. Click **"Save"**
5. Once saved, you'll see your **Template ID** - copy this value

## Step 4: Get Your Public Key

1. Click on **"Account"** in the sidebar
2. Go to the **"General"** tab
3. Copy your **Public Key**

## Step 5: Configure Your Project

1. Create a `.env` file in your project root (same level as `package.json`)
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Fill in your EmailJS credentials in the `.env` file:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
   ```

## Step 6: Test Your Configuration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your contact form and test it by sending a message
3. You should receive an email at the connected email address

## Important Notes

- **Free Plan Limit**: 200 emails per month (perfect for portfolio sites)
- **Security**: Your public key is safe to expose in frontend code
- **Template Variables**: The form sends `from_name`, `from_email`, `subject`, and `message` variables
- **Customization**: You can modify the email template design in EmailJS dashboard

## Troubleshooting

### Form shows "Email Service Not Configured"
- Check that your `.env` file exists and contains all three variables
- Restart your development server after creating `.env`
- Ensure all IDs are copied correctly (no extra spaces)

### Not receiving emails
- Check your spam/junk folder
- Verify the email service is connected properly in EmailJS
- Check that the template variables match exactly (`{{from_name}}`, `{{from_email}}`, etc.)

### Rate limit exceeded
- Free plan has 200 emails/month limit
- Check EmailJS dashboard for usage statistics

## Alternative Contact Methods

While EmailJS is being set up, visitors can still contact you through:
- Direct email link in the contact section
- LinkedIn profile link
- Phone number (if displayed)

The form will show a helpful warning when EmailJS is not configured, directing visitors to use alternative contact methods.