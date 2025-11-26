// app/admin/components/edit/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PageLayout, Section, Button } from '../../../../components';
import type { Service } from '../../../../../lib/types';
import { useAuth } from '../../../../context/AuthContext';

export default function EditPoojaPage() {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceINR, setPriceINR] = useState<number | ''>('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [pujaLanguage, setPujaLanguage] = useState('Hindi');
  const [category, setCategory] = useState('Ganesh Pooja');
  const [difficulty, setDifficulty] = useState('Easy');
  const [durationMinutes, setDurationMinutes] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [panditDetails, setPanditDetails] = useState('');
  const [benefits, setBenefits] = useState('');
  const [materials, setMaterials] = useState('');
  const [procedure, setProcedure] = useState('');
  const [included, setIncluded] = useState('');
  const [excluded, setExcluded] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchService();
  }, [params.id]);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${params.id}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch service');
      
      const service = data.data.service;
      setTitle(service.title || '');
      setDescription(service.description || '');
      setPriceINR(service.priceINR || '');
      setDuration(service.duration || '');
      setLocation(service.location || '');
      setPujaLanguage(service.pujaLanguage || 'Hindi');
      setCategory(service.category || 'Ganesh Pooja');
      setDifficulty(service.difficulty || 'Easy');
      setDurationMinutes(service.durationMinutes || '');
      setImage(service.images?.[0] || '');
      setPanditDetails(service.panditDetails || '');
      setBenefits(service.benefits?.join('\n') || '');
      setMaterials(service.materials?.join('\n') || '');
      setProcedure(service.procedure?.join('\n') || '');
      setIncluded(service.included?.join('\n') || '');
      setExcluded(service.excluded?.join('\n') || '');
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load service');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: Partial<Service & { images?: string[]; isActive?: boolean }> = {
      title,
      description,
      priceINR: typeof priceINR === 'number' ? priceINR : Number(priceINR),
      durationMinutes: typeof durationMinutes === 'number' ? durationMinutes : Number(durationMinutes),
      duration,
      location,
      pujaLanguage,
      category,
      difficulty,
      panditDetails,
      benefits: benefits.split('\n').filter(i => i.trim()),
      materials: materials.split('\n').filter(i => i.trim()),
      procedure: procedure.split('\n').filter(i => i.trim()),
      included: included.split('\n').filter(i => i.trim()),
      excluded: excluded.split('\n').filter(i => i.trim()),
      images: image ? [image] : [],
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/services/${params.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Pooja</h1>
            <Button variant="ghost" onClick={() => router.push('/admin')}>Back</Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/20 p-3 rounded">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-800 p-2 border border-gray-700 rounded" required />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={3} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price (INR)</label>
                <input type="number" value={priceINR} onChange={(e) => setPriceINR(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 border bg-gray-800 border-gray-700 rounded" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duration Text</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" placeholder='e.g. "2 hours"' required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select value={pujaLanguage} onChange={(e) => setPujaLanguage(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" required>
                  {['Hindi', 'English', 'Sanskrit', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Kannada', 'Malayalam', 'Punjabi'].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" required>
                  {['Ganesh Pooja', 'Satyanarayan Katha', 'Laxmi Pooja', 'Rudra Abhishek', 'Navagraha Shanti', 'Vastu Shanti', 'Griha Pravesh', 'Marriage Ceremony', 'Naming Ceremony', 'Last Rites', 'Other'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Pandit Details</label>
                <textarea value={panditDetails} onChange={(e) => setPanditDetails(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={2} />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Benefits (one per line)</label>
                <textarea value={benefits} onChange={(e) => setBenefits(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={4} />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Materials (one per line)</label>
                <textarea value={materials} onChange={(e) => setMaterials(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={4} />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Procedure (one per line)</label>
                <textarea value={procedure} onChange={(e) => setProcedure(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={4} />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Included (one per line)</label>
                <textarea value={included} onChange={(e) => setIncluded(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={3} />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Excluded (one per line)</label>
                <textarea value={excluded} onChange={(e) => setExcluded(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" rows={3} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">{isSubmitting ? 'Updating...' : 'Update Pooja'}</Button>
              <Button variant="outline" onClick={() => router.push('/admin')} className="flex-1">Cancel</Button>
            </div>
          </form>
        </div>
      </Section>
    </PageLayout>
  );
}
