// app/components/BookingDialog.tsx
'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import type { Service } from '../../lib/types';

type Props = {
  open: boolean;
  service?: Service | null;
  onClose: () => void;
};

export default function BookingDialog({ open, service, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    const payload = {
      serviceId: service?.id,
      serviceTitle: service?.title,
      name,
      phone,
      dateTime,
    };

    // call your API route
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess('Booking request sent! We will contact you soon.');
      setName('');
      setPhone('');
      setDateTime('');
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 1800);
    } catch (err) {
      setSuccess('Error sending booking; try again later.');
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book: {service?.title}</DialogTitle>
      <DialogContent>
        {success && <Alert severity={success.startsWith('Error') ? 'error' : 'success'}>{success}</Alert>}
        <form id="booking-form" onSubmit={handleSubmit} className="space-y-4 mt-2">
          <TextField fullWidth label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField
            fullWidth
            label="Preferred Date & Time"
            placeholder="YYYY-MM-DD HH:MM"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="booking-form" variant="contained">Send Request</Button>
      </DialogActions>
    </Dialog>
  );
}
