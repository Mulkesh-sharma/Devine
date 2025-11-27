'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, Section, Button } from '../components';
import { useAuth } from '../context/AuthContext';
import type { Booking } from '../../lib/types';
import { FiCalendar, FiClock, FiEye, FiCheck, FiX, FiUser } from 'react-icons/fi';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function UserBookingsPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated === false) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchBookings();
    }
  }, [isAuthenticated, user, authLoading]);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/users/me/bookings?userId=${user._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setBookings(data.data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'refunded': return 'default';
      default: return 'primary';
    }
  };

  return (
    <PageLayout title="My Bookings" subtitle="View your booking history and status">
      <Section>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                <tr>
                  <th className="p-4 font-semibold text-gray-400 dark:text-gray-300">Date & Time</th>
                  <th className="p-4 font-semibold text-gray-400 dark:text-gray-300">Service</th>
                  <th className="p-4 font-semibold text-gray-400 dark:text-gray-300">Status</th>
                  <th className="p-4 font-semibold text-gray-400 dark:text-gray-300">Amount</th>
                  <th className="p-4 font-semibold text-gray-400 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      You haven't made any bookings yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-200 dark:text-white">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-400">{booking.bookingTime}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300 dark:text-gray-300">
                        {booking.service.title}
                      </td>
                      <td className="p-4">
                        <Chip 
                          label={booking.status} 
                          color={getStatusColor(booking.status) as any} 
                          size="small" 
                          className="capitalize"
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-200 dark:text-white">
                        ₹{booking.pricing.totalPrice}
                      </td>
                      <td className="p-4">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setDetailsOpen(true);
                          }}
                          className="!p-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Details Dialog */}
        <Dialog 
          open={detailsOpen} 
          onClose={() => setDetailsOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            className: "bg-gray-900 border border-orange-500/20 text-amber-50"
          }}
        >
          <DialogTitle className="bg-gray-900/50 border-b border-orange-500/20 backdrop-blur-xl">
            <Typography variant="h6" className="text-amber-50 font-bold flex items-center gap-2">
              <span className="text-orange-500">✨</span> Booking Details
            </Typography>
          </DialogTitle>
          <DialogContent className="bg-gray-900 pt-6">
            {selectedBooking && (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" className="text-orange-400/80 uppercase text-xs font-bold mb-2 mt-3 tracking-wider">Service Info</Typography>
                  <Typography variant="body1" className="font-bold mb-1 text-amber-50 text-lg">{selectedBooking.service.title}</Typography>
                  <Typography variant="body2" className="text-gray-400 flex items-center gap-2">
                    <FiCalendar className="text-orange-500" />
                    {new Date(selectedBooking.bookingDate).toLocaleDateString()} 
                    <span className="text-gray-600">|</span>
                    <FiClock className="text-orange-500" />
                    {selectedBooking.bookingTime}
                  </Typography>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" className="text-orange-400/80 uppercase text-xs font-bold mb-2 mt-3 tracking-wider">Status</Typography>
                  <Chip 
                    label={selectedBooking.status} 
                    color={getStatusColor(selectedBooking.status) as any} 
                    className="capitalize font-bold"
                    variant="outlined"
                    sx={{ 
                      borderColor: 'rgba(249, 115, 22, 0.5)', 
                      color: '#fff',
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}><Divider className="border-gray-800" /></Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" className="text-orange-400/80 uppercase text-xs font-bold mb-2 tracking-wider">Contact Details</Typography>
                  <div className="space-y-2">
                    <Typography variant="body2" className="text-gray-300 flex items-center gap-2">
                      <FiUser className="text-orange-500/70" /> 
                      <span className="text-amber-50">{selectedBooking.contactPerson.name}</span>
                    </Typography>
                    <Typography variant="body2" className="text-gray-300 flex items-center gap-2">
                      <span className="text-orange-500/70">📞</span>
                      {selectedBooking.contactPerson.phone}
                    </Typography>
                    <Typography variant="body2" className="text-gray-300 flex items-center gap-2">
                      <span className="text-orange-500/70">✉️</span>
                      {selectedBooking.contactPerson.email || 'N/A'}
                    </Typography>
                  </div>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" className="text-orange-400/80 uppercase text-xs font-bold mb-2 tracking-wider">Location</Typography>
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                    <Typography variant="body2" className="text-amber-50 font-medium">{selectedBooking.address.street}</Typography>
                    <Typography variant="body2" className="text-gray-400 mt-1">
                      {selectedBooking.address.city}, {selectedBooking.address.state} - {selectedBooking.address.pincode}
                    </Typography>
                    {selectedBooking.address.landmark && (
                      <Typography variant="body2" className="text-orange-400/60 mt-2 text-xs uppercase font-bold tracking-wide">
                        Near {selectedBooking.address.landmark}
                      </Typography>
                    )}
                  </div>
                </Grid>

                <Grid size={{ xs: 12 }}><Divider className="border-gray-800" /></Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" className="text-orange-400/80 uppercase text-xs font-bold mb-2 tracking-wider">Pooja Details</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
                      <Typography variant="caption" className="text-gray-500 block mb-1">Number of People</Typography>
                      <Typography variant="body1" className="text-amber-50 font-medium">{selectedBooking.poojaDetails.numberOfPeople}</Typography>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
                      <Typography variant="caption" className="text-gray-500 block mb-1">Materials Provided</Typography>
                      <Typography variant="body1" className="text-amber-50 font-medium">
                        {selectedBooking.poojaDetails.materialsProvided ? (
                          <span className="flex items-center gap-2 text-green-400"><FiCheck /> Yes</span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-400"><FiX /> No</span>
                        )}
                      </Typography>
                    </div>
                  </div>
                  {selectedBooking.poojaDetails.specialInstructions && (
                    <div className="mt-4 p-4 bg-orange-900/10 border border-orange-500/10 rounded-lg">
                      <Typography variant="caption" className="text-orange-400 block mb-1 font-bold">Special Instructions</Typography>
                      <Typography variant="body2" className="text-amber-100/80 italic">
                        "{selectedBooking.poojaDetails.specialInstructions}"
                      </Typography>
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions className="bg-gray-900 border-t border-gray-800 p-4">
            <Button 
              onClick={() => setDetailsOpen(false)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Section>
    </PageLayout>
  );
}
