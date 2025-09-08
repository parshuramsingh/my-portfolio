import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllBlogsPage = () => {
  const DEVTO_USERNAME = 'parshuram_singh';
  const fallbackImageUrl = 'https://placehold.co/800x420?text=No+Image+Available';

  const staticFallbackArticles = [
    {
      id: 1,
      title: "How I Built a Trade Finance App on Hyperledger Fabric",
      slug: "how-i-built-a-trade-finance-app-on-hyperledger-fabric",
      description: "Dive into a detailed walkthrough of building a full-stack trade finance application using Hyperledger Fabric...",
      url: "https://dev.to/parshuram_singh/how-i-built-a-trade-finance-app-on-hyperledger-fabric-a-complete-blockchain-project-walkthrough-amb",
      cover_image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh9lwecoq95penbjd0k5r.png",
      published_at: "2024-07-26T12:00:00Z",
      public_reactions_count: 5
    }
  ];

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/blogs.json', { cache: 'no-cache', signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const mapped = data.map(a => ({
          ...a,
          slug: a.slug || `article-${a.id}` // Ensure slug exists
        }));

        if (mapped.length === 0) {
          console.warn('Dev.to API returned no articles, using fallback');
          setArticles(staticFallbackArticles);
        } else {
          // Sort by published date descending
          const sorted = mapped.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
          setArticles(sorted);
        }
      } catch (err) {
        if (err.name === 'AbortError') return; // Ignore abort errors
        console.error('Error fetching articles:', err);
        setError('Failed to load articles.');
        setArticles(staticFallbackArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();

    return () => controller.abort();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          All Blogs <span className="text-indigo-600 dark:text-indigo-400">by {DEVTO_USERNAME}</span>
        </h2>

        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            Loading articles...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            {error}
          </div>
        )}

        {!isLoading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-50 object-cover rounded-t-xl"
                    onError={e => { e.target.onerror = null; e.target.src = fallbackImageUrl; }}
                  />
                ) : (
                  <div className="w-full h-50 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-xl">
                    <img src={fallbackImageUrl} alt="No Image" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {article.title || 'Untitled Article'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">
                    {article.description || 'No description available.'}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-auto pt-2">
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Unknown Date'}</span>
                    <span>{typeof article.public_reactions_count === 'number' ? article.public_reactions_count : 'N/A'} ❤️</span>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={article.slug ? `/blog/${article.slug}` : '/all-blogs'}
                      className="inline-block text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && articles.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-300 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            No articles found.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogsPage;
