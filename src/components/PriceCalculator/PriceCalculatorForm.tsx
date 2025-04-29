import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProgressSteps from './ProgressSteps';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

const servicesData: Service[] = [
  { id: 'windowCleaning', name: 'Window Cleaning', description: 'Clean windows for a clear view.', price: 100 },
  { id: 'pressureWashing', name: 'Pressure Washing', description: 'Power wash surfaces to remove dirt.', price: 150 },
  { id: 'gutterCleaning', name: 'Gutter Cleaning', description: 'Clear gutters to prevent water damage.', price: 80 },
  { id: 'roofCleaning', name: 'Roof Cleaning', description: 'Remove moss and algae from your roof.', price: 200 },
];

interface StepProps {
  onNext: () => void;
}

interface StepServiceProps extends StepProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const StepService: React.FC<StepServiceProps> = ({ selectedService, setSelectedService, onNext }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select a Service</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicesData.map(service => (
          <label key={service.id} className="flex items-center p-4 border rounded-md cursor-pointer hover:shadow-md transition-shadow">
            <input
              type="radio"
              name="service"
              value={service.id}
              checked={selectedService === service.id}
              onChange={(e) => setSelectedService(e.target.value)}
              className="mr-2"
            />
            <div>
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onNext} disabled={!selectedService}>Next</Button>
      </div>
    </div>
  );
};

interface StepDetailsProps extends StepProps {
  address: string;
  setAddress: (address: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
}

const StepDetails: React.FC<StepDetailsProps> = ({ address, setAddress, propertyType, setPropertyType, onNext }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Property Details</h2>
      <div className="mb-4">
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          id="address"
          placeholder="123 Main St"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onNext} disabled={!address || !propertyType}>Next</Button>
      </div>
    </div>
  );
};

interface StepOptionsProps extends StepProps {
  additionalOptions: string[];
  setAdditionalOptions: (options: string[]) => void;
}

const StepOptions: React.FC<StepOptionsProps> = ({ additionalOptions, setAdditionalOptions, onNext }) => {
  const options = [
    'Gutter Guards',
    'Window Screens',
    'Skylight Cleaning',
  ];

  const toggleOption = (option: string) => {
    if (additionalOptions.includes(option)) {
      setAdditionalOptions(additionalOptions.filter(opt => opt !== option));
    } else {
      setAdditionalOptions([...additionalOptions, option]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Additional Options</h2>
      {options.map(option => (
        <div key={option} className="flex items-center mb-2">
          <Checkbox
            id={option}
            checked={additionalOptions.includes(option)}
            onCheckedChange={() => toggleOption(option)}
          />
          <Label htmlFor={option} className="ml-2">{option}</Label>
        </div>
      ))}
      <div className="mt-6 flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

interface StepContactProps extends StepProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

const StepContact: React.FC<StepContactProps> = ({ name, setName, email, setEmail, phone, setPhone, onNext }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onNext} disabled={!name || !email || !phone}>Submit</Button>
      </div>
    </div>
  );
};

export default function PriceCalculatorForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const totalSteps = 4;

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const calculatePrice = () => {
    let basePrice = servicesData.find(service => service.id === selectedService)?.price || 0;
    let optionsPrice = additionalOptions.length * 50;
    return basePrice + optionsPrice;
  };

  const totalPrice = calculatePrice();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-2/3">
          <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <StepService 
                selectedService={selectedService} 
                setSelectedService={setSelectedService}
                onNext={handleNextStep}
              />
            )}
            
            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <StepDetails
                address={address}
                setAddress={setAddress}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                onNext={handleNextStep}
              />
            )}
            
            {/* Step 3: Additional Options */}
            {currentStep === 3 && (
              <StepOptions
                additionalOptions={additionalOptions}
                setAdditionalOptions={setAdditionalOptions}
                onNext={handleNextStep}
              />
            )}
            
            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <StepContact
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                onNext={() => alert('Form submitted!')}
              />
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/3 sticky top-24">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Your Estimate</h3>
            
            <div className="mb-6 text-center">
              <img 
                src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
                alt="Jayden Fisher - Owner & Lead Technician" 
                className="w-32 h-32 rounded-full border-4 border-bc-red mx-auto mb-2 object-cover"
              />
              <h4 className="font-semibold">Jayden Fisher</h4>
              <p className="text-sm text-gray-600">Owner & Lead Technician</p>
            </div>
            
            <div className="mb-4">
              <p className="flex justify-between items-center">
                <span>Service:</span>
                <span>{servicesData.find(service => service.id === selectedService)?.name || 'Not Selected'}</span>
              </p>
              <p className="flex justify-between items-center">
                <span>Options:</span>
                <span>{additionalOptions.length > 0 ? additionalOptions.join(', ') : 'None'}</span>
              </p>
            </div>
            
            <div className="border-t pt-4">
              <p className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </p>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">
                Every job is personally handled or overseen by me, the owner. I guarantee your satisfaction!
              </p>
              <a 
                href="tel:7788087620"
                className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-center"
              >
                Or Call: 778-808-7620
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
