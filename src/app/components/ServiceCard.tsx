// app/components/ServiceCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Badge, Button } from '../components';

interface Service {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceINR: number;
  image?: string;
  duration?: string;
  location?: string;
  language?: string;
  benefits?: string[];
  category?: string;
  isActive?: boolean;
}

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
  adminMode?: boolean;
  onDelete?: (id: string) => void;
}

export default function ServiceCard({
  service,
  onBook,
  adminMode = false,
  onDelete,
}: ServiceCardProps) {
  const router = useRouter();
  const serviceId = service._id || service.id || '';

  const handleEdit = () => {
    if (serviceId) {
      router.push(`/admin/components/edit/${serviceId}`);
    }
  };

  const handleDelete = () => {
    if (serviceId && onDelete) {
      if (window.confirm(`Are you sure you want to delete "${service.title}" pooja?`)) {
        onDelete(serviceId);
      }
    }
  };

  const handleSeeDetails = () => {
    if (serviceId) {
      router.push(`/services/${serviceId}`);
    }
  };

  return (
    <Card variant="hover" className="h-full flex flex-col overflow-hidden group">
      {/* Service Image */}
      {service.image && (
        <div className="relative h-48 overflow-hidden rounded-lg">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
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
          {adminMode ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDelete}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white border-none hover:from-red-600 hover:to-red-700"
              >
                Delete
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleEdit}
                className="flex-1"
              >
                Edit
              </Button>
            </>
          ) : (
            <>
              <Link href={`/services/${serviceId}`} className="flex-1">
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
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
