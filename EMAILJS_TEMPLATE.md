# EmailJS Template Setup Guide

This guide provides the exact template configuration for your portfolio contact form.

## Template Variables Your Form Sends

Your contact form sends these variables to EmailJS:
- `{{from_name}}` - Sender's name (e.g., "John Doe")
- `{{from_email}}` - Sender's email address (e.g., "john@example.com")
- `{{subject}}` - Message subject (e.g., "Project Inquiry")
- `{{message}}` - The actual message content
- `{{to_name}}` - Your name ("Portfolio Owner" - you can customize this)

## Step-by-Step Template Creation

### 1. Go to EmailJS Dashboard
- Log into [emailjs.com](https://www.emailjs.com/)
- Click **"Email Templates"** in the sidebar
- Click **"Create New Template"**

### 2. Template Settings

**Template Name:** `Portfolio Contact Form`

**Subject:** `New message from {{from_name}} via Portfolio Website`

**Reply To:** `{{from_email}}`

### 3. HTML Content Template

Copy and paste this HTML template exactly:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Message</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #e9ecef;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 24px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }
        .info-item {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .info-label {
            font-weight: bold;
            color: #495057;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #2c3e50;
            font-size: 16px;
            word-break: break-word;
        }
        .message-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
            margin-bottom: 25px;
        }
        .message-label {
            font-weight: bold;
            color: #495057;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }
        .message-content {
            color: #2c3e50;
            font-size: 16px;
            white-space: pre-wrap;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 12px;
        }
        .cta-button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            body {
                padding: 10px;
            }
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 New Message from Your Portfolio!</h1>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">From</div>
                <div class="info-value">{{from_name}}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">{{from_email}}</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
                <div class="info-label">Subject</div>
                <div class="info-value">{{subject}}</div>
            </div>
        </div>

        <div class="message-section">
            <div class="message-label">Message</div>
            <div class="message-content">{{message}}</div>
        </div>

        <div style="text-align: center;">
            <a href="mailto:{{from_email}}" class="cta-button">
                📧 Reply to {{from_name}}
            </a>
        </div>

        <div class="footer">
            <p>This message was sent from your portfolio website contact form.</p>
            <p>Sent on: {{date:YYYY-MM-DD HH:mm:ss}} (UTC)</p>
        </div>
    </div>
</body>
</html>
```

### 4. Alternative Plain Text Template (Simpler)

If you prefer a simpler email template, use this instead:

```html
<h2>New Contact Form Submission</h2>

<p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
<p><strong>Subject:</strong> {{subject}}</p>

<hr>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>

<p><small>This message was sent from your portfolio contact form on {{date:YYYY-MM-DD}}.</small></p>

<p><a href="mailto:{{from_email}}">Click here to reply</a></p>
```

## Important Configuration Notes

### Template Variables Must Match Exactly:
- ✅ `{{from_name}}` - Matches your code: `from_name: formData.name`
- ✅ `{{from_email}}` - Matches your code: `from_email: formData.email`
- ✅ `{{subject}}` - Matches your code: `subject: formData.subject`
- ✅ `{{message}}` - Matches your code: `message: formData.message`
- ✅ `{{to_name}}` - Set to "Portfolio Owner" in your code

### Reply-To Settings:
- Set **"Reply To"** field to `{{from_email}}`
- This allows you to directly reply to emails
- Make sure this is configured in the template settings

### Personalization:
- Change "Portfolio Owner" to your actual name in the emailjs.ts file if desired
- Update the "to_name" variable in the template to match

## Testing Your Template

1. Save the template
2. Note your **Template ID**
3. Add it to your `.env` file: `VITE_EMAILJS_TEMPLATE_ID=your_template_id_here`
4. Test by sending a message through your portfolio form

The template is designed to be professional, mobile-friendly, and includes a direct reply button for convenience.