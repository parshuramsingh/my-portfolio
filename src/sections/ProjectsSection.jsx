import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProjectCard from '../components/ProjectCard.jsx'; // Import ProjectCard
import projectsData from '../data/projectsData.js'; // Import centralized project data

const ProjectsSection = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Display only the first 3 projects on the main page as a preview
  const projectsToShowPreview = projectsData.slice(0, 3); 

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          My <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
        </h2>
        
        {/* Display the first 3 project cards here */}
        {projectsToShowPreview.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsToShowPreview.map((project) => (
              <ProjectCard
                key={project.id} // Use project id as key
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
            No projects to preview. Add projects to src/data/projectsData.js.
          </div>
        )}

        {/* View All Projects Button - Only show if there are more than 3 projects in total */}
        {projectsData.length > 3 && ( 
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/all-projects')} // Navigate to the new projects page
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
            >
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
