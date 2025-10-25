// app/services/page.tsx
'use client';

import React from 'react';
import { services } from '../../lib/dummyServices';
import ServiceCard from '../components/ServiceCard';

export default function ServicesPage() {
  return <ServicesClient />;
}


import { useState } from 'react';
import BookingDialog from '../components/BookingDialog';
import type { Service } from '../../lib/types';

function ServicesClient() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  function onBook(s: Service) {
    setSelected(s);
    setOpen(true);
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} onBook={onBook} />
        ))}
      </div>

      <BookingDialog open={open} service={selected} onClose={() => setOpen(false)} />
    </div>
  );
}
