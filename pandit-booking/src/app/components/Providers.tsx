// app/components/Providers.tsx
'use client';

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../../lib/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    primary: { main: '#0ea5a4' }, // teal-ish
    secondary: { main: '#f97316' }, // orange
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
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
