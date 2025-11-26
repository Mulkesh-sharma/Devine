// app/admin/poojas/add/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, Section, Button } from '../../../components';
import type { Service } from '../../../../lib/types';
import { useAuth } from '../../../context/AuthContext';
import BulkUploadTab from './BulkUploadTab';

export default function AddPoojaPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  
  // All form fields
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [panditDetails, setPanditDetails] = useState('');
  const [benefits, setBenefits] = useState('');
  const [materials, setMaterials] = useState('');
  const [procedure, setProcedure] = useState('');
  const [included, setIncluded] = useState('');
  const [excluded, setExcluded] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return image;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed');
      }

      return data.data.url;
    } catch (err) {
      console.error('Image upload error:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);

      // Upload image first if there's a file, otherwise use URL
      let imageUrl = image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

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
        images: imageUrl ? [imageUrl] : [],
        isActive: true,
      };

      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Add New Pooja</h1>
            <Button variant="ghost" onClick={() => router.push('/admin')}>Back</Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'single'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Single Pooja
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'bulk'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Bulk Upload
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'single' ? (
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
                  <label className="block text-sm font-medium mb-1">Image URL (optional if uploading file)</label>
                  <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" placeholder="https://example.com/image.jpg" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Or Upload Image File</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-300"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded border border-gray-700" />
                    </div>
                  )}
                  {isUploading && <p className="text-sm text-orange-400 mt-1">Uploading image...</p>}
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
                <Button type="submit" disabled={isSubmitting || isUploading} className="flex-1">
                  {isSubmitting ? 'Saving...' : isUploading ? 'Uploading...' : 'Create Pooja'}
                </Button>
                <Button variant="outline" onClick={() => router.push('/admin')} className="flex-1">Cancel</Button>
              </div>
            </form>
          ) : (
            <BulkUploadTab />
          )}
        </div>
      </Section>
    </PageLayout>
  );
}
