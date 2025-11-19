'use client';

import React, { useState, JSX } from 'react';
import { Input, Button } from '../ui';

export default function NewsletterForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage('Thank you for subscribing!');
    setEmail('');
    setIsSubmitting(false);
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="text-gray-800"
      />
      <Button 
        type="submit" 
        size="sm" 
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        SUBSCRIBE
      </Button>
      {message && (
        <p className="text-sm text-green-400">{message}</p>
      )}
    </form>
  );
}
