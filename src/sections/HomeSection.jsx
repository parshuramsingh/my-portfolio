import React from 'react';
import { motion } from 'framer-motion';
import adminImage from '../assets/admin.jpg';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const paragraphs = [
  `I'm a passionate developer focused on building high-performance web apps and enterprise-grade decentralized solutions. With expertise in React.js, Tailwind CSS, and Hyperledger Fabric, I blend design precision with technical depth to deliver seamless user experiences and robust blockchain systems.`,
  `During my frontend internship at Suven Consultants, I worked on real-world projects involving UI development, API integration, and performance optimization. On the blockchain side, I’ve built smart contracts and dApps on Hyperledger Fabric, particularly for complex use cases like trade finance, ensuring transparency and scalability.`,
  `I’m also skilled in Node.js, Express, MongoDB, and Docker, with a strong foundation in Java, C, DSA, and OOPs. My goal: to bridge frontend elegance with blockchain resilience in every project I build.`,
];

const HomeSection = ({ scrollToSection }) => (
  <motion.section
    id="home"
    className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-black transition-colors duration-500 overflow-hidden"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[120vw] bg-indigo-400 opacity-10 blur-3xl rounded-full pointer-events-none z-0" />

    <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
      {/* Profile Image */}
      <motion.div
        className="relative mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-indigo-400 shadow-xl group hover:shadow-indigo-500 transition-shadow duration-300"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <img
          src={adminImage}
          alt="Parshuram Singh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </motion.div>

      {/* Name Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight drop-shadow-md"
        variants={childVariants}
      >
        Hi, I'm <span className="text-indigo-700 dark:text-indigo-400">Parshuram Singh</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8"
        variants={childVariants}
      >
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Software Engineer · Hyperledger Fabric Dev · React Frontend Specialist
        </span>
      </motion.p>

      {/* Bio Paragraphs */}
      <div className="flex flex-col gap-4 mt-8">
        {paragraphs.map((text, i) => (
          <motion.p
            key={i}
            // Increased text color to text-gray-800 in light mode for better contrast.
            // Increased text color to dark:text-gray-200 in dark mode for better contrast.
            className="text-md md:text-lg text-gray-800 dark:text-gray-200 backdrop-blur-sm bg-white/30 dark:bg-white/10 p-4 rounded-xl border border-white/30 dark:border-white/10 shadow-inner max-w-3xl mx-auto text-justify leading-relaxed"
            variants={childVariants}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Buttons */}
      <motion.div className="mt-12 flex flex-wrap justify-center gap-6" variants={childVariants}>
        <motion.button
          onClick={() => scrollToSection('projects')}
          className="px-8 py-3 text-lg font-bold rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-indigo-400/70 transition duration-300 hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>

        <motion.button
          onClick={() => scrollToSection('contact')}

          className="px-8 py-3 text-lg font-bold rounded-full border-2 border-indigo-600 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 shadow-md hover:shadow-indigo-300 transition duration-300 hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Hire Me
        </motion.button>
      </motion.div>
    </div>
  </motion.section>
);

export default HomeSection;
