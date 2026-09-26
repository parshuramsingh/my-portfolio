import React from 'react';
import { motion } from 'framer-motion';
import adminImage from '../assets/admin.jpg';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.12,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const paragraphs = [
  `I'm a Blockchain Developer and Backend Engineer specializing in Hyperledger Fabric, Golang, and distributed systems. I build enterprise-grade decentralized applications with a focus on scalability, transparency, and real-world impact.`,

  `I have built TradeChain, a blockchain-based trade finance solution using Hyperledger Fabric, implementing smart contracts, multi-party workflows, and secure transaction lifecycle management.`,

  `I also have experience with Node.js, Express, Docker, and system design, along with a strong foundation in Java, DSA, and OOPs. My goal is to design robust backend systems and blockchain architectures that solve real-world problems.`,
];

const HomeSection = ({ scrollToSection }) => (
  <motion.section
    id="home"
    className="scroll-mt-28 px-5 py-16 md:py-24"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <div className="surface-card mx-auto grid max-w-6xl items-center gap-10 overflow-hidden p-6 md:grid-cols-[240px_1fr] md:p-10 lg:grid-cols-[280px_1fr]">
      <motion.div
        className="mx-auto w-44 md:w-full"
        variants={childVariants}
      >
        <div className="rounded-full bg-gradient-to-br from-indigo-500 via-indigo-300 to-amber-200 p-[3px] shadow-xl">
          <img
            src={adminImage}
            alt="Parshuram Singh"
            className="aspect-square w-full rounded-full object-cover"
          />
        </div>
      </motion.div>

      <div className="text-center md:text-left">
        <motion.p className="section-kicker" variants={childVariants}>
          Blockchain Developer
        </motion.p>
        <motion.h1
          className="font-serif text-4xl leading-none text-ink dark:text-white md:text-6xl"
          variants={childVariants}
        >
          Parshuram Singh
        </motion.h1>
        <motion.p
          className="mt-4 text-lg font-medium text-indigo-700 dark:text-indigo-300"
          variants={childVariants}
        >
          Blockchain Developer · Backend Engineer · Hyperledger Fabric
        </motion.p>
        <div className="mt-6 space-y-4">
          {paragraphs.map((text) => (
            <motion.p
              key={text.slice(0, 24)}
              className="text-base leading-relaxed text-ink/75 dark:text-paper/75"
              variants={childVariants}
            >
              {text}
            </motion.p>
          ))}
        </div>
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
          variants={childVariants}
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-white dark:text-ink dark:hover:bg-indigo-200"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="rounded-full border border-black/15 px-7 py-3 text-sm font-semibold text-ink transition hover:bg-black/5 dark:border-white/20 dark:text-paper dark:hover:bg-white/10"
          >
            Hire Me
          </button>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default HomeSection;
