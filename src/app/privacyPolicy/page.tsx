'use client';

import React from 'react';
import Link from 'next/link';
import { PageLayout, Section } from '../components';

export default function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <Section>
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform to book panditjis for your religious ceremonies and spiritual needs.
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700">
                  We collect information that helps us provide and improve our services, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>Personal details (name, email, phone number)</li>
                  <li>Booking and service preferences</li>
                  <li>Payment and transaction information</li>
                  <li>Communication preferences and history</li>
                  <li>Device and usage information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700">
                  Your information helps us to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>Process and manage your bookings</li>
                  <li>Provide customer support and service updates</li>
                  <li>Improve our platform and services</li>
                  <li>Send important notifications and updates</li>
                  <li>Ensure the security and integrity of our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Protection & Security</h2>
                <p className="text-gray-700">
                  We implement robust security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>Secure data encryption for all sensitive information</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                  <li>Secure payment processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Your Rights & Choices</h2>
                <p className="text-gray-700">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to your data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Policy Updates</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy periodically to reflect changes in our practices. We will notify you of any significant changes by posting the new policy on this page and updating the effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-2">
                  <a href="mailto:privacy@panditbooking.com" className="text-amber-600 hover:text-amber-700 font-medium">
                    privacy@panditbooking.com
                  </a>
                </p>
              </section>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
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
        </div>
      </Section>
    </PageLayout>
  );
}
