import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 
import LandingPage from './LandingPage.jsx';
import NavLink from './components/NavLink.jsx';
import HomeSection from './sections/HomeSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import BlogSection from './sections/BlogSection.jsx';
import TestimonialsSection from './sections/TestimonialsSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import AllProjectsPage from './pages/AllProjectsPage.jsx';


import { FaGithub, FaLinkedin } from 'react-icons/fa';
import logoPs from './assets/logo-ps.webp'; 

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const navigate = useNavigate(); 

  const location = useLocation(); 
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

 
  useEffect(() => {
    
    if (location.pathname === '/portfolio') {
      const handleScroll = () => {
        const sections = ['home', 'experience', 'skills', 'projects', 'testimonials', 'blog', 'contact']; 
        let currentActive = 'home';
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              currentActive = sectionId;
              break;
            }
          }
        }
        setActiveSection(currentActive);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]); // Re-run effect when path changes

  // Function to enter the main portfolio (now navigates using router)
  const enterPortfolio = () => {
    navigate('/portfolio'); // Navigate to the portfolio route
  };

  // Function to refresh the page and scroll to home section
  const refreshAndScrollToHome = () => {
    navigate('/'); // Navigate to the root path (landing page)
    // After a short delay to allow navigation to complete, scroll to home
    setTimeout(() => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay might be needed for router to update DOM
    setActiveSection('home'); // Ensure home is active in nav
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <div className="mesh min-h-screen font-sans text-ink antialiased transition-colors duration-300 dark:text-paper">
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage onEnterPortfolio={enterPortfolio} />} />

        {/* Route for the Main Portfolio Content */}
        <Route path="/portfolio" element={
          <>
            {/* Navigation Bar - Enhanced Styling */}
            <nav className="fixed top-0 left-0 z-50 w-full border-b border-black/5 bg-paper/75 py-3 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-night/75">
              <div className="container mx-auto flex items-center justify-between px-4">
            
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    refreshAndScrollToHome();
                  }}
                  className="flex cursor-pointer items-center gap-3 transition-opacity duration-200 hover:opacity-80"
                  aria-label="Go to Home and Refresh Page"
                >
                  <img src={logoPs} alt="Parshuram Singh Logo" className="h-9 w-9 rounded-full ring-2 ring-indigo-400/40" />
                  <span className="font-serif text-xl leading-none">Parshuram</span>
                </a>
                <div className="flex items-center space-x-4">
                  {/* Dark Mode Toggle Button */}
                  <button
                    onClick={toggleDarkMode}
                    className="rounded-full border border-black/10 p-2 text-ink transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/15 dark:text-paper dark:hover:bg-white/10"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      // Sun icon for dark mode
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 6.675l-.707-.707M6.707 6.707l-.707-.707m10.61 0l-.707.707M6.707 17.325l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    ) : (
                      // Moon icon for light mode
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    )}
                  </button>

                  {/* Mobile Menu Button */}
                  <button
                    className="rounded-md p-2 text-ink transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-paper dark:hover:bg-white/10 md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                  {/* Desktop Navigation Links */}
                  <div className="hidden items-center gap-1 rounded-full border border-black/5 bg-white/60 p-1 dark:border-white/10 dark:bg-white/5 md:flex">
                    <NavLink sectionId="home" activeSection={activeSection} onClick={scrollToSection}>
                      Home
                    </NavLink>
                    <NavLink sectionId="experience" activeSection={activeSection} onClick={scrollToSection}>
                      Work
                    </NavLink>
                    <NavLink sectionId="skills" activeSection={activeSection} onClick={scrollToSection}>
                      Skills
                    </NavLink>
                    <NavLink sectionId="projects" activeSection={activeSection} onClick={scrollToSection}>
                      Projects
                    </NavLink>
                    <NavLink sectionId="testimonials" activeSection={activeSection} onClick={scrollToSection}> {/* Reordered */}
                      Testimonials
                    </NavLink>
                    <NavLink sectionId="blog" activeSection={activeSection} onClick={scrollToSection}> {/* Reordered */}
                      Blog
                    </NavLink>
                    <NavLink sectionId="contact" activeSection={activeSection} onClick={scrollToSection}>
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* Mobile Menu Dropdown */}
              {isMenuOpen && (
                <div className="mx-4 mt-3 space-y-1 rounded-2xl border border-black/5 bg-white/90 p-2 shadow-lg dark:border-white/10 dark:bg-night/95 md:hidden">
                  <NavLink sectionId="home" activeSection={activeSection} onClick={scrollToSection} isMobile>
                    Home
                  </NavLink>
                  <NavLink sectionId="experience" activeSection={activeSection} onClick={scrollToSection} isMobile>
                    Work
                  </NavLink>
                  <NavLink sectionId="skills" activeSection={activeSection} onClick={scrollToSection} isMobile>
                    Skills
                  </NavLink>
                  <NavLink sectionId="projects" activeSection={activeSection} onClick={scrollToSection} isMobile>
                    Projects
                  </NavLink>
                  <NavLink sectionId="testimonials" activeSection={activeSection} onClick={scrollToSection} isMobile> {/* Reordered */}
                    Testimonials
                  </NavLink>
                  <NavLink sectionId="blog" activeSection={activeSection} onClick={scrollToSection} isMobile> {/* Reordered */}
                    Blog
                  </NavLink>
                  <NavLink sectionId="contact" activeSection={activeSection} onClick={scrollToSection} isMobile>
                    Contact
                  </NavLink>
                </div>
              )}
            </nav>

            {/* Main Content Area */}
            <main className="pt-20">
              <HomeSection scrollToSection={scrollToSection} />
              <ExperienceSection />
              <SkillsSection />
              <ProjectsSection />
              <TestimonialsSection /> {/* Reordered */}
              <BlogSection /> {/* Reordered */}
              <ContactSection />
            </main>

            {/* Footer */}
            <footer className="border-t border-black/5 px-5 py-10 dark:border-white/10">
              <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                <div>
                  <p className="font-serif text-2xl">Parshuram Singh</p>
                  <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">Blockchain Developer & Backend Engineer</p>
                </div>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/in/parshuram-singh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:hover:text-indigo-300">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/parshuramsingh" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:hover:text-indigo-300">
                    <FaGithub />
                  </a>
                </div>
                <p className="text-sm text-ink/50 dark:text-paper/50">&copy; {new Date().getFullYear()} Parshuram Singh. All rights reserved.</p>
              </div>
            </footer>
          </>
        } />
        
      <Route path="/all-projects" element={<AllProjectsPage />} />
      </Routes>
      
    </div>
  );
}

export default App;