# Utilities Documentation

*This file documents utility functions and helper services within the portfolio application.*

## EmailJS Integration Architecture

The portfolio uses EmailJS for contact form functionality, enabling real email sending without requiring a backend server.

### Implementation Details

**EmailJS Utility (`src/utils/emailjs.ts`)**:
- **Initialization**: Automatic EmailJS service initialization on component mount
- **Configuration Management**: Environment-based configuration with validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Type Safety**: Full TypeScript integration with proper interfaces

**Key Functions**:
- `initializeEmailJS()` - Initialize EmailJS service with public key
- `sendEmail()` - Send form data via EmailJS with proper validation
- `isEmailJSConfigured()` - Check if all required environment variables are set

### Environment Configuration

**Required Environment Variables**:
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key for authentication
- `VITE_EMAILJS_SERVICE_ID` - Email service identifier
- `VITE_EMAILJS_TEMPLATE_ID` - Email template identifier

**Data Flow**:
1. User submits contact form → `ContactForm.tsx`
2. Form validation → Form validation logic
3. EmailJS service call → `sendEmail()` function
4. Email delivery → User's configured email service

### Integration Points

**Contact Form Component** (`src/components/contact/ContactForm.tsx`):
- Imports and uses EmailJS utility functions
- Handles form validation and submission state
- Displays configuration warnings when EmailJS is not set up
- Provides user feedback for successful/failed submissions

**Error Handling Patterns**:
- Configuration validation before sending
- Network error handling with retry suggestions
- User-friendly error messages with alternative contact methods

### Security Considerations

- Public key exposure is safe and required for EmailJS client-side usage
- Environment variables are properly gitignored to protect sensitive credentials
- Form validation prevents malicious content submission
- Rate limiting handled by EmailJS service (200 emails/month free tier)

---

*This file was created as part of the 3-tier documentation system to document the EmailJS integration utility.*