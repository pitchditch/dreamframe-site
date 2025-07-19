
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import Layout from "../components/Layout";

const services = [
  "Window Cleaning",
  "Pressure Washing", 
  "Gutter Cleaning",
  "Roof Cleaning"
];

const Quote = () => {
  const [quoteDetails, setQuoteDetails] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    address: "",
    message: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuoteDetails({ ...quoteDetails, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service: string) => {
    setQuoteDetails(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setQuoteDetails({
        name: "",
        email: "",
        phone: "",
        services: [],
        address: "",
        message: "",
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout title="Quote Sent - BC Pressure Washing">
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 py-8 px-4">
          <div className="max-w-md mx-auto">
            <Card className="text-center p-8 animate-fade-in">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 animate-pulse" />
              </div>
              <CardTitle className="text-2xl mb-4 text-green-600">
                Quote Request Sent!
              </CardTitle>
              <p className="text-muted-foreground mb-6">
                Thanks! A quote will be sent by text and email shortly.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
              >
                Send Another Quote
              </Button>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Free Quote - BC Pressure Washing">
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 py-8 px-4 pt-24">
        <div className="max-w-lg mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-bc-red bg-clip-text text-transparent">
                Request a Free Quote
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Get your personalized estimate in minutes
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={quoteDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={quoteDetails.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={quoteDetails.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Services Needed * (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                        <Checkbox
                          id={service}
                          checked={quoteDetails.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                          className="h-5 w-5"
                        />
                        <Label 
                          htmlFor={service} 
                          className="text-base cursor-pointer flex-1"
                        >
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-semibold">
                    Property Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={quoteDetails.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St, City, Province"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-semibold">
                    Additional Details (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={quoteDetails.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your specific needs, property size, or any special requirements..."
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || quoteDetails.services.length === 0}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-bc-red hover:from-primary/90 hover:to-bc-red/90 transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Quote Request...
                    </>
                  ) : (
                    "Get My Free Quote"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Quote;
