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
      className="scroll-mt-28 px-5 py-16 md:py-24"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <p className="section-kicker">Recommendations</p>
          <h2 className="display-title">What People Say</h2>
        </div>

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