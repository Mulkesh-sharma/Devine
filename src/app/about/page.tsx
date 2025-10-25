// app/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4 text-slate-600">
        We connect households with verified panditjis for all major rituals and ceremonies. This is a demo using dummy data.
      </p>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="mt-2 text-slate-600">Make it simple to find the right priest for your important moments.</p>
      </section>
    </div>
  );
}
