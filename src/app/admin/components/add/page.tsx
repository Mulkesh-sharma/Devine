// app/admin/poojas/add/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, Section, Button } from '../../../components';
import type { Service } from '../../../../lib/types';

export default function AddPoojaPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceINR, setPriceINR] = useState<number | ''>('');
  const [durationMinutes, setDurationMinutes] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: Partial<Service & { images?: string[]; isActive?: boolean }> = {
      title,
      description,
      priceINR: typeof priceINR === 'number' ? priceINR : Number(priceINR),
      durationMinutes: typeof durationMinutes === 'number' ? durationMinutes : Number(durationMinutes),
      images: image ? [image] : [],
      isActive: true,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Create failed');
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add New Pooja</h1>
            <Button variant="ghost" onClick={() => router.push('/admin')}>Back</Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-500 p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-500 border rounded" rows={5} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price (INR)</label>
                <input type="number" value={priceINR} onChange={(e) => setPriceINR(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 bg-gray-500 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border bg-gray-500 rounded" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 bg-gray-500 border rounded" />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Create Pooja'}</Button>
              <Button variant="outline" onClick={() => router.push('/admin')}>Cancel</Button>
            </div>
          </form>
        </div>
      </Section>
    </PageLayout>
  );
}
