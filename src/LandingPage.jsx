import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import developerAnimation from './assets/developer_animation.json';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Slide } from 'react-toastify';

const LandingPage = ({ onEnterPortfolio }) => {
  const quotes = useMemo(() => [
    { text: "Code is like humor: when you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Blockchain is the tech. Bitcoin is merely the first mainstream manifestation of its potential.", author: "Marc Kenigsberg" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Good software, like wine, takes time.", author: "Joel Spolsky" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  ], []);

  const quoteCount = quotes.length;
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => Math.floor(Math.random() * quoteCount));
  const [quoteFade, setQuoteFade] = useState('opacity-100');

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteFade('opacity-0');
      setTimeout(() => {
        setCurrentQuoteIndex(prev => {
          let next;
          do {
            next = Math.floor(Math.random() * quoteCount);
          } while (next === prev && quoteCount > 1);
          return next;
        });
        setQuoteFade('opacity-100');
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [quoteCount]);

  const resumeLink = "#"; // Replace with actual URL when available
// handle down

 const handleDownloadResume = (e) => {
  if (!resumeLink || resumeLink === "#") {
    e.preventDefault();
    const isDarkMode = document.documentElement.classList.contains('dark');
    const toastId = 'resume-toast';

    if (!toast.isActive(toastId)) {
      toast.info("Resume will be available shortly!", {
        toastId, // prevent duplicate
        position: "top-center",
        autoClose: 3000,
        theme: isDarkMode ? "dark" : "light",
      });
    }
  }
};


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-gray-800 p-4 text-center overflow-hidden text-base dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 dark:text-white transition-colors duration-500">
      
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
            <filter id="blurFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>
          <circle cx="25" cy="25" r="20" fill="url(#grad1)" filter="url(#blurFilter)" />
          <rect x="60" y="10" width="25" height="25" fill="url(#grad2)" transform="rotate(25 72.5 22.5)" filter="url(#blurFilter)" />
          <polygon points="50,70 70,90 30,90" fill="url(#grad1)" filter="url(#blurFilter)" />
          <ellipse cx="80" cy="50" rx="15" ry="10" fill="url(#grad2)" filter="url(#blurFilter)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-0">
        <div className="w-48 h-48 md:w-64 md:h-64 mb-6">
          <Lottie animationData={developerAnimation} loop autoplay />
        </div>

       <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-yellow-600 transition-opacity duration-1000 opacity-100 dark:text-yellow-300">
  Hi, I'm Parshuram Singh
</h1>


        <p className="text-lg md:text-xl mb-6 w-full max-w-2xl text-gray-700 dark:text-gray-200">
          Showcasing innovative solutions in Software Engineering, Blockchain Development, and Frontend Specialization.
        </p>

        {/* Quote Animation */}
        <div className="relative z-10 mt-6 mb-8 max-w-xl mx-auto p-6 bg-gray-100/80 text-gray-700 rounded-lg shadow-xl backdrop-blur-sm dark:bg-white/10 dark:text-white transition-colors duration-500">
          <p className={`text-lg italic mb-3 transition-opacity duration-1000 ${quoteFade}`}>
            "{quotes[currentQuoteIndex].text}"
          </p>
          <p className={`text-md font-semibold text-yellow-600 transition-opacity duration-1000 ${quoteFade} dark:text-yellow-300`}>
            - {quotes[currentQuoteIndex].author}
          </p>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['React', 'Blockchain', 'Java', 'Node.js', 'MySQL'].map(skill => (
            <span
              key={skill}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm md:text-base font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-110 dark:bg-indigo-700 dark:hover:bg-yellow-500 dark:hover:text-gray-900"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          <button
            onClick={onEnterPortfolio}
            className="px-10 py-4 bg-yellow-400 text-blue-900 font-bold text-lg rounded-full shadow-xl hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-75 hover:shadow-yellow-500/50"
          >
            Enter Portfolio
          </button>
          <a
            href={resumeLink}
            onClick={handleDownloadResume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border-2 border-indigo-600 text-indigo-600 font-bold text-lg rounded-full shadow-xl hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 dark:border-white dark:text-white dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/75"
          >
            Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-10">
          <a
            href="https://www.linkedin.com/in/parshuram-singh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 transform hover:scale-110 dark:text-white dark:hover:text-yellow-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/parshuramsingh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 transform hover:scale-110 dark:text-white dark:hover:text-yellow-300"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

LandingPage.propTypes = {
  onEnterPortfolio: PropTypes.func.isRequired,
};

export default LandingPage;
