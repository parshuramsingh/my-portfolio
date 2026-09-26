import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt'; // Import Tilt
import { motion } from 'framer-motion'; // Import motion for animations
import { FaGithub, FaLink } from 'react-icons/fa'; // Only import icons used in this component
import { SiMongodb, SiTailwindcss, SiJavascript, SiHtml5, SiCss3, SiNextdotjs } from 'react-icons/si'; // Import specific Si icons
import { FaReact, FaNodeJs } from 'react-icons/fa'; // Import specific Fa icons that might be needed


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


const DESCRIPTION_MAX_LENGTH = 150; 

const ProjectCard = ({ title, initialDescription, techStack, githubLink, demoLink, imageSrc }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const needsTruncation = initialDescription.length > DESCRIPTION_MAX_LENGTH;
  const displayedDescription = showFullDescription 
    ? initialDescription 
    : (needsTruncation ? `${initialDescription.substring(0, DESCRIPTION_MAX_LENGTH)}...` : initialDescription);

  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.03} transitionSpeed={500}>
      <motion.div
        className="surface-card group flex h-full flex-col overflow-hidden p-4"
        whileHover={{ y: -5 }} 
      >
        <img
          src={imageSrc}
          alt={title}
          className="mb-4 h-48 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/6366F1/FFFFFF?text=Project"; }}
        />
        <h3 className="mb-2 px-2 font-serif text-2xl leading-snug text-ink dark:text-paper">{title}</h3>
        {Array.isArray(techStack) && techStack.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5 px-2">
            {techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:text-indigo-200">
                {tech}
              </span>
            ))}
          </div>
        )}
        <p className="mb-4 flex-grow px-2 text-sm leading-relaxed text-ink/70 dark:text-paper/70">
          {displayedDescription}
        </p>

        {needsTruncation && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-1 w-max px-2 text-left text-sm font-semibold text-indigo-600 hover:underline focus:outline-none dark:text-indigo-300" 
          >
            {showFullDescription ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Buttons at the very bottom, pushed by flex-grow on description */}
        <div className="mt-auto flex flex-wrap justify-center gap-3 px-2 pt-4">
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
          {demoLink && demoLink !== '#' && ( // link 
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
