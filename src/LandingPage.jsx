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

  const resumeLink = "#";

  const handleDownloadResume = (e) => {
    if (!resumeLink || resumeLink === "#") {
      e.preventDefault();
      const isDarkMode = document.documentElement.classList.contains('dark');
      const toastId = 'resume-toast';

      if (!toast.isActive(toastId)) {
        toast.info("Resume will be available shortly!", {
          toastId,
          position: "top-center",
          autoClose: 3000,
          theme: isDarkMode ? "dark" : "light",
        });
      }
    }
  };

  return (
    <div className="mesh relative flex min-h-screen items-center overflow-hidden px-5 py-16 text-ink dark:text-paper">
      <a href="/portfolio" className="sr-only">
        Parshuram Singh Blockchain Developer Portfolio
      </a>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="section-kicker">Blockchain · Backend · Distributed Systems</p>
          <h1 className="font-serif text-5xl leading-[0.95] text-ink dark:text-white sm:text-6xl md:text-7xl">
            Parshuram Singh
          </h1>
          <h2 className="mt-5 text-lg font-medium text-ink/80 dark:text-paper/80 md:text-xl">
            Blockchain Developer & Backend Engineer
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 lg:mx-0 md:text-lg">
            Specializing in Hyperledger Fabric, Golang, and backend systems. Building scalable blockchain solutions like TradeChain.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {['Hyperledger Fabric', 'Blockchain', 'Golang', 'Node.js', 'Distributed Systems'].map(skill => (
              <span
                key={skill}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-ink/80 dark:border-white/10 dark:bg-white/5 dark:text-paper/80"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={onEnterPortfolio}
              className="rounded-full bg-ink px-8 py-3.5 text-base font-semibold text-paper shadow-lg shadow-indigo-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-white dark:text-ink dark:hover:bg-indigo-200"
            >
              Enter Portfolio
            </button>
            <a
              href={resumeLink}
              onClick={handleDownloadResume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black/15 px-8 py-3.5 text-base font-semibold text-ink transition hover:bg-white/70 dark:border-white/20 dark:text-paper dark:hover:bg-white/10"
            >
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            <a
              href="https://www.linkedin.com/in/parshuram-singh/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:hover:text-indigo-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/parshuramsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:hover:text-indigo-300"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>

          <blockquote className={`mx-auto mt-10 max-w-lg border-l-2 border-indigo-400/70 pl-4 text-left transition-opacity duration-1000 lg:mx-0 ${quoteFade}`}>
            <p className="text-sm italic leading-relaxed text-ink/70 dark:text-paper/70">
              “{quotes[currentQuoteIndex].text}”
            </p>
            <footer className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              {quotes[currentQuoteIndex].author}
            </footer>
          </blockquote>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-64 sm:w-80 md:w-96">
            <div className="absolute inset-6 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20" />
            <div className="surface-card relative p-4">
              <Lottie animationData={developerAnimation} loop autoplay />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer transition={Slide} />
    </div>
  );
};

LandingPage.propTypes = {
  onEnterPortfolio: PropTypes.func.isRequired,
};

export default LandingPage;
