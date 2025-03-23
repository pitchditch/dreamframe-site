
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
  if (message.match(/residential|house|home|my house|my home|my property/i)) {
    extractedData.propertyType = 'residential';
  } else if (message.match(/commercial|business|office|store|shop|restaurant|hotel/i)) {
    extractedData.propertyType = 'commercial';
  }
  
  // Extract property size - more detailed size detection
  if (message.match(/small|tiny|1,500 sq\.? ?ft|1500 sq\.? ?ft|less than 1500|under 1500/i)) {
    extractedData.size = 'small';
  } else if (message.match(/medium|2,500 sq\.? ?ft|2500 sq\.? ?ft|about 2000|around 2000/i)) {
    extractedData.size = 'medium';
  } else if (message.match(/large|3,500 sq\.? ?ft|3500 sq\.? ?ft|about 3000|around 3000/i)) {
    extractedData.size = 'large';
  } else if (message.match(/extra large|x-large|very big|huge|mansion|4,000 sq\.? ?ft|4000 sq\.? ?ft|more than 4000|over 4000/i)) {
    extractedData.size = 'x-large';
  }
  
  // Extract services - improved with more variations
  if (message.match(/window cleaning|window washer|clean(\s+the|\s+my|\s+our)?\s+windows|dirty windows|window service|windows need cleaning/i)) {
    extractedData.services = [...(extractedData.services || []), 'window-cleaning'];
  }
  if (message.match(/pressure washing|power washing|pressure wash|power wash|wash(\s+the|\s+my|\s+our)?\s+(driveway|house|deck|patio|siding|exterior|fence|concrete|pavement)/i)) {
    extractedData.services = [...(extractedData.services || []), 'pressure-washing'];
  }
  if (message.match(/gutter cleaning|clean(\s+the|\s+my|\s+our)?\s+gutters|gutters need cleaning|clogged gutters|gutter service|eaves|eavestroughs|eavestrough/i)) {
    extractedData.services = [...(extractedData.services || []), 'gutter-cleaning'];
  }
  if (message.match(/roof cleaning|clean(\s+the|\s+my|\s+our)?\s+roof|roof moss|moss removal|roof service|mossy roof|roof maintenance/i)) {
    extractedData.services = [...(extractedData.services || []), 'roof-cleaning'];
  }
  
  // Extract contact information (email with better regex)
  const emailMatch = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  if (emailMatch && emailMatch[1]) {
    extractedData.email = emailMatch[1];
  }
  
  // Extract phone numbers with more formats
  const phoneMatch = message.match(/(\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/);
  if (phoneMatch && phoneMatch[1]) {
    extractedData.phone = phoneMatch[1];
  }
  
  // Extract address (improved - looking for common address patterns)
  const addressMatch = message.match(/((?:\d+\s+[\w\s]+(?:Avenue|Ave|Street|St|Road|Rd|Drive|Dr|Lane|Ln|Place|Pl|Court|Ct|Boulevard|Blvd|Crescent|Cres|Way|Terrace|Ter|Trail)(?:\s+\w+)?)[,\s]+(?:Vancouver|Burnaby|Surrey|Richmond|Coquitlam|White Rock|West Vancouver|North Vancouver|Langley|Delta|Abbotsford|Chilliwack|Maple Ridge|Whistler|Squamish|New Westminster|Port Coquitlam|Port Moody|Mission|Pitt Meadows)(?:[,\s]+BC)?(?:[,\s]+Canada)?(?:[,\s]+V[0-9][A-Z]\s*[0-9][A-Z][0-9])?)/i);
  if (addressMatch && addressMatch[1]) {
    extractedData.address = addressMatch[1];
  }
  
  // Extract name with improved patterns
  const namePatterns = [
    /(?:my name is|this is|i am|i'm) ([A-Z][a-z]+(?: [A-Z][a-z]+){1,2})/i,
    /(?:hello|hi|hey)[,]?\s+(?:my name is |this is |i'm |i am )?([A-Z][a-z]+(?: [A-Z][a-z]+){1,2})/i,
    /(?:from|by|contact|call)?\s+([A-Z][a-z]+(?: [A-Z][a-z]+){1,2})(?:\s+at|on|with)/i
  ];
  
  for (const pattern of namePatterns) {
    const nameMatch = message.match(pattern);
    if (nameMatch && nameMatch[1]) {
      extractedData.fullName = nameMatch[1];
      break;
    }
  }
  
  // Extract notes/special instructions
  const notesPatterns = [
    /(?:special instructions|special requests|notes|note|please note|by the way|instructions|fyi|for your information|mention|mention that|would like to mention)[:\s]+([^.,]+(?:\.[^.,]+)*)/i,
    /(?:also|additionally|moreover),[:\s]+([^.,]+(?:\.[^.,]+)*)/i
  ];
  
  for (const pattern of notesPatterns) {
    const notesMatch = message.match(pattern);
    if (notesMatch && notesMatch[1] && notesMatch[1].length > 10) {
      extractedData.notes = notesMatch[1].trim();
      break;
    }
  }
  
  return extractedData;
};
