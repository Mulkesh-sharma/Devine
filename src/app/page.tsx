// app/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ServiceCard, PageLayout, Section, Button, cn } from './components';
import BookingDialog from './components/BookingDialog';
import type { Service } from '../lib/types';

function HomeClient() {
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
        // Get only popular services for home page
        const popularServices = data.data.services
          .filter((service: any) => service.isPopular)
          .map((backendService: any) => ({
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
        
        setServices(popularServices);
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
      <PageLayout gradient>
        <Section centered>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout gradient>
      {/* Hero Section */}
      <Section centered>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Book a Panditji for any pooja
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Quickly find trained pandits for home rituals, havan, and ceremonies.
        </p>
        <div>
          <Link href="/services">
            <Button size="lg">
              Browse All Services
            </Button>
          </Link>
        </div>
      </Section>

      {/* Popular Services Section */}
      <Section title="Popular Services" subtitle="Most requested spiritual services by our community">
        <div className={cn.layout.grid}>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} onBook={onBook} />
          ))}
        </div>
      </Section>

      <BookingDialog open={open} service={selected} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}

export default function HomePage() {
  return <HomeClient />;
}
