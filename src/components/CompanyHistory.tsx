
import React from 'react';

const CompanyHistory: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
            
            {/* 2021 - Starting Out */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-10 md:text-right order-1 md:order-1 mb-4 md:mb-0">
                  <div className="bg-gray-100 p-6 rounded-lg shadow relative md:ml-auto md:mr-0 max-w-md">
                    <h3 className="text-xl font-bold mb-2">2021 - Starting Out</h3>
                    <p className="text-gray-700">
                      Beginning with just a pressure washer and a passion for exterior cleaning, 
                      I started BC Pressure Washing as a small side business in White Rock.
                      My first clients were neighbors who saw me cleaning my own walkway.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative order-2 md:order-2 pl-10 md:pl-0">
                  <div className="absolute top-0 left-0 md:left-auto md:right-0 md:-translate-x-1/2 -ml-4 md:ml-0 rounded-full h-8 w-8 bg-bc-red flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 2022 - Growing & Learning */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 relative order-2 md:order-1 pl-10 md:pl-0">
                  <div className="absolute top-0 left-0 md:left-auto md:right-0 md:translate-x-1/2 -ml-4 md:ml-0 rounded-full h-8 w-8 bg-bc-red flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-10 order-1 md:order-2 mb-4 md:mb-0">
                  <div className="bg-gray-100 p-6 rounded-lg shadow relative max-w-md">
                    <h3 className="text-xl font-bold mb-2">2022 - Growing & Learning</h3>
                    <p className="text-gray-700">
                      As word spread, I invested in professional equipment and expanded my services to include window cleaning.
                      This was a year of learning specialized techniques and building relationships with customers throughout Surrey and White Rock.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 2023 - Expanding Services */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-10 md:text-right order-1 md:order-1 mb-4 md:mb-0">
                  <div className="bg-gray-100 p-6 rounded-lg shadow relative md:ml-auto md:mr-0 max-w-md">
                    <h3 className="text-xl font-bold mb-2">2023 - Expanding Services</h3>
                    <p className="text-gray-700">
                      With growing demand, I added gutter cleaning and roof moss removal services.
                      I also purchased my first company van and hired seasonal help during busy months.
                      This was a year of significant growth as I committed to the business full-time.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 relative order-2 md:order-2 pl-10 md:pl-0">
                  <div className="absolute top-0 left-0 md:left-auto md:right-0 md:-translate-x-1/2 -ml-4 md:ml-0 rounded-full h-8 w-8 bg-bc-red flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 2024 - Today */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 relative order-2 md:order-1 pl-10 md:pl-0">
                  <div className="absolute top-0 left-0 md:left-auto md:right-0 md:translate-x-1/2 -ml-4 md:ml-0 rounded-full h-8 w-8 bg-bc-red flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-10 order-1 md:order-2 mb-4 md:mb-0">
                  <div className="bg-gray-100 p-6 rounded-lg shadow relative max-w-md">
                    <h3 className="text-xl font-bold mb-2">2024 - Today</h3>
                    <p className="text-gray-700">
                      BC Pressure Washing has evolved into a full-service exterior cleaning company serving the entire Metro Vancouver area. 
                      We maintain our local roots while delivering professional results that have earned hundreds of 5-star reviews.
                      Our commitment to quality service and customer satisfaction remains as strong as day one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
