// app/admin/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, Section, Button, cn } from '../components';
import ServiceCard from '../components/ServiceCard';
import type { Service } from '../../lib/types'; // adjust path if different
import { EmptyState } from '@/components/EmptyState';
import { FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Container, Typography } from '@mui/material';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // client guard: if not admin (extra layer), redirect away
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

      const res = await fetch('/api/services'); // backend should return ALL services
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch services');
      }

      const svc = Array.isArray(data.data?.services)
        ? data.data.services.map((backendService: any) => ({
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
          // pass through other fields as needed
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
    if (!confirm('Are you sure you want to delete this pooja?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      // remove locally
      setServices((s) => s.filter((svc) => svc.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleToggleActive = async (id: string, nextActive: boolean) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: nextActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setServices((cur) => cur.map(s => s.id === id ? { ...s, isActive: nextActive } : s));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/poojas/edit/${id}`);
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
    <PageLayout>
      <Section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage poojas and services from here</p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => fetchServices(true)} size="md" className="flex items-center gap-2">
              <FiRefreshCw /> Refresh
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => router.push('/admin/components/add')}
            >
              Add New Pooja
            </Button>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12">
            <EmptyState title="Error loading services" description={error} actionText="Try Again" onAction={() => fetchServices(true)} />
          </div>
        ) : refreshing ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <EmptyState
              title="No poojas found"
              description="There are no poojas in the system yet."
              actionText="Refresh"
              onAction={() => fetchServices(true)}
            />
          </div>
        ) : (
          <div className={cn.layout.grid}>
            {services.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                adminMode
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            ))}
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
