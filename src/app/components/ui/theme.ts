// Theme constants for Devine Rituals
export const theme = {
  colors: {
    // Primary colors based on Footer theme
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // orange-500
      600: '#ea580c', // orange-600
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    // Gray colors for backgrounds and text
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937', // gray-800
      900: '#111827', // gray-900
    },
    // Semantic colors
    white: '#ffffff',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
  },
  
  gradients: {
    primary: 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600',
    dark: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900',
    card: 'bg-gradient-to-br from-gray-800 to-gray-900',
  },
  
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    glow: 'shadow-lg shadow-orange-500/20',
  },
  
  transitions: {
    default: 'transition-all duration-300',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-300',
  },
  
  borderRadius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  
  spacing: {
    container: 'container mx-auto px-6',
    section: 'py-12',
    card: 'p-6',
    button: 'px-6 py-3',
    input: 'px-4 py-2',
  },
} as const;

// Tailwind class combinations for common patterns
export const cn = {
  // Button variants
  button: {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors',
    outline: 'border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold rounded-lg transition-colors',
    ghost: 'text-orange-400 hover:text-orange-300 hover:bg-gray-800 font-semibold rounded-lg transition-colors',
  },
  
  // Card styles
  card: {
    default: 'bg-gray-800 border border-gray-700 rounded-lg shadow-lg',
    hover: 'hover:bg-gray-750 hover:shadow-xl transition-all duration-300',
    interactive: 'cursor-pointer hover:border-orange-500 transition-colors',
  },
  
  // Input styles
  input: {
    default: 'bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors',
    error: 'border-red-500 focus:ring-red-400',
  },
  
  // Text styles
  text: {
    heading: 'font-bold text-orange-400',
    subheading: 'font-semibold text-lg text-orange-400',
    body: 'text-gray-300',
    muted: 'text-gray-400',
    link: 'text-gray-300 hover:text-orange-400 transition-colors',
  },
  
  // Layout styles
  layout: {
    section: 'py-12',
    container: 'container mx-auto px-6',
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
    flexCenter: 'flex items-center justify-center',
  },
  
  gradients: {
    primary: 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600',
    dark: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900',
    card: 'bg-gradient-to-br from-gray-800 to-gray-900',
  },
} as const;
