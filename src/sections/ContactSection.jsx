import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PropTypes from 'prop-types'; // Keep PropTypes for prop validation

// Framer Motion variants for section entry
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

// Framer Motion variants for staggered children elements
const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

// Framer Motion variants for subtle button interactions (no shadow for minimalist look)
const buttonVariants = {
    hover: {
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300 },
    },
    tap: { scale: 0.95 },
};

const ContactSection = () => {
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null

    const handleSubmit = async (e) => { // Made async to use await
        e.preventDefault(); // Prevent default browser form submission
        setSubmissionStatus(null); // Clear previous status

        const form = e.target;
        const data = new FormData(form); // Get form data

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json' // Crucial for Formspree to return JSON
                }
            });

            if (response.ok) {
                setSubmissionStatus('success');
                form.reset(); // Clear the form
            } else {
                const responseData = await response.json();
                console.error("Formspree error response:", responseData);
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionStatus('error');
        } finally {
            // --- NEW: Hide message after 5 seconds ---
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000); 
        }
    };

    return (
        <motion.section
            id="contact"
            // Reverted background to original (non-glassmorphism) solid white/black
            className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.3 }} // Only animate once when 30% in view
            variants={sectionVariants}
        >
            {/* Content Container - Adjusted max-w for a narrower content column like the image */}
            <div className="container mx-auto px-4 text-center max-w-xl relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 leading-tight"
                    variants={childVariants}
                >
                    Get In <span className="text-indigo-600 dark:text-indigo-400">Touch</span>
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto"
                    variants={childVariants}
                >
                    I'm always open to discussing new projects, creative ideas, or opportunities to contribute to high-impact
                    solutions. Feel free to reach out using the form below or connect via my social channels!
                </motion.p>

                {/* Social Media Icons (Centered, with specific LinkedIn, GitHub, and Email icons) */}
                <motion.div
                    className="flex justify-center space-x-6 mb-10" // Space-x for horizontal icons, mb for margin
                    variants={childVariants}
                >
                    {/* LinkedIn Icon */}
                    <a href="https://www.linkedin.com/in/parshuram-singh-your-profile-id/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-indigo-400 dark:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <FaLinkedin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </a>
                    {/* GitHub Icon */}
                    <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-indigo-400 dark:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <FaGithub className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </a>
                    {/* Email Icon */}
                    <a href="mailto:parshuram7714@gmail.com" aria-label="Email Me"
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-indigo-400 text-indigo-600 dark:border-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors duration-300"
                    >
                        <FaEnvelope className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </a>
                </motion.div>


                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    action="https://formspree.io/f/mrblqoyg" // <-- Your Formspree endpoint (make sure this is correct!)
                    method="POST"
                    // Reverted styling to a cleaner, simpler, minimalist look
                    className="p-0 text-left space-y-6 md:space-y-8 mb-10" // Removed background, shadow, border, roundedness
                    variants={childVariants}
                >
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-gray-800 dark:text-gray-200 text-sm font-bold uppercase mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name" /* Corrected: autocomplete -> autoComplete */
                            // Input styling: transparent background, bottom border only, no roundedness, no horizontal padding
                            className="w-full pb-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-indigo-600 transition-all duration-200 text-base" 
                            aria-label="Your Name"
                            required
                        />
                    </div>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 text-sm font-bold uppercase mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email" /* Corrected: autocomplete -> autoComplete */
                            // Input styling: transparent background, bottom border only
                            className="w-full pb-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-indigo-600 transition-all duration-200 text-base"
                            aria-label="Your Email"
                            required
                        />
                    </div>
                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-gray-800 dark:text-gray-200 text-sm font-bold uppercase mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4" 
                            autoComplete="off" /* Corrected: autocomplete -> autoComplete */
                            // Textarea styling: transparent background, bottom border only
                            className="w-full pb-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-indigo-600 transition-all duration-200 resize-y text-base"
                            aria-label="Your Message"
                            required
                        ></textarea>
                    </div>

                    {/* Submission Status Message */}
                    {submissionStatus === 'success' && (
                        <p className="text-green-600 dark:text-green-400 text-center text-sm font-medium"> 
                            Thank you for your message! I'll get back to you soon.
                        </p>
                    )}
                    {submissionStatus === 'error' && (
                        <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium"> 
                            Oops! There was an error sending your message. Please try again.
                        </p>
                    )}

                    <motion.button
                        type="submit"
                        // Submit button styling: no roundedness, no shadow
                        className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-none transition duration-300 transform hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </motion.section>
    );
};

// Prop validation (removed as scrollToSection is no longer a prop)
// ContactSection.propTypes = {
//     scrollToSection: PropTypes.func,
// };

export default memo(ContactSection);
