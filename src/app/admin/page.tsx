// app/admin/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, Section, Button, cn } from '../components';
import ServiceCard from '../components/ServiceCard';
import type { Service } from '../../lib/types';
import { EmptyState } from '@/components/EmptyState';
import { FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
      return;
    }
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const fetchServices = async (isRefresh = false) => {
    try {
      setError(null);
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await fetch('/api/services');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch services');
      }

      const svc = Array.isArray(data.data?.services)
        ? data.data.services.map((backendService: any) => ({
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
            isActive: backendService.isActive,
          }))
        : [];

      setServices(svc);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setServices([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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
      <PageLayout>
        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage all poojas</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => router.push('/admin/bookings')}
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Manage Bookings
            </Button>
            <Button onClick={() => router.push('/admin/components/add')}>
              Add New Pooja
            </Button>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12">
            <EmptyState
              title="Error loading services"
              description={error}
              actionText="Try Again"
              onAction={() => fetchServices(true)}
              actionIcon={<FiRefreshCw className="-ml-0.5 mr-1.5 h-5 w-5" />}
            />
          </div>
        ) : refreshing ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <EmptyState
            title="No poojas found"
            description="Start by adding your first pooja"
            actionText="Add New Pooja"
            onAction={() => router.push('/admin/components/add')}
          />
        ) : (
          <div className={cn.layout.grid}>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                adminMode={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
