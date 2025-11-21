'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Container, Button } from '@mui/material';

function AdminPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for AuthContext to load restored data
    setTimeout(() => setLoading(false), 100);

    if (!loading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // redirecting...
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4">Admin Dashboard</Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          Logout
        </Button>
      </Box>

      <Box>
        <Typography variant="h6">
          Welcome, {user.firstName} {user.lastName}
        </Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Role: {user.role}</Typography>
      </Box>
    </Container>
  );
}

export default AdminPage;
