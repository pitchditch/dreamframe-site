
import { create } from 'zustand';

type FormDataType = {
  services: string[];
  propertyType: string;
  size: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

interface ChatFormState {
  formData: Partial<FormDataType>;
  setFormValue: <K extends keyof FormDataType>(key: K, value: FormDataType[K]) => void;
  setServiceValue: (service: string, add: boolean) => void;
  clearFormData: () => void;
}

export const useChatFormData = create<ChatFormState>((set) => ({
  formData: {},
  setFormValue: (key, value) => set((state) => ({
    formData: { ...state.formData, [key]: value }
  })),
  setServiceValue: (service, add) => set((state) => {
    const currentServices = state.formData.services || [];
    const services = add 
      ? [...currentServices, service]
      : currentServices.filter(s => s !== service);
    
    return {
      formData: { ...state.formData, services }
    };
  }),
  clearFormData: () => set({ formData: {} })
}));

export const extractInfoFromMessage = (message: string): Partial<FormDataType> => {
  const extractedData: Partial<FormDataType> = {};
  
  // Extract property type
  if (message.match(/residential|house|home/i)) {
    extractedData.propertyType = 'residential';
  } else if (message.match(/commercial|business|office|store/i)) {
    extractedData.propertyType = 'commercial';
  }
  
  // Extract property size
  if (message.match(/small|1,500 sq\.? ?ft|1500 sq\.? ?ft/i)) {
    extractedData.size = 'small';
  } else if (message.match(/medium|2,500 sq\.? ?ft|2500 sq\.? ?ft/i)) {
    extractedData.size = 'medium';
  } else if (message.match(/large|3,500 sq\.? ?ft|3500 sq\.? ?ft/i)) {
    extractedData.size = 'large';
  } else if (message.match(/extra large|x-large|big|4,000 sq\.? ?ft|4000 sq\.? ?ft/i)) {
    extractedData.size = 'x-large';
  }
  
  // Extract services
  if (message.match(/window cleaning|clean(\s+my)?\s+windows/i)) {
    extractedData.services = [...(extractedData.services || []), 'window-cleaning'];
  }
  if (message.match(/pressure washing|power washing|wash(\s+my)?\s+(driveway|house|deck|patio)/i)) {
    extractedData.services = [...(extractedData.services || []), 'pressure-washing'];
  }
  if (message.match(/gutter cleaning|clean(\s+my)?\s+gutters/i)) {
    extractedData.services = [...(extractedData.services || []), 'gutter-cleaning'];
  }
  if (message.match(/roof cleaning|clean(\s+my)?\s+roof/i)) {
    extractedData.services = [...(extractedData.services || []), 'roof-cleaning'];
  }
  
  // Extract contact information (email with simple regex)
  const emailMatch = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  if (emailMatch && emailMatch[1]) {
    extractedData.email = emailMatch[1];
  }
  
  // Extract phone numbers
  const phoneMatch = message.match(/(\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/);
  if (phoneMatch && phoneMatch[1]) {
    extractedData.phone = phoneMatch[1];
  }
  
  // Extract address (simplified - looking for common address patterns)
  const addressMatch = message.match(/((?:\d+\s+[\w\s]+(?:Avenue|Ave|Street|St|Road|Rd|Drive|Dr|Lane|Ln|Place|Pl|Court|Ct|Boulevard|Blvd)(?:\s+\w+)?)[,\s]+(?:Vancouver|Burnaby|Surrey|Richmond|Coquitlam|White Rock|West Vancouver|North Vancouver|Langley|Delta|Abbotsford|Chilliwack|Maple Ridge|Whistler|Squamish)(?:[,\s]+BC)?)/i);
  if (addressMatch && addressMatch[1]) {
    extractedData.address = addressMatch[1];
  }
  
  // Extract name (look for common name patterns - simplified)
  const nameMatch = message.match(/(?:my name is|this is) ([A-Z][a-z]+(?: [A-Z][a-z]+){1,2})/i);
  if (nameMatch && nameMatch[1]) {
    extractedData.fullName = nameMatch[1];
  }
  
  return extractedData;
};
