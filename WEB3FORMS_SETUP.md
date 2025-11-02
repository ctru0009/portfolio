# Web3Forms Setup Guide

This guide explains how to set up Web3Forms for the contact form in your portfolio website.

## What is Web3Forms?

Web3Forms is a free, privacy-first contact form service that allows you to receive form submissions directly to your email without any backend server. It's perfect for static sites like this portfolio built with React and Vite.

## Setup Instructions

### 1. Create a Web3Forms Account

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Sign up for a free account using your email
3. Verify your email address

### 2. Create a New Form

1. After logging in, click "Create New Form"
2. Give your form a name (e.g., "Portfolio Contact Form")
3. Configure your form settings:
   - **Email**: Enter the email where you want to receive submissions
   - **Subject**: Set a default subject line (e.g., "New message from portfolio")
   - **Reply To**: Set this to use the submitter's email
   - **Redirect URL**: Optional - set to your portfolio URL
4. Save your form

### 3. Get Your Access Key

1. After creating the form, you'll see your **Access Key** on the form dashboard
2. Copy this access key - you'll need it for the next step

### 4. Configure Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Web3Forms access key:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
```

### 5. For Local Development

Make sure your `.env` file is in the project root and contains your access key. The development server will automatically pick up the environment variables.

### 6. For Production (GitHub Pages)

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables > Actions**
3. Click **New repository secret**
4. Create a secret named `WEB3FORMS_ACCESS_KEY`
5. Paste your Web3Forms access key as the value
6. The GitHub Actions workflow will automatically use this secret during deployment

## Features

The Web3Forms implementation includes:

- ✅ **Spam Protection**: Built-in bot protection with honeypot field
- ✅ **Form Validation**: Client-side validation for all fields
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Success States**: Clear feedback when form is submitted
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation

## Form Fields

The contact form includes the following fields:

- **Name** (required): Sender's full name
- **Email** (required): Sender's email address
- **Subject** (required): Message subject
- **Message** (required): Message content (10-1000 characters)
- **Website** (hidden): Honeypot field for spam protection

## Testing Your Form

1. Start the development server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form with test data
4. Submit the form
5. Check your email for the submission

## Troubleshooting

### Form Not Submitting

1. Check that your access key is correctly set in `.env`
2. Verify the access key in your GitHub repository secrets
3. Check the browser console for error messages
4. Ensure you're connected to the internet

### Not Receiving Emails

1. Check your spam/junk folder
2. Verify the email address in your Web3Forms settings
3. Make sure your Web3Forms account is verified
4. Check Web3Forms dashboard for submission logs

### Build Errors

1. Ensure all TypeScript types are correct
2. Check that the environment variable is properly named (`VITE_WEB3FORMS_ACCESS_KEY`)
3. Run `npm run build` to check for any compilation errors

## Security Considerations

- ✅ Access keys are stored securely in environment variables
- ✅ Honeypot field prevents basic bot submissions
- ✅ No sensitive data is exposed in the frontend code
- ✅ Form submissions are sent over HTTPS

## Support

If you encounter any issues:

1. Check the [Web3Forms Documentation](https://web3forms.com/docs)
2. Review the browser console for error messages
3. Ensure all configuration steps are completed correctly
4. Test with a different email address if needed