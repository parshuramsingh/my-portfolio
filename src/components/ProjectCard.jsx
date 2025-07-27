import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt'; // Import Tilt
import { motion } from 'framer-motion'; // Import motion for animations
import { FaGithub, FaLink } from 'react-icons/fa'; // Only import icons used in this component
import { SiMongodb, SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiNextdotjs } from 'react-icons/si'; // Import specific Si icons
import { FaReact, FaNodeJs } from 'react-icons/fa'; // Import specific Fa icons that might be needed

// Map for tech icons (ensure only used icons are imported above)
const iconMap = {
  React: <FaReact className="text-blue-500" />,
  'React.js': <FaReact className="text-blue-500" />,
  Node: <FaNodeJs className="text-green-600" />,
  'Node.js': <FaNodeJs className="text-green-600" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  Tailwind: <SiTailwindcss className="text-sky-400" />,
  'Tailwind CSS': <SiTailwindcss className="text-sky-400" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  HTML: <SiHtml5 className="text-orange-500" />,
  CSS: <SiCss3 className="text-blue-600" />,
  Next: <SiNextdotjs className="text-black dark:text-white" />,
  // Add other specific icons here if needed, or use a generic one
  
  'Fabric CLI': <FaLink className="text-purple-500" />, // Using FaLink as a generic
  'Hyperledger Caliper': <FaLink className="text-purple-400" />, // Using FaLink as a generic
  'REST APIs': <FaLink className="text-red-500" />, // Generic for APIs
  'MySQL': <FaLink className="text-blue-700" />, // Generic for MySQL
  'Java': <FaLink className="text-red-700" />, // Generic for Java
  'C': <FaLink className="text-gray-500" />, // Generic for C
  'Docker': <FaLink className="text-blue-400" />, // Generic for Docker
  'Git': <FaLink className="text-orange-600" />, // Generic for Git
  'GitHub': <FaGithub className="text-gray-700 dark:text-white" />, // Specific GitHub icon
  'Responsive Design': <FaLink className="text-pink-500" />, // Generic icon
  'Smart Contracts (Chaincode)': <FaLink className="text-blue-800" />,
  'Solidity (Basic)': <FaLink className="text-gray-400" />,
  'dApps': <FaLink className="text-green-700" />,
  'Web3.js (Basic)': <FaLink className="text-yellow-700" />,
  'Express.js': <FaLink className="text-gray-600" />, // Generic for Express
  'VS Code': <FaLink className="text-blue-500" />, // Generic for VS Code
  'Postman': <FaLink className="text-orange-500" />, // Generic for Postman
};


const DESCRIPTION_MAX_LENGTH = 150; // Max characters before truncating

const ProjectCard = ({ title, initialDescription, techStack, githubLink, demoLink, imageSrc }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Determine if description needs truncation
  const needsTruncation = initialDescription.length > DESCRIPTION_MAX_LENGTH;
  const displayedDescription = showFullDescription 
    ? initialDescription 
    : (needsTruncation ? `${initialDescription.substring(0, DESCRIPTION_MAX_LENGTH)}...` : initialDescription);

  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.03} transitionSpeed={500}>
      <motion.div
        className="
          bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-700
          rounded-2xl p-6 shadow-xl border border-transparent group overflow-hidden
          flex flex-col h-full transition-all duration-300 hover:shadow-2xl
          hover:border-indigo-400 dark:hover:border-indigo-500
        "
        whileHover={{ y: -5 }} // Subtle lift on hover
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" // Image styling, scale on group hover
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/6366F1/FFFFFF?text=Project"; }}
        />
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow"> {/* flex-grow to push content down */}
          {displayedDescription}
        </p>

        {needsTruncation && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline mt-2 text-left w-max focus:outline-none" // mt-2 for spacing from description
          >
            {showFullDescription ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Buttons at the very bottom, pushed by flex-grow on description */}
        <div className="flex flex-wrap gap-3 mt-auto justify-center pt-4"> {/* mt-auto to push to bottom, pt-4 for padding */}
          {githubLink && githubLink !== '#' && ( // Only show if link is valid
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                         dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-500 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </motion.a>
          )}
          {demoLink && demoLink !== '#' && ( // Only show if link is valid
            <motion.a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLink className="w-4 h-4" />
              Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
};

export default ProjectCard;
