// Theme constants
export const THEME = {
  colors: {
    primary: {
      50: 'from-stone-50 to-amber-50',
      100: 'from-stone-100 to-amber-100',
      200: 'from-stone-200 to-amber-200',
      300: 'from-stone-300 to-amber-300',
      400: 'from-stone-400 to-amber-400',
      500: 'from-stone-500 to-amber-500',
      600: 'from-stone-600 to-amber-600',
      700: 'from-stone-700 to-amber-700',
      800: 'from-stone-800 to-amber-800',
      900: 'from-stone-900 to-amber-900'
    },
    background: {
      light: 'bg-stone-50',
      medium: 'bg-stone-100',
      dark: 'bg-stone-200'
    },
    text: {
      primary: 'text-stone-700',
      secondary: 'text-stone-600',
      muted: 'text-stone-500',
      light: 'text-stone-400'
    }
  },
  spacing: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  },
  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full'
  },
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  }
} as const;
