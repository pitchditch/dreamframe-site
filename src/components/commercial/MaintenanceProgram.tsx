
import MaintenanceProgramForm from '../MaintenanceProgramForm';

const MaintenanceProgram = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="section-title">Apply for Monthly Window Cleaning</h2>
      <p className="section-subtitle mb-8">
        Join our maintenance program starting at just $10 per window per month
      </p>
      <MaintenanceProgramForm />
    </section>
  );
};

export default MaintenanceProgram;
