'use client';

import React, { JSX } from 'react';
import { cn } from '../ui';
import Header from './Header';

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  headerLogo?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  showHeader = false,
  headerLogo = true,
  gradient = false,
  children,
  className = '',
  ...props
}: PageLayoutProps): JSX.Element {
  const layoutClasses = `min-h-screen ${gradient ? cn.gradients.dark : 'bg-gray-900'} text-white ${className}`;
  
  return (
    <div className={layoutClasses} {...props}>
      {showHeader && (
        <Header 
          title={title} 
          subtitle={subtitle} 
          showLogo={headerLogo}
        />
      )}
      <main className={cn.layout.container}>
        {children}
      </main>
    </div>
  );
}
