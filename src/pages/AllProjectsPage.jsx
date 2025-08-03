import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import projectsData from '../data/projectsData.js';

const AllProjectsPage = () => {
  const navigate = useNavigate();
  
  const projectsBeyondFirstThree = projectsData.slice(3); 

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          All <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
        </h1>

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
            className="inline-flex items-center px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700 dark:hover:text-indigo-300 dark:focus:ring-indigo-400"
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
