'use client';

import React, { JSX } from 'react';
import Link from 'next/link';
import articlesData from '../../lib/articlesData.json';

export default function ArticlesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Articles</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {articlesData.map((article) => (
            <div key={article.slug} className="bg-white shadow-md rounded overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Link href={`/articles/${article.slug}`} className="text-blue-600 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
