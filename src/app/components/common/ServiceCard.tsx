'use client';

import React, { JSX } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Badge, Button } from '../ui';

interface Service {
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
}

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps): JSX.Element {
  return (
    <Card variant="hover" className="h-full flex flex-col overflow-hidden group">
      {/* Service Image */}
      {service.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-orange-500', 'to-amber-600');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      <CardHeader className='mt-4'>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-orange-400">{service.title}</h3>
          <Badge variant="orange">₹{service.priceINR}</Badge>
        </div>
      </CardHeader>
      
      <CardBody className="flex-1">
        <p className="text-gray-300 mb-4 line-clamp-3">{service.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <span className="text-orange-400 mr-2">⏱️</span>
            <span>{service.duration || `${service.durationMinutes} minutes`}</span>
          </div>
          
          {service.language && (
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-orange-400 mr-2">🗣️</span>
              <span>{service.language}</span>
            </div>
          )}
          
          {service.location && (
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-orange-400 mr-2">📍</span>
              <span>{service.location}</span>
            </div>
          )}
        </div>
        
        {service.benefits && service.benefits.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Benefits:</h4>
            <div className="space-y-1">
              {service.benefits.slice(0, 3).map((benefit: string, index: number) => (
                <div key={index} className="flex items-start text-xs text-gray-400">
                  <span className="text-orange-400 mr-1 mt-0.5">•</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>
      
      <CardFooter className="pt-4">
        <div className="flex gap-2 w-full">
          <Link href={`/services/${service.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {onBook && (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onBook(service)}
              className="flex-1"
            >
              Book Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
