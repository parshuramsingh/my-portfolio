import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 

const BlogSection = () => {
  const DEVTO_USERNAME = 'parshuramsingh';
  const fallbackImageUrl = 'https://placehold.co/800x420?text=No+Image+Available';

  const staticFallbackArticles = [
    {
      id: 1,
      title: "How I Built a Trade Finance App on Hyperledger Fabric: A Complete Blockchain Project Walkthrough",
      description: "Detailed walkthrough of building a trade finance blockchain app using Hyperledger Fabric, smart contracts, APIs, and performance benchmarking.",
      url: "https://dev.to/parshuramsingh/how-i-built-a-trade-finance-app-on-hyperledger-fabric-a-complete-blockchain-project-walkthrough-amb",
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
    <section id="blog" className="scroll-mt-28 px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <p className="section-kicker">Writing</p>
          <h2 className="display-title">Blockchain & Backend Blog</h2>
        </div>

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
                className="surface-card flex flex-col overflow-hidden"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <img
                  src={article.cover_image || fallbackImageUrl}
                  alt={`Blog: ${article.title}`}
                  className="h-52 w-full object-cover"
                  onError={(e) => (e.target.src = fallbackImageUrl)}
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="mb-2 font-serif text-2xl leading-snug text-ink dark:text-paper">
                    {article.title}
                  </h3>

                  <p className="flex-grow text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                    {article.description?.slice(0, 120) || 'No description available.'}...
                  </p>

                  <div className="mt-4 flex justify-between text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
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
                    className="mt-5 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-300"
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
            className="inline-flex rounded-full bg-ink px-8 py-3 font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-white dark:text-ink dark:hover:bg-indigo-200"
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