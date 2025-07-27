import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllBlogsPage = () => {
  const DEVTO_USERNAME = 'parshuram_singh'; // Your Dev.to username
  const navigate = useNavigate();

  const staticFallbackArticles = [
    {
      id: 1, 
      title: "How I Built a Trade Finance App on Hyperledger Fabric: A Complete Blockchain Project Walkthrough",
      description: "Dive into a detailed walkthrough of building a full-stack trade finance application using Hyperledger Fabric. Learn about smart contracts, network setup, API integration, and performance benchmarking for enterprise-grade decentralized solutions.",
      url: "https://dev.to/parshuram_singh/how-i-built-a-trade-finance-app-on-hyperledger-fabric-a-complete-blockchain-project-walkthrough-amb",
      cover_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--M_vjY80R--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/691w2j22c3q45w7g1p78.png", 
      published_at: "2024-07-26T12:00:00Z", 
      public_reactions_count: 5 
    }
    // Add more static articles here manually if needed for full display fallback
  ];

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let didCancel = false; 
    const controller = new AbortController();
    const signal = controller.signal;
    let fetchTimeoutId; 

    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null); 

      fetchTimeoutId = setTimeout(() => {
        if (!didCancel) {
          setIsLoading(false);
          console.warn("Forced loading state off after 15 seconds for AllBlogsPage.");
          if (articles.length === 0) {
            setError("Request timed out. Showing static content.");
            setArticles(staticFallbackArticles);
          }
        }
      }, 15000); 

      try {
        // Fetch all articles, not just 3, for the dedicated page
        const response = await fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=inf`, { signal, cache: 'no-cache' }); 
        
        clearTimeout(fetchTimeoutId); 
        
        if (!response.ok) {
          if (didCancel) return; 
          console.error(`Dev.to API error on AllBlogsPage: Status ${response.status} - ${response.statusText}`);
          throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        
        if (didCancel) return; 

        console.log("Raw Dev.to API response data for AllBlogsPage:", data);

        const sortedArticles = data.sort((a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp));
        
        console.log("Sorted articles for AllBlogsPage:", sortedArticles);

        if (sortedArticles.length > 0) {
          setArticles(sortedArticles);
          console.log("AllBlogsPage: Dev.to API returned articles, displaying dynamic content.");
        } else {
          setArticles(staticFallbackArticles); 
          console.warn("AllBlogsPage: Dev.to API returned no articles, displaying static fallback.");
        }
      } catch (err) {
        if (didCancel) return; 
        clearTimeout(fetchTimeoutId); 
        if (err.name === 'AbortError') {
          console.error("AllBlogsPage: Fetch aborted due to timeout or user action. Displaying static fallback.");
          setError("Request timed out. Showing static content.");
        } else {
          console.error("AllBlogsPage: Error fetching Dev.to articles. Displaying static fallback:", err);
          setError(`Failed to load articles: ${err.message}. Showing static content.`);
        }
        setArticles(staticFallbackArticles); 
      } finally {
        if (!didCancel) { 
          setIsLoading(false);
        }
      }
    };

    if (DEVTO_USERNAME && DEVTO_USERNAME !== 'YOUR_DEVTO_USERNAME') {
      fetchArticles();
    } else {
      setError("Please set your Dev.to username in AllBlogsPage component, or static fallback will be used.");
      setArticles(staticFallbackArticles); 
      setIsLoading(false);
    }
    
    return () => {
      didCancel = true; 
      controller.abort(); 
      clearTimeout(fetchTimeoutId); 
    };
  }, [DEVTO_USERNAME, staticFallbackArticles]); // Dependencies: Re-run if username or static articles change

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          All <span className="text-indigo-600 dark:text-indigo-400">Blogs</span>
        </h1>

        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading articles...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            {error}
          </div>
        )}

        {!isLoading && !error && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col"
              >
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title || 'Article Image'} 
                    className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0" 
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-xl text-gray-500 dark:text-gray-400 text-sm flex-shrink-0"> 
                    <img
                      src="https://placehold.co/800x420/E0E0E0/333333?text=No+Image+Available" 
                      alt="No Image Available"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow"> 
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {article.title || 'Untitled Article'} 
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow"> 
                    {(article.description && article.description.length > 120) 
                      ? `${article.description.substring(0, 120)}...` 
                      : article.description || 'No description available.'}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-auto pt-2"> 
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Unknown Date'}</span> 
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                      {typeof article.public_reactions_count === 'number' ? article.public_reactions_count : 'N/A'} 
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            No articles to display at this time.
          </div>
        )}

        {/* Back to Portfolio Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/portfolio#blog')} // Navigate back to main portfolio, specifically to blog section
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

export default AllBlogsPage;
