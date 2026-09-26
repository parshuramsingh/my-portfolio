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
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'sending', or null
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission in progress

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null); // Clear previous status
        setIsSubmitting(true); // Set submitting state to true

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
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
            setIsSubmitting(false); // Always set submitting state to false when done
            // Hide message after 5 seconds if it's not a persistent error
            if (submissionStatus !== 'error') { // Only hide success or if no error was explicitly set (e.g., initial null)
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 5000);
            }
        }
    };

    return (
        <motion.section
            id="contact"
            className="scroll-mt-28 px-5 py-16 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            <div className="surface-card relative z-10 mx-auto max-w-xl px-6 py-10 text-center md:px-10">
                <motion.p className="section-kicker" variants={childVariants}>Contact</motion.p>
                <motion.h2
                    className="display-title mb-6"
                    variants={childVariants}
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-ink/70 dark:text-paper/70"
                    variants={childVariants}
                >
                    I'm always open to discussing new projects, creative ideas, or opportunities to contribute to high-impact
                    solutions. Feel free to reach out using the form below or connect via my social channels!
                </motion.p>

                <motion.div
                    className="flex justify-center space-x-6 mb-10"
                    variants={childVariants}
                >
                    <a href="https://www.linkedin.com/in/parshuram-singh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-indigo-600 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white dark:border-white/15 dark:text-indigo-300"
                    >
                        <FaLinkedin className="h-5 w-5" />
                    </a>
                    <a href="https://github.com/parshuramsingh" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-indigo-600 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white dark:border-white/15 dark:text-indigo-300"
                    >
                        <FaGithub className="h-5 w-5" />
                    </a>
                    <a href="mailto:parshuram7714@gmail.com" aria-label="Email Me"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-indigo-600 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white dark:border-white/15 dark:text-indigo-300"
                    >
                        <FaEnvelope className="h-5 w-5" />
                    </a>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    action="https://formspree.io/f/mrblqoyg"
                    method="POST"
                    className="p-0 text-left space-y-6 md:space-y-8 mb-10"
                    variants={childVariants}
                >
                    <div>
                        <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 dark:text-paper/70">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition focus:border-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-paper"
                            aria-label="Your Name"
                            required
                            disabled={isSubmitting} /* Disable input fields while submitting */
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 dark:text-paper/70">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition focus:border-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-paper"
                            aria-label="Your Email"
                            required
                            disabled={isSubmitting} /* Disable input fields while submitting */
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 dark:text-paper/70">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            autoComplete="off"
                            className="w-full resize-y rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition focus:border-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-paper"
                            aria-label="Your Message"
                            required
                            disabled={isSubmitting} /* Disable input fields while submitting */
                        ></textarea>
                    </div>

                    {/* Submission Status Message */}
                    {isSubmitting && ( // Show "Sending..." when isSubmitting is true
                        <p className="text-indigo-600 dark:text-indigo-400 text-center text-sm font-medium">
                            Sending message...
                        </p>
                    )}
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
                        className="flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-base font-semibold text-paper transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 dark:bg-white dark:text-ink dark:hover:bg-indigo-200"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'} 
                    </motion.button>
                </motion.form>
            </div>
        </motion.section>
    );
};

export default memo(ContactSection);