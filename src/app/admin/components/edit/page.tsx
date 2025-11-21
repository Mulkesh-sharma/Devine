// app/admin/poojas/edit/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PageLayout, Section, Button } from '../../../components';
import type { Service } from '../../../../lib/types';

export default function EditPoojaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceINR, setPriceINR] = useState<number | ''>('');
  const [durationMinutes, setDurationMinutes] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/services/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Fetch failed');
        const s = data.data?.service || data.data; // adapt depending on API
        setTitle(s.title || '');
        setDescription(s.description || '');
        setPriceINR(s.priceINR ?? '');
        setDurationMinutes(s.durationMinutes ?? '');
        setImage((s.images && s.images[0]) || s.image || '');
        setIsActive(typeof s.isActive === 'boolean' ? s.isActive : true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: Partial<Service & { images?: string[] }> = {
      title,
      description,
      priceINR: typeof priceINR === 'number' ? priceINR : Number(priceINR),
      durationMinutes: typeof durationMinutes === 'number' ? durationMinutes : Number(durationMinutes),
      images: image ? [image] : [],
      isActive,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <Section centered>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Pooja</h1>
            <Button variant="ghost" onClick={() => router.push('/admin')}>Back</Button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows={5} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price (INR)</label>
                <input type="number" value={priceINR} onChange={(e) => setPriceINR(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border rounded" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <span className="text-sm">Active</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
              <Button variant="outline" onClick={() => router.push('/admin')}>Cancel</Button>
            </div>
          </form>
        </div>
      </Section>
    </PageLayout>
  );
}
