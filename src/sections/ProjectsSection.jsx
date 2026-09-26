import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProjectCard from '../components/ProjectCard.jsx'; // Import ProjectCard
import projectsData from '../data/projectsData.js'; // Import centralized project data

const ProjectsSection = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Display only the first 3 projects on the main page as a preview
  const projectsToShowPreview = projectsData.slice(0, 5); 

  return (
    <section id="projects" className="scroll-mt-28 px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="section-kicker">Selected work</p>
          <h2 className="display-title">My Projects</h2>
        </div>
        
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
        {projectsData.length > 5 && ( 
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/all-projects')} // Navigate to the new projects page
              className="inline-flex items-center rounded-full bg-ink px-8 py-3 font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-white dark:text-ink dark:hover:bg-indigo-200"
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
