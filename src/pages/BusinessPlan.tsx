
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Target, TrendingUp, Users, Globe, CheckCircle } from 'lucide-react';

const BusinessPlan = () => {
  const monthlyGoals = [
    {
      month: "June (Now)",
      focus: "Foundation & Seed Money",
      tasks: [
        "Door-to-door daily along Marine Dr (target 25–50 homes/day)",
        "Offer window cleaning on the spot to build seed money ($1,150 goal by Wed night)",
        "Flip: Source 1–2 free/cheap wood dressers, bedframes, tools on Marketplace",
        "Log every house visited using Lovable AI prompt + map tracking",
        "Build photo content for future posts: 'Before/After' cleanings, flips"
      ]
    },
    {
      month: "July",
      focus: "Team Building & Digital Launch",
      tasks: [
        "Add 1 subcontractor for window/house washing",
        "Launch 'RefurnishedFurniture' sales via Facebook, Craigslist, Instagram",
        "Create base SOPs (checklists) for each job type",
        "Design digital pricing calculator in Google Sheets (for contractors)",
        "Push BCProServices.ca site with branded landing pages per city"
      ]
    },
    {
      month: "August",
      focus: "Scale Operations",
      tasks: [
        "Expand flips to 3/week (dressers, tools, appliances)",
        "Hire VA to handle Facebook messages + bookings",
        "Release first digital product (e.g. 'Pricing Estimator for Service Businesses')",
        "Start quoting renovation jobs via BCHomeImprovement.ca"
      ]
    },
    {
      month: "September",
      focus: "$20–30K/Month Target",
      tasks: [
        "Goal: $20–30K/month income",
        "Add pressure washer repair/resale model (buy broken, fix, resell)",
        "Recruit more subcontractors (roof, gutters, driveway)",
        "Begin preparing for rental/property manager licensing"
      ]
    },
    {
      month: "October",
      focus: "Multi-City Expansion",
      tasks: [
        "Add team in 2nd BC city (Surrey, Kelowna, or Island)",
        "Launch fall clean-up package: window + gutter + moss removal",
        "Begin cold outreach to strata & commercial accounts",
        "Build 'BC Home Reno' service packages (deck, siding, bathroom)"
      ]
    },
    {
      month: "November–December",
      focus: "$80–85K/Month Target",
      tasks: [
        "Scale digital product sales via email & Instagram",
        "Flip higher-end items (fridges, gas stoves, snow tires)",
        "Run referral program for year-end push",
        "Goal: $80–85K revenue/month by December"
      ]
    }
  ];

  const weeklySystem = [
    { day: "Monday", tasks: "Flip sourcing + repairs; social post" },
    { day: "Tuesday", tasks: "Door-to-door sales + site visits" },
    { day: "Wednesday", tasks: "Invoicing, admin, content creation" },
    { day: "Thursday", tasks: "Crew check-ins, review KPIs" },
    { day: "Friday", tasks: "Marketing push (email, post, deals)" },
    { day: "Saturday", tasks: "Jobsite work + before/after photos" },
    { day: "Sunday", tasks: "Planning, rest, family, light online listings" }
  ];

  const teams = [
    "Cleaning Subcontractors (Window, Pressure, Gutter)",
    "Furniture Flip Crew (sanding, paint, loading)",
    "VA or Admin Assistant (bookings, follow-ups)",
    "Repair Tech (tools, washers, flip repair)",
    "Renovation Crew (handyman + skilled trades)"
  ];

  const websites = [
    { url: "bcproservices.ca", purpose: "Main hub for subcontracted services" },
    { url: "bchomeimprovement.ca", purpose: "Construction, Reno" },
    { url: "refurnishedfurniture.com", purpose: "Flipping side brand" },
    { url: "bcpropertymanagement.ca", purpose: "Future rental mgmt licensing + services" }
  ];

  return (
    <Layout
      title="Million-Dollar Business Growth Plan | Jayden Fisher - BC Pressure Washing"
      description="Comprehensive business growth strategy to reach $1,000,000 revenue by December 31st through pressure washing, flips, digital products, and renovations."
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Million-Dollar Business Growth Plan
              </h1>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                <p className="mb-4"><strong>Target:</strong> $1,000,000 revenue by December 31st</p>
                <p className="mb-4"><strong>Starting Point:</strong> $0–$200K</p>
                <p><strong>Primary Income Streams:</strong> Flips (furniture/equipment), Pressure Washing + Subcontracted Services, Digital Products, Renovations, Future Real Estate Mgmt</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Door-to-door</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Referrals</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Local SEO</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">Lean Systems</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">Team Scaling</span>
              </div>
            </div>
          </div>
        </section>

        {/* Month-by-Month Plan */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Month-by-Month Plan</h2>
              </div>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {monthlyGoals.map((month, index) => (
                <Card key={index} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <Target className="h-6 w-6 text-blue-600" />
                      {month.month}
                    </CardTitle>
                    <p className="text-blue-700 font-semibold">{month.focus}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {month.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly System */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Weekly System</h2>
              <p className="text-xl text-gray-600">Repeat every week for consistent growth</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {weeklySystem.map((day, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-blue-600 mb-2">{day.day}</h3>
                    <p className="text-gray-700">{day.tasks}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Teams to Build */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Teams to Build</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {teams.map((team, index) => (
                <Card key={index} className="border border-gray-200 hover:border-green-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <p className="font-semibold text-gray-900">{team}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Websites */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Digital Properties</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {websites.map((site, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="h-6 w-6 text-purple-600" />
                      <h3 className="font-bold text-lg text-gray-900">{site.url}</h3>
                    </div>
                    <p className="text-gray-700">{site.purpose}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Long-Term Leverage */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Long-Term Leverage</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-orange-600">Digital Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Pricing templates, quote kits, cleaning business starter guides</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-green-600">Recurring Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Property management contracts, commercial accounts</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-600">Passive Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Refurb furniture, online tools, appliance flips</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Mindset */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Success Mindset</h2>
              <div className="grid md:grid-cols-2 gap-8 text-lg">
                <div className="space-y-4">
                  <p>✨ <strong>Every dollar reinvested is fuel</strong></p>
                  <p>🎯 <strong>Every client is future marketing</strong></p>
                  <p>📚 <strong>Every flip is a lesson</strong></p>
                </div>
                <div className="space-y-4">
                  <p>🚀 <strong>Build lean, scale smart</strong></p>
                  <p>🏠 <strong>Stay local but think big</strong></p>
                  <p>⏰ <strong>Next Check-in: Sunday Night</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Execute This Plan?</h2>
            <p className="text-xl mb-8">Transform your business and reach $1,000,000 in revenue</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="/contact">Get Started Today</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <a href="/calculator">Calculate Your Potential</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BusinessPlan;
