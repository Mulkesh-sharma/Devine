'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  PageLayout, 
  Section, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Badge, 
  Button, 
  cn 
} from '../../components';
import BookingDialog from '../../components/BookingDialog';
import type { Service } from '../../../lib/types';

export default function ServiceDetailClient({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/services/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          notFound();
        }
        throw new Error('Failed to fetch service');
      }

      const data = await response.json();
      
      if (!data.success || !data.data || !data.data.service) {
        throw new Error('Service not found');
      }

      // Transform backend service to frontend format
      const backendService = data.data.service;
      const transformedService: Service = {
        id: backendService._id,
        title: backendService.title,
        description: backendService.description,
        durationMinutes: backendService.durationMinutes,
        priceINR: backendService.priceINR,
        image: backendService.images?.[0] || backendService.image || '',
        duration: backendService.duration,
        location: backendService.location,
        language: backendService.pujaLanguage,
        benefits: backendService.benefits,
        category: backendService.category,
        difficulty: backendService.difficulty,
        pujaLanguage: backendService.pujaLanguage,
        panditDetails: backendService.panditDetails,
        materials: backendService.materials,
        procedure: backendService.procedure,
        included: backendService.included,
        excluded: backendService.excluded,
      };

      setService(transformedService);
    } catch (err) {
      console.error('Error fetching service:', err);
      setError(err instanceof Error ? err.message : 'Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Loading..." subtitle="Please wait">
        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  if (error || !service) {
    return (
      <PageLayout title="Error" subtitle="Service not found">
        <Section>
          <div className="text-center py-12">
            <p className="text-gray-300 mb-4">{error || 'Service not found'}</p>
            <Link href="/services">
              <Button variant="primary">Back to Services</Button>
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }


  return (
    <PageLayout title={service.title} subtitle={service.description}>
      {/* Hero Section with Image */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Service Image */}
          <div className="relative rounded-lg overflow-hidden">
            {service.image ? (
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover min-h-[400px]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-orange-500', 'to-amber-600');
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-600 min-h-[400px] flex items-center justify-center">
                <span className="text-white text-6xl">🕉️</span>
              </div>
            )}
          </div>
          
          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="orange" size="lg">₹{service.priceINR}</Badge>
                {service.category && (
                  <Badge variant="outline">{service.category}</Badge>
                )}
                {service.difficulty && (
                  <Badge variant="secondary">{service.difficulty}</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
                {service.title}
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm">
                <span className="text-orange-400 mr-2">⏱️</span>
                <span className="text-gray-300">{service.duration || `${service.durationMinutes} minutes`}</span>
              </div>
              
              {service.location && (
                <div className="flex items-center text-sm">
                  <span className="text-orange-400 mr-2">📍</span>
                  <span className="text-gray-300">{service.location}</span>
                </div>
              )}
              
              {service.language && (
                <div className="flex items-center text-sm">
                  <span className="text-orange-400 mr-2">🗣️</span>
                  <span className="text-gray-300">{service.language}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <span className="text-orange-400 mr-2">⭐</span>
                <span className="text-gray-300">Expert Pandit</span>
              </div>
            </div>
            
            {/* Book Button */}
            <div className="flex gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => setOpen(true)}
                className="flex-1"
              >
                Book Now - ₹{service.priceINR}
              </Button>
              <Link href="/services" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Browse Other Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <Section title="Benefits" subtitle="Spiritual and practical benefits of this puja">
          <div className="grid md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Procedure Section */}
      {service.procedure && service.procedure.length > 0 && (
        <Section title="Puja Procedure" subtitle="Step-by-step process of the ceremony">
          <div className="space-y-4">
            {service.procedure.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-orange-400 font-semibold mb-1">Step {index + 1}</h4>
                  <p className="text-gray-300">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Materials Section */}
      {service.materials && service.materials.length > 0 && (
        <Section title="Required Materials" subtitle="Items needed for the puja ceremony">
          <div className="grid md:grid-cols-3 gap-3">
            {service.materials.map((material, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-orange-400">•</span>
                <span className="text-gray-300 text-sm">{material}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Pandit Details */}
      {service.panditDetails && (
        <Section title="About Our Pandits" subtitle="Expert guidance for your spiritual ceremony">
          <Card variant="glass">
            <CardBody>
              <p className="text-gray-300">{service.panditDetails}</p>
            </CardBody>
          </Card>
        </Section>
      )}

      {/* What's Included/Excluded */}
      <div className="grid md:grid-cols-2 gap-8">
        {service.included && service.included.length > 0 && (
          <Section title="What's Included" subtitle="Services and materials provided">
            <Card variant="hover">
              <CardBody>
                <div className="space-y-3">
                  {service.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Section>
        )}
        
        {service.excluded && service.excluded.length > 0 && (
          <Section title="What's Not Included" subtitle="Services and items not covered">
            <Card variant="hover">
              <CardBody>
                <div className="space-y-3">
                  {service.excluded.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-red-400">✗</span>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Section>
        )}
      </div>

      <BookingDialog open={open} service={service} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}
