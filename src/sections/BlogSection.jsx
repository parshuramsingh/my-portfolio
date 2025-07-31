import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations

const BlogSection = () => {
  const DEVTO_USERNAME = 'parshuram_singh';
  const fallbackImageUrl = 'https://placehold.co/800x420?text=No+Image+Available';

  const staticFallbackArticles = [
    {
      id: 1,
      title: "How I Built a Trade Finance App on Hyperledger Fabric: A Complete Blockchain Project Walkthrough",
      description: "Dive into a detailed walkthrough of building a full-stack trade finance application using Hyperledger Fabric. Learn about smart contracts, network setup, API integration, and performance benchmarking for enterprise-grade decentralized solutions.",
      url: "https://dev.to/parshuram_singh/how-i-built-a-trade-finance-app-on-hyperledger-fabric-a-complete-blockchain-project-walkthrough-amb",
      cover_image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh9lwecoq95penbjd0k5r.png",
      published_at: "2024-07-26T12:00:00Z",
      public_reactions_count: 5
    }
  ];

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Framer motion variants for individual blog cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };
  
// Fetch aricles from blog.json

  useEffect(() => {
    let didCancel = false;
    const controller = new AbortController();

const fetchArticles = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('/blogs.json', { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setArticles(data.length ? data : staticFallbackArticles);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    setArticles(staticFallbackArticles); // use fallback if fetch fails
  } finally {
    setIsLoading(false);
  }
};

    fetchArticles();

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, []);

  return (
    <section id="blog" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          Latest Blog <span className="text-indigo-600 dark:text-indigo-400">Posts</span>
        </h2>

        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading articles...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            {error}
          </div>
        )}

        {!isLoading && articles.length > 0 && (
          <motion.div // Use motion.div for parent to trigger staggered children
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible" // Animate children when this div is in view
            viewport={{ once: true, amount: 0.3 }} // Only animate once, when 30% of div is visible
            variants={{
              visible: { transition: { staggerChildren: 0.1 } } // Stagger children animations
            }}
          >
            {articles.map((article) => (
              <motion.div // Changed from motion.a to motion.div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-shadow duration-300 overflow-hidden group flex flex-col" // Removed hover scale from here
                variants={cardVariants} // Apply card entry animation variants
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 3px rgba(99, 102, 241, 0.4)' }} // Lift and add a subtle indigo glow shadow on hover
                whileTap={{ scale: 0.98 }} // Slight press effect on tap
              >
                {/* Fallback for missing cover_image or if it's null */}
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title || 'Article Image'}
                    className="w-full h-50 object-cover rounded-t-xl transition-transform duration-300 flex-shrink-0" // Removed group-hover:scale-105
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback also fails
                      e.target.src = fallbackImageUrl; // Fallback to a generic placeholder image
                    }}
                  />
                ) : (
                  // Placeholder if no cover image
                  <div className="w-full h-50 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-xl text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">
                    <img
                      src={fallbackImageUrl} // Use the defined fallback image
                      alt="No Image Available"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {article.title || 'Untitled Article'}
                  </h3>
                  {/* Truncate description if too long, and provide fallback */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">
                    {(article.description && article.description.length > 120)
                      ? `${article.description.substring(0, 120)}...`
                      : article.description || 'No description available.'}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-auto pt-2">
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Unknown Date'}</span>
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {typeof article.public_reactions_count === 'number' ? article.public_reactions_count : 'N/A'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <a
                      href={article.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                      aria-label={`Read more: ${article.title}`}
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* This block is only shown if articles.length is 0, not loading, and no specific error from fetch itself */}
        {articles.length === 0 && !isLoading && !error && (
            <div className="text-center text-gray-600 dark:text-gray-300 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                No articles found from Dev.to API. Displaying static content.
            </div>
        )}

        {/* View All Articles on Dev.to button (always present) */}
        <div className="mt-10 text-center">
          <a
            href={`https://dev.to/${DEVTO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
            aria-label="View all articles on Dev.to"
          >
            View All Articles on Dev.to
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
