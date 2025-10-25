// app/page.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { services } from '../lib/dummyServices';
import ServiceCard from './components/ServiceCard';
import BookingDialog from './components/BookingDialog';
import type { Service } from '../lib/types';

export default function HomePage() {
  // note: ServiceCard + BookingDialog are client components, so we call them normally
  // we must manage booking state in a client wrapper — simplest approach: use client wrapper component below
  return <HomeClient services={services} />;
}


import { useState } from 'react';

function HomeClient({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  function onBook(s: Service) {
    setSelected(s);
    setOpen(true);
  }
  return (
    <div className="px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Book a Panditji for any pooja</h1>
        <p className="text-slate-600 mt-2">Quickly find trained pandits for home rituals, havan, and ceremonies.</p>
        <div className="mt-4">
          <Link href="/services" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-lg hover:shadow-xl">
            Browse All Services
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} onBook={onBook} />
          ))}
        </div>
      </section>

      <BookingDialog open={open} service={selected} onClose={() => setOpen(false)} />
    </div>
  );
}
