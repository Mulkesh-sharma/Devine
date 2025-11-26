'use client';

import React, { JSX } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { Button, SocialLink } from './ui';
import { NewsletterForm, ContactInfo, TrustBadge } from './common';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Footer(): JSX.Element {
  return (
    <footer className="relative bg-gray-900 text-amber-50/80 pt-20 overflow-hidden border-t border-orange-900/20">
      {/* Celestial Background Effects (Void Theme) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-900/40 to-transparent" />
      <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-orange-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12 pb-12">

          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block group">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-400 to-amber-200 bg-[length:200%_auto] animate-gradient inline-block">
                Devine Rituals
              </h2>
              <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full mt-2 group-hover:w-24 transition-all duration-300" />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed">
              Your trusted partner for authentic spiritual ceremonies and rituals. Connect with certified pandits for meaningful spiritual experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="#" label="Facebook" icon={<FaFacebookF />} className="!bg-black/40 !border-orange-900/30 hover:!border-orange-500 hover:!bg-orange-500" />
              <SocialLink href="#" label="Instagram" icon={<FaInstagram />} className="!bg-black/40 !border-orange-900/30 hover:!border-orange-500 hover:!bg-orange-500" />
              <SocialLink href="#" label="LinkedIn" icon={<FaLinkedinIn />} className="!bg-black/40 !border-orange-900/30 hover:!border-orange-500 hover:!bg-orange-500" />
              <SocialLink href="#" label="Twitter" icon={<FaTwitter />} className="!bg-black/40 !border-orange-900/30 hover:!border-orange-500 hover:!bg-orange-500" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-amber-100 tracking-wide">QUICK LINKS</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'All Services', href: '/services' },
                { name: 'Articles', href: '/articles' },
                { name: 'Privacy Policy', href: '/privacyPolicy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-stone-400 hover:text-orange-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-amber-100 tracking-wide">SUPPORT</h3>
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
            <h3 className="font-bold mb-6 text-lg text-amber-100 tracking-wide">STAY UPDATED</h3>
            <p className="text-stone-400 text-sm mb-6">Get latest updates on new services and spiritual insights.</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-900/20" />

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} Devine Rituals. All rights reserved.
            </p>
            <p className="text-stone-600 text-xs mt-1">
              Authentic spiritual services • Trusted pandits • Sacred ceremonies
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Contact Us'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-stone-500 hover:text-orange-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pb-12 pt-6 border-t border-orange-900/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-center text-stone-400">
            <TrustBadge icon="✓" text="Verified Pandits" />
            <TrustBadge icon="🔒" text="Secure Payments" />
            <TrustBadge icon="⭐" text="100% Authentic" />
          </div>
        </div>
      </div>
    </footer>
  );
}
