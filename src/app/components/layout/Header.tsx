'use client';

import React, { JSX } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

const MistText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-2">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.8,
                delay: delay + i * 0.1 + j * 0.03,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default function Header({ title, subtitle, showLogo = true }: HeaderProps): JSX.Element {
  return (
    <motion.header 
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Mist Effect */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" className="text-3xl font-bold text-white hover:text-amber-200 transition-colors inline-block mb-6 tracking-tight">
              Devine Rituals
            </Link>
          </motion.div>
        )}
        
        {title && (
          <MistText 
            text={title} 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight" 
            delay={0.2}
          />
        )}
        
        {subtitle && (
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.header>
  );
}
