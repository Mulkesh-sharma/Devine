'use client';

import React, { JSX } from 'react';
import { cn } from './theme';

interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label: string;
}

export default function SocialLink({
  icon,
  label,
  className = '',
  ...props
}: SocialLinkProps): JSX.Element {
  return (
    <a
      className={`w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </a>
  );
}
