import React from 'react';

const NavLink = ({ sectionId, activeSection, onClick, children, isMobile = false }) => {
  const isActive = activeSection === sectionId;
  const desktopClasses = isActive
    ? 'bg-ink text-paper dark:bg-white dark:text-ink'
    : 'text-ink/70 hover:bg-black/5 hover:text-ink dark:text-paper/70 dark:hover:bg-white/10 dark:hover:text-white';
  const mobileClasses = `block w-full rounded-xl px-4 py-3 text-left text-base ${
    isActive
      ? 'bg-ink text-paper dark:bg-white dark:text-ink'
      : 'text-ink hover:bg-black/5 dark:text-paper dark:hover:bg-white/10'
  }`;

  return (
    <a
      href={`#${sectionId}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(sectionId);
      }}
      className={isMobile ? mobileClasses : `rounded-full px-3.5 py-2 text-sm font-medium transition ${desktopClasses}`}
    >
      {children}
    </a>
  );
};

export default NavLink;
