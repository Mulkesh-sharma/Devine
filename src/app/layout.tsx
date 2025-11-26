// app/layout.tsx
import './globals.css';
import Providers from './components/Providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React from 'react';

export const metadata = {
  title: 'Pandit Booking',
  description: 'Book panditji for pooja and rituals online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
