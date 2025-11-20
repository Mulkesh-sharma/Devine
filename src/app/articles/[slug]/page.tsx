'use client';

import React, { JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout, Section, cn } from '../../components';
import articlesData from '../../../lib/articlesData.json';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date?: string;
  readTime?: string;
}

export default function SingleArticlePage(): JSX.Element {
  const { slug } = useParams();
  const router = useRouter();
  
  // Find the current article
  const article = (articlesData as Article[]).find((item) => item.slug === slug);
  
  // Get related articles (all articles except the current one)
  const relatedArticles = (articlesData as Article[])
    .filter(item => item.slug !== slug)
    .slice(0, 2); // Show max 2 related articles

  if (!article) {
    return (
      <PageLayout title="Article Not Found" subtitle="The requested article could not be found">
        <Section>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Articles
            </button>
          </div>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={article.title}
      subtitle={article.excerpt}
    >
      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"
            >
              <FiArrowLeft className="mr-2" />
              Back to Articles
            </button>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              {article.date && (
                <span className="flex items-center mr-4">
                  <FiCalendar className="mr-1.5" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center">
                  <FiClock className="mr-1.5" />
                  {article.readTime} min read
                </span>
              )}
            </div>
          </div>

          {/* Article Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 bg-gray-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-amber max-w-none">
            <div className="prose-p:leading-relaxed prose-p:mb-4">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link 
                    href={`/articles/${related.slug}`} 
                    key={related.slug}
                    className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="mt-3 text-sm text-amber-600 font-medium">
                        Read more →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </PageLayout>
  );
}