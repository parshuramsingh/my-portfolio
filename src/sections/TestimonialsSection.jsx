import React from 'react';
import TestimonialCard from '../components/TestimonialCard.jsx';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Parshuram demonstrated exceptional skill in React.js during his internship. His contributions to responsive UI development were invaluable, and he consistently delivered clean, maintainable code.",
      author: "Senior Developer at Suven Consultants",
      image: "https://placehold.co/80x80/6366F1/FFFFFF?text=RS"
    },
    {
      quote: "His understanding of Hyperledger Fabric and ability to design robust smart contracts for complex use cases like trade finance is impressive. A strong asset for any DLT team.",
      author: "Blockchain Lead",
      image: "https://placehold.co/80x80/A855F7/FFFFFF?text=TP"
    },
    {
      quote: "Parshuram seamlessly bridges frontend elegance with backend resilience. His full-stack capabilities make him a versatile and highly effective engineer.",
      author: "Project Manager",
      image: "https://placehold.co/80x80/EC4899/FFFFFF?text=SM"
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          What People <span className="text-indigo-600 dark:text-indigo-400">Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default TestimonialsSection;
