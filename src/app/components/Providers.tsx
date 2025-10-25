// app/components/Providers.tsx
'use client';

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../../lib/createEmotionCache';
import { AuthProvider } from '../context/AuthContext';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    primary: { main: '#f97316' }, // orange
    secondary: { main: '#f59e0b' }, // amber
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
