import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleBlogPage = () => {
  const { slug } = useParams(); // Get the slug from URL
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static fallback articles in case fetch fails
  const staticArticles = [
    {
      slug: 'article-1',
      title: 'How I Built a Trade Finance App on Hyperledger Fabric',
      description: 'A complete blockchain project walkthrough with smart contracts and API integration.',
      cover_image: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh9lwecoq95penbjd0k5r.png',
      published_at: '2024-07-26T12:00:00Z',
    },
    // Add more static articles here if needed
  ];

  useEffect(() => {
    const controller = new AbortController();
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/blogs.json', { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        const foundArticle = data.find((a) => a.slug === slug);
        setArticle(foundArticle || staticArticles.find((a) => a.slug === slug));
      } catch (err) {
        console.error('Error fetching articles:', err);
        setArticle(staticArticles.find((a) => a.slug === slug));
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();

    return () => controller.abort();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        Article not found.
        <div className="mt-4">
          <Link to="/all-blogs" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Unknown Date'}
      </p>
      {article.cover_image && (
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x420?text=No+Image'; }}
        />
      )}
      <p className="text-gray-700 dark:text-gray-300">{article.description || 'No content available.'}</p>

      <div className="mt-8">
        <Link to="/all-blogs" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to All Blogs
        </Link>
      </div>
    </div>
  );
};

export default SingleBlogPage;
