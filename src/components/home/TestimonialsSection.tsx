
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TestimonialCard from '../TestimonialCard';
import ReviewOverlay from '../ReviewOverlay';

const TestimonialsSection = () => {
  const [isReviewOverlayOpen, setIsReviewOverlayOpen] = useState(false);

  const handleReviewClick = () => {
    setIsReviewOverlayOpen(true);
  };

  const handleReviewClose = () => {
    setIsReviewOverlayOpen(false);
  };

  const handleReviewContinue = () => {
    // Close the overlay
    setIsReviewOverlayOpen(false);
    
    // Open Google review page in a new tab
    window.open('https://g.page/r/CW3IUt-QOQc1EBM/review', '_blank');
  };

  return (
    <section className="section-padding bg-bc-gray">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">Testimonials</div>
        <h2 className="section-title animate-on-scroll">What Our Clients Say</h2>
        <p className="section-subtitle animate-on-scroll">
          Don't just take our word for it. Hear what our satisfied customers have to say about our services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="animate-on-scroll">
            <TestimonialCard
              quote="Jayden did an amazing job on the roof. I'll be using his services again."
              name="John P."
              location="Langley, BC"
            />
          </div>
          <div className="animate-on-scroll">
            <TestimonialCard
              quote="Great work! Totally satisfied with the result of the window cleaning. left no mess and my windows are perfect."
              name="Liz S."
              location="Surrey, BC"
            />
          </div>
          <div className="animate-on-scroll">
            <TestimonialCard
              quote="He used some fancy equipment, did my windows with a water fed pole which I've never seen before. It did a great job on the windows and left no streaks!"
              name="Emily C."
              location="Langley, BC"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Link to="/testimonials">
            <button className="btn-primary w-full md:w-auto">View More Testimonials</button>
          </Link>
          
          <button 
            onClick={handleReviewClick}
            className="btn-outline flex items-center gap-2 w-full md:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#4285F4" className="mr-2">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Leave a Google Review
          </button>
        </div>
      </div>
      
      <ReviewOverlay 
        isOpen={isReviewOverlayOpen}
        onClose={handleReviewClose}
        onContinue={handleReviewContinue}
      />
    </section>
  );
};

export default TestimonialsSection;
