'use client';

import React from 'react';
import Link from 'next/link';
import { PageLayout, Section } from '../components';

export default function AboutPage() {
  return (
    <PageLayout title="About Us">
      <Section>
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to Pandit Booking, your trusted platform for connecting with experienced and verified panditjis for all your religious ceremonies and spiritual needs. We understand the importance of your spiritual journey and are committed to making it seamless and meaningful.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to bridge the gap between devotees and learned panditjis, making it simple and convenient to find the right priest for your important life moments. We ensure that every ceremony is conducted with the utmost devotion and authenticity.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-amber-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified and experienced panditjis</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-amber-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Easy online booking system</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-amber-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Transparent pricing with no hidden charges</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-amber-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 customer support</span>
              </li>
            </ul>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link 
                href="/" 
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
