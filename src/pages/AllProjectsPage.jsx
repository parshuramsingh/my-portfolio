import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import projectsData from '../data/projectsData.js';

const AllProjectsPage = () => {
  const navigate = useNavigate();
  
  const projectsBeyondFirstThree = projectsData.slice(3); 

  return (
    <div className="mesh min-h-screen px-5 py-24 text-ink transition-colors duration-300 dark:text-paper md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="section-kicker">Archive</p>
          <h1 className="display-title">All Projects</h1>
        </div>

        {projectsBeyondFirstThree.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsBeyondFirstThree.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                initialDescription={project.initialDescription}
                techStack={project.techStack}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
                imageSrc={project.imageSrc}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No additional projects to display at this time.
          </div>
        )}

        {/* Back to Portfolio Button */}
        <div className="mt-16 text-center"><br></br><br></br>
          <button
            onClick={() => navigate('/portfolio')}
            className="inline-flex items-center rounded-full border border-black/15 px-8 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 dark:text-paper dark:hover:bg-white/10"
          >
            <svg className="w-4 h-4 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
