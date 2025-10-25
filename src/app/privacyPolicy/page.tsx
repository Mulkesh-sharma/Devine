// app/pages/privacy-policy.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy(): JSX.Element {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address, phone number, and payment information when you use our services or subscribe to updates.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">
          Your information is used to provide and improve our services, communicate with you, process payments, and send you updates about our offerings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Data Sharing & Security</h2>
        <p className="mb-4">
          We do not sell your personal information. We may share information with trusted service providers to help us operate our website and services. We implement security measures to protect your data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Cookies</h2>
        <p className="mb-4">
          Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. For any requests, contact us at <a href="mailto:info@panditbooking.com" className="text-blue-600 underline">info@panditbooking.com</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Changes to this Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the revised date.
        </p>

        <p className="mt-8 text-sm text-gray-600">
          COPYRIGHT © {new Date().getFullYear()} PANDIT BOOKING | ALL RIGHTS RESERVED.
        </p>

        <Link href="/" className="text-blue-600 hover:underline mt-6 inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
