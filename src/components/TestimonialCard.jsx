import React from 'react';

const TestimonialCard = ({ quote, author, image }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition-transform hover:scale-105 duration-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={author}
          className="w-20 h-20 rounded-full object-cover mb-4 shadow-md ring-2 ring-indigo-400 dark:ring-indigo-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/80x80/6366F1/FFFFFF?text=PS";
          }}
        />
        <p className="text-gray-700 dark:text-gray-300 italic text-base md:text-lg mb-3 leading-relaxed">
          “{quote}”
        </p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
          — {author}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
