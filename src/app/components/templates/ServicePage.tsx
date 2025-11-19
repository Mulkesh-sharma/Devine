'use client';

import React, { JSX } from 'react';
import { PageLayout } from '../layout';
import { Section, Card, CardHeader, CardBody } from '../ui';

interface ServicePageProps {
  title: string;
  subtitle: string;
  heroContent?: React.ReactNode;
  sections: Array<{
    title?: string;
    subtitle?: string;
    content: React.ReactNode;
    centered?: boolean;
    gradient?: boolean;
  }>;
}

export default function ServicePage({
  title,
  subtitle,
  heroContent,
  sections
}: ServicePageProps): JSX.Element {
  return (
    <PageLayout title={title} subtitle={subtitle}>
      {/* Hero Section */}
      {heroContent && (
        <Section gradient centered>
          {heroContent}
        </Section>
      )}
      
      {/* Content Sections */}
      {sections.map((section, index) => (
        <Section 
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          centered={section.centered}
          gradient={section.gradient}
        >
          {section.content}
        </Section>
      ))}
    </PageLayout>
  );
}
