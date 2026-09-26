import React from 'react';

// Import specific icons from react-icons
import { FaReact, FaServer, FaTools, FaBrain } from 'react-icons/fa';
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
  'Blockchain Development': [
    'Hyperledger Fabric',
    'Smart Contracts (Chaincode)',
    'dApps',
    'Decentralized Systems',
    'Solidity (Basic)'
  ],
  'Backend Development': [
    'Golang',
    'Node.js',
    'Express.js',
    'REST APIs',
    'MongoDB',
    'MySQL'
  ],
  'CS Fundamentals': [
    'Data Structures',
    'Algorithms',
    'Object-Oriented Programming (OOPs)',
    'Operating Systems',
    'Computer Networks'
  ],
  'Tools & Platforms': [
    'Git',
    'GitHub',
    'Docker',
    'Postman',
    'Hyperledger Caliper',
    'VS Code'
  ],
  'Frontend Development': [
    'React.js',
    'JavaScript (ES6+)',
    'HTML5',
    'CSS3',
    'Tailwind CSS'
  ]
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


  return (
    <section id="skills" className="scroll-mt-28 px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="section-kicker">Capabilities</p>
          <h2 className="display-title">Skills Overview</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(skills).map(([category, skillList]) => (
            <article
              key={category}
              className="surface-card p-6 transition duration-300 hover:-translate-y-1"
            >
              <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold text-ink dark:text-paper">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-lg">
                  {categoryIcons[category]}
                </span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-200"
                  >
                    {skillIcons[skill] ? (
                      <span className="mr-1.5 inline-flex align-[-2px]">{skillIcons[skill]}</span>
                    ) : null}
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
