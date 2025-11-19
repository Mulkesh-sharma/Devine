// app/services/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { ServiceCard, PageLayout, Section, cn } from '../components';
import BookingDialog from '../components/BookingDialog';
import type { Service } from '../../lib/types';

function ServicesClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      
      if (data.success) {
        // Transform backend services to frontend Service type
        const transformedServices = data.data.services.map((backendService: any) => ({
          id: backendService._id,
          title: backendService.title,
          description: backendService.description,
          durationMinutes: backendService.durationMinutes,
          priceINR: backendService.priceINR,
          image: backendService.images?.[0] || '',
          duration: backendService.duration,
          location: backendService.location,
          language: backendService.pujaLanguage,
          benefits: backendService.benefits,
          category: backendService.category,
          difficulty: backendService.difficulty,
          pujaLanguage: backendService.pujaLanguage,
          images: backendService.images,
          tags: backendService.tags,
          isPopular: backendService.isPopular,
          isActive: backendService.isActive,
          bookingCount: backendService.bookingCount,
          rating: backendService.rating,
          createdBy: backendService.createdBy,
          createdAt: backendService.createdAt,
          updatedAt: backendService.updatedAt,
        }));
        
        setServices(transformedServices);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }

  function onBook(service: Service) {
    setSelected(service);
    setOpen(true);
  }

  if (loading) {
    return (
      <PageLayout title="All Services" subtitle="Loading services...">
        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="All Services" subtitle="Complete list of spiritual services and ceremonies">
      <Section>
        <div className={cn.layout.grid}>
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onBook={onBook} 
            />
          ))}
        </div>
      </Section>

      <BookingDialog open={open} service={selected} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}

export default function ServicesPage() {
  return <ServicesClient />;
}
