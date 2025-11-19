// app/components/Footer.tsx
'use client';

import React, { JSX } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { Button, SocialLink } from './ui';
import { NewsletterForm, ContactInfo, TrustBadge } from './common';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-12">
      {/* Top Section */}
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8">

        {/* Company Info */}
        <div>
          <Link href="/" className="text-2xl font-bold text-orange-400 mb-3 inline-block">
            Devine Rituals
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Your trusted partner for authentic spiritual ceremonies and rituals. Connect with certified pandits for meaningful spiritual experiences.
          </p>
          <div className="flex space-x-4">
            <SocialLink href="#" label="Facebook" icon={<FaFacebookF className="text-white" />} />
            <SocialLink href="#" label="Instagram" icon={<FaInstagram className="text-white" />} />
            <SocialLink href="#" label="LinkedIn" icon={<FaLinkedinIn className="text-white" />} />
            <SocialLink href="#" label="Twitter" icon={<FaTwitter className="text-white" />} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-lg text-orange-400">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</Link></li>
            <li><Link href="/services" className="text-gray-300 hover:text-orange-400 transition-colors">All Services</Link></li>
            <li><Link href="/articles" className="text-gray-300 hover:text-orange-400 transition-colors">Articles</Link></li>
            <li><Link href="/privacyPolicy" className="text-gray-300 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold mb-4 text-lg text-orange-400">SUPPORT</h3>
          <ContactInfo 
            items={[
              { icon: '📧', text: 'info@devinerituals.com', href: 'mailto:info@devinerituals.com' },
              { icon: '📞', text: '+91 88065 88064', href: 'tel:+918806588064' },
              { icon: '🕒', text: '24/7 Support Available' },
            ]}
          />
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-lg text-orange-400">STAY UPDATED</h3>
          <p className="text-gray-300 text-sm mb-4">Get latest updates on new services and spiritual insights.</p>
          <NewsletterForm />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mx-6"></div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Devine Rituals. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Authentic spiritual services • Trusted pandits • Sacred ceremonies
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <Link href="/privacyPolicy" className="text-gray-400 hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              Refund Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
            <TrustBadge icon="✓" text="Verified Pandits" />
            <TrustBadge icon="🔒" text="Secure Payments" />
            <TrustBadge icon="⭐" text="100% Authentic" />
          </div>
        </div>
      </div>
    </footer>
  );
}
