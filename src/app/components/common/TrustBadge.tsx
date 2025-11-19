'use client';

import React, { JSX } from 'react';

interface TrustBadgeProps {
  icon: string;
  text: string;
}

export default function TrustBadge({ icon, text }: TrustBadgeProps): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm">{icon}</span>
      </div>
      <span className="text-gray-300 text-sm">{text}</span>
    </div>
  );
}
