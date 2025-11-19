'use client';

import React, { JSX } from 'react';

interface ContactItem {
  icon: string;
  text: string;
  href?: string;
}

interface ContactInfoProps {
  items: ContactItem[];
}

export default function ContactInfo({ items }: ContactInfoProps): JSX.Element {
  return (
    <ul className="space-y-2 text-sm text-gray-300">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <span className="text-orange-400 mr-2">{item.icon}</span>
          {item.href ? (
            <a href={item.href} className="hover:text-orange-400 transition-colors">
              {item.text}
            </a>
          ) : (
            <span>{item.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
