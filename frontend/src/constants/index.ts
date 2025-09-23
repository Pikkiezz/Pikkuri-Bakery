// App constants
export const APP_NAME = 'Pikkuri';
export const APP_DESCRIPTION = 'Premium Bakery & Coffee Shop';

// Colors
export const COLORS = {
  primary: 'from-stone-600 to-amber-600',
  secondary: 'from-amber-500 to-orange-500',
  background: 'from-stone-50 via-amber-50 to-stone-100',
  card: 'bg-white/80',
  text: {
    primary: 'text-stone-700',
    secondary: 'text-stone-600',
    muted: 'text-stone-500'
  }
} as const;

// Animations
export const ANIMATIONS = {
  hover: 'hover:scale-105 transition-transform duration-300',
  float: 'animate-float',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse'
} as const;

// Layout
export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  padding: 'px-4 sm:px-6 lg:px-8',
  sectionPadding: 'py-20'
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:'
} as const;

// Grid
export const GRID = {
  products: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
  categories: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
  menuItems: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
} as const;

// Button styles
export const BUTTON_STYLES = {
  primary: 'bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2',
  secondary: 'bg-white text-stone-700 font-bold rounded-full border-2 border-stone-300 hover:border-stone-500 transition-all duration-300 hover:scale-110 hover:shadow-xl',
  filter: 'px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105',
  addToCart: 'w-full bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg'
} as const;

// Card styles
export const CARD_STYLES = {
  product: 'bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 border border-stone-200/50',
  menuItem: 'bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-stone-200',
  category: 'group relative overflow-hidden p-4 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105'
} as const;

// Typography
export const TYPOGRAPHY = {
  heading: 'font-fredoka',
  body: 'font-quicksand',
  button: 'font-poppins'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  menu: '/api/menu',
  cart: '/api/cart'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  cart: 'pikkuri_cart',
  user: 'pikkuri_user',
  theme: 'pikkuri_theme'
} as const;
