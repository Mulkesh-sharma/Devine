'use client';

import React, { JSX } from 'react';
import { cn } from './theme';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
}

export default function Section({
  title,
  subtitle,
  centered = false,
  gradient = false,
  className = '',
  children,
  ...props
}: SectionProps): JSX.Element {
  const sectionClasses = `${cn.layout.section} ${gradient ? cn.gradients.dark : ''} ${className}`;
  const containerClasses = `${cn.layout.container} ${centered ? 'text-center' : ''}`;
  
  return (
    <section className={sectionClasses} {...props}>
      <div className={containerClasses}>
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold ${gradient ? 'text-white' : cn.text.heading} mb-4`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg ${gradient ? 'text-gray-300' : cn.text.body} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
