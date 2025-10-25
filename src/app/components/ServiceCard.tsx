// app/components/ServiceCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import type { Service } from '../../lib/types';

type Props = {
  service: Service;
  onBook: (s: Service) => void;
};

export default function ServiceCard({ service, onBook }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group">
      {service.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ₹{service.priceINR}
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            ⏱️ {service.durationMinutes} minutes
          </div>
          <button
            onClick={() => onBook(service)}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
