import React, { memo } from 'react';
import { motion } from 'framer-motion';
// Only FaGithub, FaLinkedin, FaEnvelope are needed now
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
    // Function to handle form submission (Formspree handles direct submission via action)
    const handleSubmit = (e) => {
        // Prevent default form submission if you want to add custom logic
        // For Formspree, letting the default HTML submission happen is often fine.
        // e.preventDefault(); 
        
        // After successful submission, Formspree handles the redirect/thank you.
        // You might add a custom UI message here if you remove Formspree's default redirect.
        // Example: alert('Message sent successfully!');
        e.target.reset(); // Clear the form after submission
    };

    return (
        <motion.section
            id="contact"
            // Changed background to solid white/black and removed glassmorphism overlay
            className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.3 }} // Only animate once when 30% in view
            variants={sectionVariants}
        >
            {/* Content Container - Adjusted max-w for a narrower content column like the image */}
            <div className="container mx-auto px-4 text-center max-w-xl relative z-10">
                <motion.h2
                    // Adjusted text color and removed text-shadow
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 leading-tight"
                    variants={childVariants}
                >
                    Get In <span className="text-indigo-600 dark:text-indigo-400">Touch</span> {/* Corrected accent color to indigo */}
                </motion.h2>
                <motion.p
                    // Adjusted text color and width
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
                    <a href="https://www.linkedin.com/in/parshuram-singh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-indigo-400 dark:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors duration-300"
                    >
                        {/* Applied text color directly to the icon component */}
                        <FaLinkedin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </a>
                    {/* GitHub Icon */}
                    <a href="https://github.com/parshuramsingh" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-indigo-400 dark:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors duration-300"
                    >
                        {/* Applied text color directly to the icon component */}
                        <FaGithub className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </a>
                    
                    {/* Email Icon - Corrected href for mailto link */}
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
                    className="p-0 text-left space-y-4 md:space-y-6"
                    variants={childVariants}
                >
                    <div>
                        <label htmlFor="name" className="block text-gray-800 dark:text-gray-200 text-sm font-bold uppercase mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            // Improved border visibility and dark mode contrast for inputs
                            className="w-full pb-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-indigo-600 transition-all duration-200 text-base"
                            aria-label="Your Name"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 text-sm font-bold uppercase mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            // Improved border visibility and dark mode contrast for inputs
                            className="w-full pb-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-indigo-600 transition-all duration-200 text-base"
                            aria-label="Your Email"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="message" className="block text-gray-800 dark:text-gray-200 text-sm font-bold uppercase mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="3" // Smaller rows for a more compact look
                            // Improved border visibility and dark mode contrast for inputs
                            className="w-full pb-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-indigo-600 transition-all duration-200 resize-y text-base"
                            aria-label="Your Message"
                            required
                        ></textarea>
                    </div>

                    <motion.button
                        type="submit"
                        // Submit button colors updated to indigo/white
                        className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-none shadow-none transition duration-300 transform hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Submit
                    </motion.button>
                </motion.form>
            </div>
        </motion.section>
    );
};

ContactSection.propTypes = {
    // If scrollToSection is passed, define it here:
    // scrollToSection: PropTypes.func,
};

export default memo(ContactSection);
