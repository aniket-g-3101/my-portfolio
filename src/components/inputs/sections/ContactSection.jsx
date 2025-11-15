import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  XCircle,
  Code2,
  Copy,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      value: "aniket.g.dev@gmail.com",
      href: "mailto:aniket.g.dev@gmail.com",
      copyable: true,
    },
    { icon: Phone, value: "+91 7822XXXXXX", href: "tel:+917822050904" },
    {
      icon: MapPin,
      value: "Solapur, India",
      href: "https://www.google.com/maps/place/Solapur,+Maharashtra/",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      url: "https://www.github.com/aniket-g-3101",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aniketgavali",
      color: "hover:text-blue-600",
    },
    {
      icon: Code2,
      url: "https://leetcode.com/u/aniket-g-3101",
      color: "hover:text-orange-500",
    },
  ];

  // Validation functions
  const validateName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return "Name is required";
    }
    if (trimmedName.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (trimmedName.length > 50) {
      return "Name must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      return "Name can only contain letters, spaces, hyphens and apostrophes";
    }
    return "";
  };

  const validateEmail = (email) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return "Email is required";
    }
    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address";
    }
    if (trimmedEmail.length > 254) {
      return "Email is too long";
    }
    // Check for common typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const domain = trimmedEmail.split('@')[1]?.toLowerCase();
    const typos = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
    };
    if (typos[domain]) {
      return `Did you mean ${trimmedEmail.split('@')[0]}@${typos[domain]}?`;
    }
    return "";
  };

  const validateMessage = (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return "Message is required";
    }
    if (trimmedMessage.length < 5) {
      return "Message must be at least 5 characters";
    }
    if (trimmedMessage.length > 1000) {
      return "Message must be less than 1000 characters";
    }
    // Check for suspicious patterns (basic spam detection)
    const spamPatterns = [
      /\b(viagra|cialis|lottery|winner|claim.*prize)\b/i,
      /http[s]?:\/\/(?!.*(?:github|linkedin|portfolio))/gi, // URLs not whitelisted
    ];
    for (const pattern of spamPatterns) {
      if (pattern.test(trimmedMessage)) {
        return "Message contains suspicious content";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      let error = "";
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "message":
          error = validateMessage(value);
          break;
        default:
          break;
      }
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched({ ...touched, [name]: true });
    
    // Validate on blur
    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aniket.g.dev@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    const newErrors = {
      name: nameError,
      email: emailError,
      message: messageError,
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (nameError || emailError || messageError) {
      setStatus({ 
        type: "error", 
        message: "Please fix the errors before submitting." 
      });
      setIsSubmitting(false);
      return;
    }

    // Additional security checks
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };

    // Rate limiting check (basic client-side)
    const lastSubmitTime = localStorage.getItem('lastContactSubmit');
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime);
      if (timeDiff < 60000) { // 1 minute
        setStatus({
          type: "error",
          message: "Please wait a minute before sending another message.",
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const result = await emailjs.send(
        "service_ga4b2wb",
        "template_pfo59z3",
        {
          from_name: trimmedData.name,
          from_email: trimmedData.email,
          message: trimmedData.message,
          time: new Date().toLocaleString(),
          to_name: "Aniket Gavali",
        },
        "1lpiSwcZmp-fi2-c4"
      );

      if (result.text === "OK") {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        localStorage.setItem('lastContactSubmit', Date.now().toString());
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please email me directly at aniket.g.dev@gmail.com",
      });
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 font-['Poppins',sans-serif] transition-colors duration-500 overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-16 right-16 w-96 h-96 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`absolute bottom-16 left-16 w-80 h-80 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-purple-500" : "bg-pink-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
          >
            <Send
              className={isDarkMode ? "text-blue-400" : "text-blue-600"}
              size={20}
            />
            <span
              className={`text-xs sm:text-sm uppercase tracking-widest font-semibold ${
                isDarkMode ? "text-gray-400" : "text-blue-600"
              }`}
            >
              Get In Touch
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Connect
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Open to work opportunities and internships. Let's build something
            great together!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1.2fr] gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border shadow-xl overflow-hidden backdrop-blur-xl transition-all ${
                isDarkMode
                  ? "bg-[#0f1629]/80 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Heading */}
              <h3
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 relative z-10 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Contact Me
              </h3>

              <div className="space-y-3 sm:space-y-4 relative z-10">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className={`block mb-1 sm:mb-1.5 text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    maxLength={50}
                    autoComplete="name"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.name && touched.name
                        ? isDarkMode
                          ? "border-red-500/50 focus:ring-red-500/50 bg-[#1b2333]/80 text-white"
                          : "border-red-500/50 focus:ring-red-500/50 bg-gray-50 text-gray-900"
                        : isDarkMode
                        ? "bg-[#1b2333]/80 border-gray-700 text-white focus:ring-purple-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-500"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block mb-1 sm:mb-1.5 text-xs sm:text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    maxLength={254}
                    autoComplete="email"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.email && touched.email
                        ? isDarkMode
                          ? "border-red-500/50 focus:ring-red-500/50 bg-[#1b2333]/80 text-white"
                          : "border-red-500/50 focus:ring-red-500/50 bg-gray-50 text-gray-900"
                        : isDarkMode
                        ? "bg-[#1b2333]/80 border-gray-700 text-white focus:ring-purple-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-500"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex justify-between items-center mb-1 sm:mb-1.5">
                    <label
                      htmlFor="message"
                      className={`text-xs sm:text-sm font-medium ${
                        isDarkMode ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs ${
                        formData.message.length > 1000
                          ? "text-red-500"
                          : isDarkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="4"
                    placeholder="Tell me about your project or opportunity..."
                    maxLength={1000}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                      errors.message && touched.message
                        ? isDarkMode
                          ? "border-red-500/50 focus:ring-red-500/50 bg-[#1b2333]/80 text-white placeholder:text-gray-400"
                          : "border-red-500/50 focus:ring-red-500/50 bg-gray-50 text-gray-900 placeholder:text-gray-500"
                        : isDarkMode
                        ? "bg-[#1b2333]/80 border-gray-700 text-gray-200 placeholder:text-gray-400 focus:ring-purple-500"
                        : "bg-gray-50 border-gray-300 text-gray-700 placeholder:text-gray-500 focus:ring-purple-500"
                    }`}
                  />
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`relative w-full py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-white text-sm tracking-wide transition-all overflow-hidden ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    isDarkMode
                      ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)]"
                      : "bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300 hover:shadow-[0_0_20px_-5px_rgba(192,132,252,0.5)]"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-2.5 sm:p-3 mt-2 sm:mt-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium ${
                      status.type === "success"
                        ? isDarkMode
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-green-50 text-green-700 border border-green-100"
                        : isDarkMode
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    ) : (
                      <XCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Cards */}
            <div
              className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/70 border border-gray-700"
                  : "bg-white border border-gray-200 shadow-xl"
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${
                        isDarkMode
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <info.icon size={18} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className={`text-sm sm:text-base md:text-lg font-medium flex-1 transition-colors break-all ${
                          isDarkMode
                            ? "text-gray-300 hover:text-blue-400"
                            : "text-gray-800 hover:text-blue-600"
                        }`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span
                        className={`text-sm sm:text-base md:text-lg font-medium flex-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {info.value}
                      </span>
                    )}
                    {info.copyable && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyEmail}
                        className={`p-1.5 sm:p-2 rounded-lg ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-400"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                        aria-label="Copy email address"
                      >
                        {copiedEmail ? (
                          <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                        ) : (
                          <Copy size={14} className="sm:w-4 sm:h-4" />
                        )}
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div
              className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl ${
                isDarkMode
                  ? "bg-gray-800/70 border border-gray-700"
                  : "bg-white border border-gray-200 shadow-xl"
              }`}
            >
              <p
                className={`text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Connect on Social
              </p>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all ${
                      isDarkMode
                        ? "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } ${social.color}`}
                    aria-label={`Visit ${social.url}`}
                  >
                    <social.icon size={22} className="sm:w-[26px] sm:h-[26px]" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}