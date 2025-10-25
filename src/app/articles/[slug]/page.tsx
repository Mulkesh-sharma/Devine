'use client';

import React , {JSX} from 'react';
import { useParams } from 'next/navigation';
import articlesData from '../../../lib/articlesData.json';
import Link from 'next/link';

export default function SingleArticlePage(): JSX.Element {
  const { slug } = useParams();
  const article = articlesData.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <img src={article.image} alt={article.title} className="w-full max-h-96 object-cover rounded mb-6"/>
        <p className="text-gray-700 leading-relaxed">{article.content}</p>
        <Link href="/articles" className="text-blue-600 hover:underline mt-6 inline-block">
          Back to Articles
        </Link>
      </div>
    </div>
  );
}
