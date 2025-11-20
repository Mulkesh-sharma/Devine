'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Container, Button } from '@mui/material';

function AdminPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
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
        <Typography variant="h6" gutterBottom>
          Welcome, {user.firstName} {user.lastName}!
        </Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Role: {user.role}</Typography>
        
        {/* Add your admin components here */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Admin Features
          </Typography>
          <Box display="flex" gap={2} mt={2}>
            <Button variant="contained" color="primary">
              Manage Users
            </Button>
            <Button variant="contained" color="primary">
              Manage Services
            </Button>
            <Button variant="contained" color="primary">
              View Reports
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminPage;