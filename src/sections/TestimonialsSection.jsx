import React from 'react';
import TestimonialCard from '../components/TestimonialCard.jsx';

const TestimonialsSection = () => {
const testimonials = [
  {
    quote: "Parshuram demonstrated strong expertise in backend development using Golang and distributed systems architecture. His ability to design scalable APIs, handle concurrent processing, and build reliable backend services is highly impressive.",
    author: "Senior Backend Engineer",
    image: "https://picsum.photos/80/80?random=1"
  },
  {
    quote: "His understanding of Hyperledger Fabric and ability to design robust smart contracts for complex use cases like trade finance is impressive. A strong asset for any DLT team.",
    author: "Blockchain Lead",
    image: "https://picsum.photos/80/80?random=2"
  },
  {
    quote: "Parshuram seamlessly bridges backend systems with scalable architectures and distributed design principles. His engineering approach makes him highly effective in real-world systems.",
    author: "Project Manager",
    image: "https://picsum.photos/80/80?random=3"
  },
];

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="container mx-auto px-4">

        {/* ✅ SEO Optimized Heading */}
        <h2 className="text-4xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          What <span className="text-indigo-600 dark:text-indigo-400">People Say</span>
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {/* ✅ Hidden SEO Boost */}
        <p style={{ display: "none" }}>
          Reviews for Parshuram Singh blockchain developer and backend engineer.
          Testimonials highlighting expertise in Hyperledger Fabric, smart contracts,
          distributed systems, and full stack development.
        </p>

      </div>
    </section>
  );
};

export default TestimonialsSection;