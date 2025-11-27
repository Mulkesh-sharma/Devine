// lib/types.ts
export type Service = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceINR: number;
  image?: string;
  duration?: string;
  location?: string;
  language?: string;
  benefits?: string[];
  panditDetails?: string;
  materials?: string[];
  procedure?: string[];
  included?: string[];
  excluded?: string[];
  category?: string;
  difficulty?: string;
  pujaLanguage?: string;
  images?: string[];
  tags?: string[];
  isPopular?: boolean;
  isActive?: boolean;
  bookingCount?: number;
  rating?: {
    average: number;
    count: number;
  };
  createdBy?: {
    _id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type Booking = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    _id: string;
    title: string;
    priceINR: number;
    duration: string;
  };
  bookingDate: string;
  bookingTime: string;
  status: 'pending' | 'confirmed' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  pricing: {
    basePrice: number;
    additionalCharges: number;
    totalPrice: number;
    paymentMethod: string;
  };
  contactPerson: {
    name: string;
    phone: string;
    email?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  poojaDetails: {
    numberOfPeople: number;
    specialInstructions?: string;
    preferredPandit?: string;
    materialsProvided: boolean;
  };
  createdAt: string;
  updatedAt: string;
};