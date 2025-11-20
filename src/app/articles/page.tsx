'use client';

import React, { JSX } from 'react';
import Link from 'next/link';
import { PageLayout, Section, cn } from '../components';
import articlesData from '../../lib/articlesData.json';
import { FiArrowRight } from 'react-icons/fi';

export default function ArticlesPage(): JSX.Element {
  return (
    <PageLayout 
      title="Spiritual Articles & Insights" 
      subtitle="Discover wisdom and guidance for your spiritual journey"
    >
      <Section>
        <div className={cn.layout.grid}>
          {articlesData.map((article) => (
            <article 
              key={article.slug} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Read more <FiArrowRight className="ml-1.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
