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