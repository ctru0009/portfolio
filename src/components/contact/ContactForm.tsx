import { useState, useEffect } from "react";
import { sendWeb3Form, isWeb3FormsConfigured } from "../../utils/web3forms";
import Callout from "../mac/Callout";
import SquareButton from "../mac/SquareButton";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const labelClass = "mb-1 block text-[10px] uppercase tracking-[1px]";

const fieldClass = (invalid?: string) =>
  `w-full border bg-paper px-2.5 py-2 text-[11px] placeholder:text-muted ${
    invalid ? "border-dashed border-[#777]" : "border-ink"
  }`;

/**
 * The dark SquareButton recipe, inline: the submit control needs the native
 * `disabled` attribute (submitting / unconfigured) and SquareButton's
 * signature has no `disabled` prop.
 */
const submitClass =
  "border-2 border-ink bg-ink px-[10px] py-[5px] text-[11px] text-paper shadow-hard-dark hover:bg-paper hover:text-ink active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_#777] disabled:cursor-not-allowed disabled:bg-paper disabled:text-muted disabled:shadow-none disabled:hover:bg-paper disabled:hover:text-muted";

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isConfigured, setIsConfigured] = useState(true);

  // Check Web3Forms configuration on component mount
  useEffect(() => {
    const configured = isWeb3FormsConfigured();
    setIsConfigured(configured);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot field validation - check if bot filled it
    if (formData.website.trim() !== "") {
      // Silently fail for bots - don't give any feedback
      setSubmitError("Message sent successfully!"); // Fake success message
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!isConfigured) {
      setSubmitError("Form service is not configured. Please contact me directly.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Send form using Web3Forms
      const response = await sendWeb3Form(formData);

      console.log("Form submitted successfully:", response);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSubmitError("Failed to send message. Please try again later or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    setErrors({});
    setSubmitError("");
    setIsSubmitted(false);
  };

  const fieldErrors = Object.values(errors).filter(
    (message): message is string => Boolean(message),
  );
  const showWarning =
    fieldErrors.length > 0 || (submitError !== "" && !isSubmitted);

  return (
    <div className="border-2 border-ink bg-chrome p-3">
      <h3 className="text-[13px] font-normal">
        Have a role or technical problem worth discussing?
      </h3>
      <p className="mt-1 text-[11px] text-muted">Send a message.</p>

      {!isConfigured && (
        <div className="mt-3">
          <Callout tone="warning">
            <p className="text-[13px]">Form Service Not Configured</p>
            <p className="mt-1">
              The contact form is not connected to the form service yet. Please
              contact me directly via email or LinkedIn.
            </p>
          </Callout>
        </div>
      )}

      {isSubmitted ? (
        <div className="mt-3">
          <Callout tone="success">
            <p className="text-[13px]">Message Sent Successfully!</p>
            <p className="mt-1 mb-3">
              Thank you for reaching out! I'll get back to you as soon as
              possible.
            </p>
            <SquareButton onClick={resetForm}>
              Send Another Message
            </SquareButton>
          </Callout>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-3">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={fieldClass(errors.name)}
                aria-invalid={Boolean(errors.name)}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={fieldClass(errors.email)}
                aria-invalid={Boolean(errors.email)}
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Honeypot Field - Hidden from humans but visible to bots */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="website" className={labelClass}>
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className={fieldClass()}
              placeholder="Leave this field empty"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Subject Field */}
          <div className="mt-3.5">
            <label htmlFor="subject" className={labelClass}>
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={fieldClass(errors.subject)}
              aria-invalid={Boolean(errors.subject)}
              placeholder="Project inquiry, collaboration, etc."
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div className="mt-3.5">
            <label htmlFor="message" className={labelClass}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className={`${fieldClass(errors.message)} resize-none`}
              aria-invalid={Boolean(errors.message)}
              placeholder="Tell me about your project, question, or idea..."
              disabled={isSubmitting}
            />
            <div className="mt-1 flex justify-end text-[10px] text-muted">
              {formData.message.length}/1000
            </div>
          </div>

          {/* Validation / submission errors */}
          {showWarning && (
            <div className="mt-3.5">
              <Callout tone="warning">
                {fieldErrors.length > 0 && (
                  <ul className="list-disc pl-[18px]">
                    {fieldErrors.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                )}
                {submitError !== "" && !isSubmitted && (
                  <p className={fieldErrors.length > 0 ? "mt-2" : ""}>
                    {submitError}
                  </p>
                )}
              </Callout>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-3.5">
            <button
              type="submit"
              disabled={isSubmitting || !isConfigured}
              className={submitClass}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
