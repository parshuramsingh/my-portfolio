import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 

const BlogSection = () => {
  const DEVTO_USERNAME = 'parshuram_singh';
  const fallbackImageUrl = 'https://placehold.co/800x420?text=No+Image+Available';

  const staticFallbackArticles = [
    {
      id: 1,
      title: "How I Built a Trade Finance App on Hyperledger Fabric: A Complete Blockchain Project Walkthrough",
      description: "Detailed walkthrough of building a trade finance blockchain app using Hyperledger Fabric, smart contracts, APIs, and performance benchmarking.",
      url: "https://dev.to/parshuram_singh/how-i-built-a-trade-finance-app-on-hyperledger-fabric-a-complete-blockchain-project-walkthrough-amb",
      cover_image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh9lwecoq95penbjd0k5r.png",
      published_at: "2024-07-26T12:00:00Z",
      public_reactions_count: 5
    }
  ];

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/blogs.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Fetch failed');

        const data = await response.json();
        setArticles(data.length ? data : staticFallbackArticles);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setArticles(staticFallbackArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="blog" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">

        {/* ✅ SEO Optimized Heading */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          Blockchain & Backend <span className="text-indigo-600 dark:text-indigo-400">Blog Posts</span>
        </h2>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" className="opacity-75" />
            </svg>
            Loading articles...
          </div>
        )}

        {/* Articles */}
        {!isLoading && articles.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <img
                  src={article.cover_image || fallbackImageUrl}
                  alt={`Blog: ${article.title}`}
                  className="w-full h-52 object-cover"
                  onError={(e) => (e.target.src = fallbackImageUrl)}
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                    {article.description?.slice(0, 120) || 'No description available.'}...
                  </p>

                  <div className="flex justify-between text-sm mt-3 text-gray-500">
                    <span>
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString()
                        : 'Date'}
                    </span>
                    <span>❤️ {article.public_reactions_count || 0}</span>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-indigo-600 font-medium hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={`https://dev.to/${DEVTO_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            View All Articles
          </a>
        </div>

        {/* ✅ Hidden SEO Content */}
        <p style={{ display: "none" }}>
          Parshuram Singh blog on blockchain development, Hyperledger Fabric projects,
          backend engineering, Golang APIs, distributed systems, and full stack development tutorials.
        </p>

      </div>
    </section>
  );
};

export default BlogSection;