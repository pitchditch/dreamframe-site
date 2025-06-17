export interface HousePin {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'visited' | 'interested' | 'not-interested' | 'completed' | 'revisit-later' | 'needs-quote';
  notes: string;
  dateAdded: string;
  contactInfo?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  routeId?: string;
  routeTimestamp?: string;
  routeOrder?: number;
  followUpDate?: string;
  followUpNote?: string;
  leadScore?: 'low' | 'medium' | 'high';
  squareFootage?: number;
  // Facebook leads specific fields
  leadSource?: 'door-to-door' | 'facebook' | 'google' | 'referral' | 'website' | 'other';
  facebookProfileUrl?: string;
  facebookLeadId?: string;
  facebookCampaignName?: string;
  facebookAdSetName?: string;
  // Job completion fields
  jobCompletedDate?: string;
  jobDetails?: string;
  serviceType?: string;
  jobValue?: number;
  isPreviousClient?: boolean;
  lastServiceDate?: string;
  serviceReminder?: boolean; // Alert for yearly service
}

export interface RouteSession {
  id: string;
  name: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  distance?: number;
  path: Array<{lat: number, lng: number, timestamp: string}>;
  homesVisited: number;
  color: string;
  isActive: boolean;
}
