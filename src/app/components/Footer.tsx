// app/components/Footer.tsx
'use client';

import React, { JSX } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

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
            <a href="#" aria-label="Facebook" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <FaLinkedinIn className="text-white" />
            </a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <FaTwitter className="text-white" />
            </a>
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
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <span className="text-orange-400 mr-2">📧</span>
              <a href="mailto:info@devinerituals.com" className="hover:text-orange-400 transition-colors">
                info@devinerituals.com
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-orange-400 mr-2">📞</span>
              <a href="tel:+918806588064" className="hover:text-orange-400 transition-colors">
                +91 88065 88064
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-orange-400 mr-2">🕒</span>
              <span>24/7 Support Available</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-lg text-orange-400">STAY UPDATED</h3>
          <p className="text-gray-300 text-sm mb-4">Get latest updates on new services and spiritual insights.</p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-300 text-sm">Verified Pandits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔒</span>
              </div>
              <span className="text-gray-300 text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⭐</span>
              </div>
              <span className="text-gray-300 text-sm">100% Authentic</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
