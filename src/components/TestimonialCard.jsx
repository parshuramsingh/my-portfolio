import React from 'react';

const TestimonialCard = ({ quote, author, image }) => {
  return (
    <figure className="surface-card flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1">
      <span className="font-serif text-5xl leading-none text-indigo-500/70" aria-hidden="true">“</span>
      <blockquote className="mt-2 flex-grow text-base leading-relaxed text-ink/80 dark:text-paper/80">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <img
          src={image}
          alt=""
          className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-400/40"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/80x80/6366F1/FFFFFF?text=PS";
          }}
        />
        <span className="text-sm font-semibold tracking-wide text-ink dark:text-paper">
          {author}
        </span>
      </figcaption>
    </figure>
  );
};

export default TestimonialCard;
