'use client';

import React, { JSX } from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function Header({ title, subtitle, showLogo = true }: HeaderProps): JSX.Element {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white py-8">
      <div className="container mx-auto px-6">
        {showLogo && (
          <Link href="/" className="text-3xl font-bold text-white hover:text-amber-200 transition-colors inline-block mb-4">
            Devine Rituals
          </Link>
        )}
        {title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xl text-white/90 max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
