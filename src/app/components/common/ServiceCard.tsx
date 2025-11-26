// app/components/ServiceCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Badge, Button } from '../ui'; // adjust import path if different

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
  category?: string;
  isActive?: boolean;
}

interface ServiceCardProps {
  service: Service;
  onBook?: (service: Service) => void;
  adminMode?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleActive?: (id: string, nextActive: boolean) => void;
}

export default function ServiceCard({
  service,
  onBook,
  adminMode = false,
  onEdit,
  onDelete,
  onToggleActive,
}: ServiceCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(service.id);
    } else {
      router.push(`/admin/components/edit/${service.id}`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      if (window.confirm(`Are you sure you want to delete "${service.title}" pooja?`)) {
        onDelete(service.id);
      }
    }
  };

  return (
    <Card variant="hover" className="h-full flex flex-col overflow-hidden group">
      {/* Image */}
      {service.image ? (
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
      ) : (
        <div className="h-48 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600" />
      )}

      <CardHeader className="mt-4">
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
              {service.benefits.slice(0, 3).map((benefit, index) => (
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
          {!adminMode ? (
            <>
              <Link href={`/services/${service.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">View Details</Button>
              </Link>
              {onBook && (
                <Button variant="primary" size="sm" onClick={() => onBook(service)} className="flex-1">
                  Book Now
                </Button>
              )}
            </>
          ) : (
            <>
              <Link href={`/services/${service.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">View</Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="w-full"
              >
                Edit
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                Delete
              </Button>
            </>
          )}
        </div>

        {/* Small toggle for active/inactive below the buttons (admin only) */}
        {adminMode && typeof service.isActive !== 'undefined' && (
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="text-gray-300">Status: {service.isActive ? 'Active' : 'Inactive'}</div>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleActive && onToggleActive(service.id, !service.isActive)}
                className="text-xs"
              >
                {service.isActive ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
