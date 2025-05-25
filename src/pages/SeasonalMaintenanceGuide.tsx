
import { Helmet } from "react-helmet-async";
import Layout from '@/components/Layout';
import { Calendar, CheckCircle, Droplets, Leaf, Snowflake, Sun } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const SeasonalMaintenanceGuide = () => {
  const { t } = useTranslation();

  const seasons = [
    {
      name: "Spring",
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      color: "bg-green-50 border-green-200",
      tasks: [
        "Inspect and clean gutters after winter debris",
        "Check roof for winter damage and moss growth",
        "Clean windows for maximum natural light",
        "Pressure wash driveways and walkways",
        "Inspect exterior siding for winter damage"
      ]
    },
    {
      name: "Summer",
      icon: <Sun className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-50 border-yellow-200",
      tasks: [
        "Clean windows to reduce cooling costs",
        "Maintain gutters throughout heavy rain season",
        "Regular roof cleaning to prevent moss buildup",
        "Power wash decks and patios for outdoor season",
        "Check for algae growth on siding"
      ]
    },
    {
      name: "Fall",
      icon: <Droplets className="w-8 h-8 text-orange-500" />,
      color: "bg-orange-50 border-orange-200",
      tasks: [
        "Deep clean gutters before winter storms",
        "Final roof inspection and cleaning",
        "Clean windows before darker months",
        "Pressure wash before winter weather sets in",
        "Clear debris from around foundation"
      ]
    },
    {
      name: "Winter",
      icon: <Snowflake className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      tasks: [
        "Monitor gutters for ice dams",
        "Check roof for snow load and damage",
        "Clean interior windows for maximum light",
        "Plan maintenance for spring season",
        "Emergency cleaning as weather permits"
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Seasonal Home Maintenance Guide - BC Pressure Washing</title>
        <meta name="description" content="Complete seasonal maintenance guide for BC homeowners. Learn when to schedule pressure washing, window cleaning, gutter cleaning and roof maintenance." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-bc-red to-red-700 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Seasonal Home Maintenance Guide
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            Keep your property in perfect condition year-round with our comprehensive seasonal maintenance schedule
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Seasonal Maintenance Matters</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BC's unique climate presents specific challenges for homeowners. From heavy winter rains to summer algae growth, 
              each season requires different maintenance approaches. Following our seasonal guide helps prevent costly repairs 
              and keeps your property looking its best.
            </p>
          </div>

          {/* Seasonal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {seasons.map((season, index) => (
              <div key={index} className={`p-8 rounded-2xl border-2 ${season.color} hover:shadow-lg transition-shadow`}>
                <div className="flex items-center mb-6">
                  {season.icon}
                  <h3 className="text-2xl font-bold ml-4">{season.name} Maintenance</h3>
                </div>
                <ul className="space-y-3">
                  {season.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help With Seasonal Maintenance?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let BC Pressure Washing handle your seasonal maintenance needs. We'll create a custom schedule 
              based on your property's specific requirements and BC's climate patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Schedule Maintenance
              </a>
              <a href="/services" className="btn-secondary">
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeasonalMaintenanceGuide;
