
import { Link } from 'react-router-dom';
import TestimonialCard from '../TestimonialCard';

const TestimonialsSection = () => {
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

        <div className="flex justify-center mt-10">
          <Link to="/testimonials">
            <button className="btn-primary">View More Testimonials</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
