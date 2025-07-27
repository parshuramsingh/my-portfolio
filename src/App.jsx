import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Import routing hooks
import LandingPage from './LandingPage.jsx';
import NavLink from './components/NavLink.jsx';
import HomeSection from './sections/HomeSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import BlogSection from './sections/BlogSection.jsx';
import TestimonialsSection from './sections/TestimonialsSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import AllProjectsPage from './pages/AllProjectsPage.jsx';

// Import your logo
import logoPs from './assets/logo-ps.png'; // Adjust path if necessary

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Dark mode state, initialized from localStorage. Defaults to false (light) if no preference is saved.
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook to get current URL location

  // Effect to apply dark mode class to HTML element and save preference
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

  // Effect to update active section based on scroll position (only for portfolio view)
  useEffect(() => {
    // Only run scroll listener if we are on the portfolio path
    if (location.pathname === '/portfolio') {
      const handleScroll = () => {
        const sections = ['home', 'skills', 'projects', 'testimonials', 'blog', 'contact']; // Reordered for nav highlighting
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-800 dark:text-gray-100 antialiased transition-colors duration-300">
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage onEnterPortfolio={enterPortfolio} />} />

        {/* Route for the Main Portfolio Content */}
        <Route path="/portfolio" element={
          <>
            {/* Navigation Bar - Enhanced Styling */}
            <nav className="fixed top-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl border-b-2 border-gray-200 dark:border-gray-700 z-50 py-4 transition-colors duration-300">
              <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo only - Now clickable to refresh page and scroll to home */}
                <a
                  href="/" // Link to the root
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    refreshAndScrollToHome(); // Call the new function
                  }}
                  className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200" // Adjusted styling for logo only
                  aria-label="Go to Home and Refresh Page"
                >
                  <img src={logoPs} alt="Parshuram Singh Logo" className="w-8 h-8 rounded-full" /> {/* Increased logo size slightly */}
                </a>
                <div className="flex items-center space-x-4">
                  {/* Dark Mode Toggle Button */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
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
                    className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
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
                  <div className="hidden md:flex space-x-2"> {/* Reduced space-x for more items */}
                    <NavLink sectionId="home" activeSection={activeSection} onClick={scrollToSection}>
                      Home
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
                <div className="md:hidden mt-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 transition-colors duration-300">
                  <NavLink sectionId="home" activeSection={activeSection} onClick={scrollToSection} isMobile>
                    Home
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
              <SkillsSection />
              <ProjectsSection />
              <TestimonialsSection /> {/* Reordered */}
              <BlogSection /> {/* Reordered */}
              <ContactSection />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 text-center">
              <div className="container mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} Parshuram Singh. All rights reserved.</p>
                
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