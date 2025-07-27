import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import developerAnimation from './assets/developer_animation.json';

const LandingPage = ({ onEnterPortfolio }) => {
  const quotes = [
    { text: "Code is like humor: when you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Blockchain is the tech. Bitcoin is merely the first mainstream manifestation of its potential.", author: "Marc Kenigsberg" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Good software, like wine, takes time.", author: "Joel Spolsky" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [quoteFade, setQuoteFade] = useState('opacity-0');

  // Fade in on mount for the first quote.
  useEffect(() => {
    const showInitial = setTimeout(() => setQuoteFade('opacity-100'), 200);
    return () => clearTimeout(showInitial);
  }, []);

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      setQuoteFade('opacity-0');
      timeout = setTimeout(() => {
        setCurrentQuoteIndex(prev => {
          let next;
          do {
            next = Math.floor(Math.random() * quotes.length);
          } while (next === prev && quotes.length > 1);
          return next;
        });
        setQuoteFade('opacity-100');
      }, 1000); // matches transition duration
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [quotes.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-gray-800 p-4 text-center overflow-hidden text-base dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 dark:text-white transition-colors duration-500">
      {/* Decorative SVG background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="15" fill="url(#grad1)" />
          <rect x="70" y="70" width="15" height="15" fill="url(#grad2)" transform="rotate(45 77.5 77.5)" />
          <polygon points="50,10 60,30 40,30" fill="url(#grad1)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-0">
        {/* Lottie Animation */}
        <div
          className="w-48 h-48 md:w-64 md:h-64 mb-6"
          role="img"
          aria-label="Animated developer"
        >
          <Lottie animationData={developerAnimation} loop autoplay />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-shadow-lg text-gray-900 dark:text-white">
          Hi I'm <span className="text-yellow-400 dark:text-yellow-400">
            Parshuram Singh
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-6 w-full max-w-2xl min-w-0 text-gray-700 dark:text-gray-200">
          Showcasing innovative solutions in Software Engineering, Blockchain Development, and Frontend Specialization.
        </p>

        {/* Quote */}
        <div className="relative z-10 mt-6 mb-8 max-w-xl mx-auto p-6 bg-gray-100/80 text-gray-700 rounded-lg shadow-xl backdrop-blur-sm dark:bg-white/10 dark:text-white transition-colors duration-500">
          <p className={`text-lg italic mb-3 transition-opacity duration-1000 ${quoteFade}`}>
            "{quotes[currentQuoteIndex].text}"
          </p>
          <p className={`text-md font-semibold text-yellow-600 transition-opacity duration-1000 ${quoteFade} dark:text-yellow-300`}>
            - {quotes[currentQuoteIndex].author}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['React', 'Blockchain', 'JavaScript', 'Node.js', 'Java', 'MySQL'].map((skill) => (
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
            href="https://drive.google.com/file/d/1LLzBI4KNxpgsuHs69qx2n5EQn-NsgcIo/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border-2 border-indigo-600 text-indigo-600 font-bold text-lg rounded-full shadow-xl hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-75 dark:border-white dark:text-white dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-white/75"
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
            {/* LinkedIn SVG */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.16 20.45H3.64V9.18h3.52v11.27zM5.39 7.82a2.42 2.42 0 110-4.84 2.42 2.42 0 010 4.84zm15.06 12.63h-3.52V14.8c0-1.3-.47-2.18-1.63-2.18-1.25 0-1.99.85-1.99 2.18v5.65h-3.52V9.18h3.52v1.54c.5-.95 1.75-2.18 3.16-2.18 2.29 0 4.02 1.5 4.02 4.74v7.17z"></path>
            </svg>
          </a>
          <a
            href="https://github.com/parshuramsingh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 transform hover:scale-110 dark:text-white dark:hover:text-yellow-300"
            aria-label="GitHub Profile"
          >
            {/* GitHub SVG */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.374-12 12 0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 3.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.626-5.374-12-12-12z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* Styles for slide-in animation */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in { animation: slideIn 0.5s ease-out forwards; }
          .animate-slide-in.delay-100 { animation-delay: 0.1s; }
          .animate-slide-in.delay-200 { animation-delay: 0.2s; }
          .animate-slide-in.delay-300 { animation-delay: 0.3s; }
          .animate-slide-in.delay-400 { animation-delay: 0.4s; }
          .animate-slide-in.delay-500 { animation-delay: 0.5s; }
          @media (prefers-reduced-motion: reduce) {
            .animate-slide-in { animation: none; }
          }
        `}
      </style>
    </div>
  );
};

LandingPage.propTypes = {
  onEnterPortfolio: PropTypes.func.isRequired,
};

export default LandingPage;
