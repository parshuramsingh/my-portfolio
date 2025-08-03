import React from 'react';

const NavLink = ({ sectionId, activeSection, onClick, children, isMobile = false }) => {
  const baseClasses = `font-medium transition duration-300 ease-in-out px-3 py-2 rounded-md`;
 
  const activeClasses = `text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400`;
  const inactiveClasses = `text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400`;
  const mobileClasses = `block text-left text-lg py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700`;

  return (
    <a
      href={`#${sectionId}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(sectionId);
      }}
      className={`${baseClasses} ${activeSection === sectionId ? activeClasses : inactiveClasses} ${isMobile ? mobileClasses : ''}`}
    >
      {children}
    </a>
  );
};

export default NavLink;
