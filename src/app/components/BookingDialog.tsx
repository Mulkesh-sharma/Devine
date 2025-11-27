'use client';

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useAuth } from '../context/AuthContext';
import type { Service } from '../../lib/types';

type Props = {
  open: boolean;
  service?: Service | null;
  onClose: () => void;
};

export default function BookingDialog({ open, service, onClose }: Props) {
  const { user, token } = useAuth();
  
  // Form State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const [contactPerson, setContactPerson] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [poojaDetails, setPoojaDetails] = useState({
    numberOfPeople: 1,
    specialInstructions: '',
    preferredPandit: '',
    materialsProvided: false
  });

  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill user details if available
  useEffect(() => {
    if (user && open) {
      setContactPerson(prev => ({
        ...prev,
        name: `${user.firstName} ${user.lastName}` || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user, open]);

  const handleAddressChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [field]: e.target.value });
  };

  const handleContactChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactPerson({ ...contactPerson, [field]: e.target.value });
  };

  const handlePoojaChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoojaDetails({ ...poojaDetails, [field]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!service) return;

    console.log('Booking - Token:', token ? 'Present' : 'Missing');
    if (!token) {
      setError('You must be logged in to book a service.');
      setLoading(false);
      return;
    }

    // Basic Validation
    if (!bookingDate || !bookingTime || !address.street || !address.city || !address.state || !address.pincode || !contactPerson.name || !contactPerson.phone) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const payload = {
      service: service.id,
      bookingDate,
      bookingTime,
      address,
      contactPerson,
      poojaDetails: {
        ...poojaDetails,
        numberOfPeople: Number(poojaDetails.numberOfPeople)
      },
      pricing: {
        basePrice: service.priceINR,
        additionalCharges: 0,
        totalPrice: service.priceINR, // Backend will recalculate, but sending for reference
        paymentMethod
      }
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      setSuccess('Booking request sent successfully! We will contact you shortly.');
      
      // Reset form after delay
      setTimeout(() => {
        onClose();
        setSuccess(null);
        // Optional: Reset form fields here if needed
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while booking.');
    } finally {
      setLoading(false);
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingTime(e.target.value);
    // Auto-close (blur) after selection if valid time
    if (e.target.value) {
      e.target.blur();
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.1)', // Lighter border
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f97316', // Orange-500
      },
      backgroundColor: '#111827', // Solid gray-900
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #111827 inset !important',
        WebkitTextFillColor: 'rgba(255, 255, 255, 0.9) !important',
        caretColor: 'white',
        borderRadius: 'inherit',
      },
      '& input::-webkit-calendar-picker-indicator': {
        filter: 'invert(1)', // Make icon white
        cursor: 'pointer',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.5)', // Lighter label/placeholder
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#f97316',
    },
    '& .MuiInputBase-input': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#111827', // gray-900
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
        }
      }}
    >
      <DialogTitle className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <Typography variant="h6" component="div" className="text-amber-50 font-medium">
          Book Service: <span className="text-orange-500">{service?.title}</span>
        </Typography>
      </DialogTitle>
      
      <DialogContent className="bg-gray-900 pt-6">
        {success && <Alert severity="success" className="mb-4 bg-green-900/20 text-green-200 border border-green-900/50">{success}</Alert>}
        {error && <Alert severity="error" className="mb-4 bg-red-900/20 text-red-200 border border-red-900/50">{error}</Alert>}
        
        <form id="booking-form" onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-6">
            {/* Schedule */}
            <div>
              <Typography variant="subtitle1" className="font-medium text-orange-400/80 mb-3 text-sm uppercase tracking-wider">
                Schedule
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    InputLabelProps={{ shrink: true }}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Time"
                    InputLabelProps={{ shrink: true }}
                    value={bookingTime}
                    onChange={handleTimeChange}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider className="border-gray-800" />

            {/* Address */}
            <div>
              <Typography variant="subtitle1" className="font-medium text-orange-400/80 mb-3 text-sm uppercase tracking-wider">
                Pooja Location
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={address.street}
                    onChange={handleAddressChange('street')}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="City"
                    value={address.city}
                    onChange={handleAddressChange('city')}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="State"
                    value={address.state}
                    onChange={handleAddressChange('state')}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={address.pincode}
                    onChange={handleAddressChange('pincode')}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Landmark (Optional)"
                    value={address.landmark}
                    onChange={handleAddressChange('landmark')}
                    sx={textFieldStyle}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider className="border-gray-800" />

            {/* Contact Person */}
            <div>
              <Typography variant="subtitle1" className="font-medium text-orange-400/80 mb-3 text-sm uppercase tracking-wider">
                Contact Details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={contactPerson.name}
                    onChange={handleContactChange('name')}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={contactPerson.phone}
                    onChange={handleContactChange('phone')}
                    required
                    sx={textFieldStyle}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email (Optional)"
                    value={contactPerson.email}
                    onChange={handleContactChange('email')}
                    sx={textFieldStyle}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider className="border-gray-800" />

            {/* Payment Details */}
            <div>
              <Typography variant="subtitle1" className="font-medium text-orange-400/80 mb-3 text-sm uppercase tracking-wider">
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    select
                    label="Payment Method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    sx={textFieldStyle}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="upi">UPI</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </DialogContent>
      
      <DialogActions className="p-6 bg-gray-900 border-t border-gray-800">
        <Button 
          onClick={onClose} 
          className="text-amber-200/60 hover:text-amber-50 hover:bg-orange-500/10"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          form="booking-form" 
          variant="contained" 
          disabled={loading}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-2 rounded-lg shadow-lg shadow-orange-900/20"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
