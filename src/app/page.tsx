// app/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ServiceCard, PageLayout, Section, Button, cn } from './components';
import BookingDialog from './components/BookingDialog';
import type { Service } from '../lib/types';
import { EmptyState } from '@/components/EmptyState';
import { FiRefreshCw } from 'react-icons/fi';
import { useAuth } from './context/AuthContext';

export function HomeClient() {
  const { user, token } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [services, setServices] = useState<Service[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (isRefresh = false) => {
    try {
      setError(null);
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      
      const response = await fetch('/api/services');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch services');
      }

      // Get first 6 services for home page
      const homeServices = Array.isArray(data.data?.services) 
        ? data.data.services
            .slice(0, 6)
            .map((backendService: any) => ({
              _id: backendService._id,
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
            }))
        : [];

      setServices(homeServices);
      
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setServices([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function onBook(service: Service) {
    setSelected(service);
    setOpen(true);
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Delete failed');
      }

      fetchServices(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete service');
    }
  };

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
        <div className='text-center align-center'>
          <h3 className="text-xl text-gray-300 mb-8">
            Quickly find trained pandits for home rituals, havan, and ceremonies.
          </h3>
        </div>
        <div>
          <Link href="/services">
            <Button size="lg">
              Browse All Services
            </Button>
          </Link>
        </div>
      </Section>

      {/* Popular Services Section */}
      <Section>
              {error ? (
                <div className="text-center py-12">
                  <EmptyState
                    title="Error loading services"
                    description={error}
                    actionText="Try Again"
                    onAction={() => fetchServices(true)}
                    actionIcon={
                      <FiRefreshCw className="-ml-0.5 mr-1.5 h-5 w-5" />
                    }
                  />
                </div>
              ) : refreshing ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-12">
                  <EmptyState
                    title="No services found"
                    description="We couldn't find any services matching your criteria."
                    actionText="Refresh"
                    onAction={() => fetchServices(true)}
                    actionIcon={
                      <FiRefreshCw className="-ml-0.5 mr-1.5 h-5 w-5" />
                    }
                  />
                </div>
              ) : (
                <div className={cn.layout.grid}>
                  {services.map((service) => (
                    <ServiceCard 
                      key={service.id} 
                      service={service} 
                      onBook={isAdmin ? undefined : onBook}
                      adminMode={isAdmin}
                      onDelete={isAdmin ? handleDelete : undefined}
                    />
                  ))}
                </div>
              )}
            </Section>

      {!isAdmin && <BookingDialog open={open} service={selected} onClose={() => setOpen(false)} />}
    </PageLayout>
  );
}

export default function HomePage() {
  return <HomeClient />;
}
