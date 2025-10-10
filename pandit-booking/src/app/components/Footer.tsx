// app/components/Footer.tsx
'use client';

import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-slate-100 border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-sm text-slate-600 flex justify-between">
        <div>© {new Date().getFullYear()} PanditBooking</div>
        <div>Made with ❤️ • Contact: contact@panditbooking.example</div>
      </div>
    </footer>
  );
}
