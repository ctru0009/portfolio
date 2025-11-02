import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaUser, FaComment, FaPaperPlane, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { initializeEmailJS, sendEmail, isEmailJSConfigured } from "../../utils/emailjs";

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

  // Initialize EmailJS on component mount
  useEffect(() => {
    const configured = isEmailJSConfigured();
    setIsConfigured(configured);

    if (configured) {
      initializeEmailJS();
    }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
      setSubmitError("Email service is not configured. Please contact me directly.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Send email using EmailJS
      const response = await sendEmail(formData);

      console.log("Email sent successfully:", response);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white mb-2">Send Me a Message</h3>
          <p className="text-gray-400">
            I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Configuration Warning */}
        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-600/20 border border-yellow-600/50 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-yellow-300 font-medium mb-1">
                  Email Service Not Configured
                </p>
                <p className="text-yellow-200 text-sm">
                  The contact form is not connected to an email service yet. Please contact me directly via email or LinkedIn.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Honeypot Field - Hidden from humans but visible to bots */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400"
                  placeholder="Leave this field empty"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.subject ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder="Project inquiry, collaboration, etc."
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.subject}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FaComment className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="Tell me about your project, question, or idea..."
                    disabled={isSubmitting}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {formData.message.length}/1000
                  </div>
                </div>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-300 text-sm"
                >
                  {submitError}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isConfigured}
                  whileHover={{ scale: (isSubmitting || !isConfigured) ? 1 : 1.02 }}
                  whileTap={{ scale: (isSubmitting || !isConfigured) ? 1 : 0.98 }}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    (isSubmitting || !isConfigured)
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-2xl text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-400 mb-8">
                Thank you for reaching out! I'll get back to you as soon as possible.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <FaEnvelope />
                Send Another Message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactForm;