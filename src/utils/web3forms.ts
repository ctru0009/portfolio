// Web3Forms configuration
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

/**
 * Send form data using Web3Forms API
 * @param formData - Form data to send
 * @returns Promise that resolves when form is submitted
 */
export const sendWeb3Form = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error('Web3Forms access key is missing. Please check your environment variables.');
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: "Portfolio Contact Form",
        // Add bot protection
        botcheck: "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    if (!data.success) {
      throw new Error(data.message || 'Form submission failed');
    }

    return data;
  } catch (error) {
    console.error('Web3Forms error:', error);
    throw error;
  }
};

/**
 * Check if Web3Forms is properly configured
 * @returns boolean indicating if configuration is complete
 */
export const isWeb3FormsConfigured = (): boolean => {
  return !!WEB3FORMS_ACCESS_KEY;
};