import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import YOUR CUSTOM CSS for this component
import './SkillsSection.css';


// Import Swiper modules, including Autoplay for auto-sliding
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'; // Added Autoplay

// Import specific icons from react-icons
import { FaReact, FaCode, FaServer, FaTools, FaBrain } from 'react-icons/fa';
import {
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiSolidity,
  SiHiveBlockchain
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';


const SkillsSection = () => {
  const skills = {
    'Frontend Development': ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS',],
    'Blockchain Development': ['Hyperledger Fabric', 'Smart Contracts (Chaincode)', 'Solidity (Basic)', 'dApps', 'Etherium(Basic)', 'Decentralized Systems'],
    'Backend Development': ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL', 'Java', 'C'],
    'Tools & Platforms': ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman', 'Hyperledger Caliper'],
    'CS Fundamentals': ['Data Structures', 'Algorithms', 'Object-Oriented Programming (OOPs)', 'Operating Systems ','Computer Netowrks']
  };

  const categoryIcons = {
    // Changed all category icons to use portfolio's main accent colors
    'Frontend Development': <FaReact className="text-indigo-600 dark:text-indigo-400" />,
    'Blockchain Development': <SiHiveBlockchain className="text-indigo-600 dark:text-indigo-400" />,
    'Backend Development': <FaServer className="text-indigo-600 dark:text-indigo-400" />,
    'Tools & Platforms': <FaTools className="text-indigo-600 dark:text-indigo-400" />,
    'CS Fundamentals': <FaBrain className="text-indigo-600 dark:text-indigo-400" />,
  };

  const skillIcons = {
    'React.js': <FaReact />,
    'JavaScript (ES6+)': <SiJavascript />,
    'HTML5': <SiHtml5 />,
    'CSS3': <SiCss3 />,
    'Node.js': <SiNodedotjs />,
    'Express.js': <SiExpress />,
    'MongoDB': <SiMongodb />,
    'MySQL': <SiMysql />,
    'Solidity (Basic)': <SiSolidity />,
    'Git': <SiGit />,
    'GitHub': <SiGithub />,
    'Docker': <SiDocker />,
    'VS Code': <VscVscode />,
    'Postman': <SiPostman />,
  };


  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  return (
    <section id="skills" 
   
      className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-500 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 text-center relative z-10">
          Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Overview</span>
          
        </h2>

        <div className="relative z-10">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            // Add Autoplay configuration
            autoplay={{
                delay: 3000, // 3 seconds delay between slides
                disableOnInteraction: false, // Keep autoplaying even after user interaction
            }}
            // --- Mobile-first slidesPerView ---
            slidesPerView={1} // Default for mobile (1 card at a time)
            spaceBetween={0} // No space on mobile for single slide view
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} 
            className="mySwiper"
            breakpoints={{
              640: { // For small tablets/larger phones
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: { // MD breakpoint
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: { // LG breakpoint
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {Object.entries(skills).map(([category, skillList], index) => (
              <SwiperSlide key={category} className="pb-16 pt-8">
                <div
                  className={`relative group bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700
                             transform transition-all duration-300
                             ${hoveredCardIndex === index ? 'scale-105 shadow-2xl border-indigo-400 dark:border-indigo-600 z-20' : 'scale-100 z-10'}
                             /* --- APPLY BLUR/OPACITY ONLY ON MD SCREENS AND UP --- */
                             md:${hoveredCardIndex !== null && hoveredCardIndex !== index ? 'filter backdrop-blur-sm opacity-50' : ''}
                             `}
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  {/* Adjusted hover background gradient for better visibility on white base */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5 relative z-10 flex items-center gap-3">
                    {categoryIcons[category]}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3 relative z-10">
                    {skillList.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1.5 rounded-full shadow-md
                                   transform transition-all duration-200 hover:scale-105 hover:bg-indigo-200 hover:text-indigo-900
                                   dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800 dark:hover:text-indigo-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
