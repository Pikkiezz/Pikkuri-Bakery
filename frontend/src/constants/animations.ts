// Animation constants
export const ANIMATIONS = {
  // Hover effects
  hover: {
    scale: 'hover:scale-105',
    scale110: 'hover:scale-110',
    translateY: 'hover:-translate-y-2',
    translateY1: 'hover:-translate-y-1',
    shadow: 'hover:shadow-xl',
    shadow2xl: 'hover:shadow-2xl'
  },
  
  // Transitions
  transition: {
    all: 'transition-all duration-300',
    transform: 'transition-transform duration-300',
    colors: 'transition-colors duration-300',
    duration500: 'transition-all duration-500',
    duration1000: 'transition-all duration-1000'
  },
  
  // Keyframes
  keyframes: {
    float: 'animate-float',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin'
  },
  
  // Delays
  delay: {
    delay100: 'delay-100',
    delay200: 'delay-200',
    delay300: 'delay-300',
    delay500: 'delay-500',
    delay700: 'delay-700',
    delay1000: 'delay-1000'
  }
} as const;

// Custom animation styles
export const CUSTOM_ANIMATIONS = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(3deg); }
    50% { transform: translateY(-10px) rotate(-2deg); }
  }
  @keyframes float-delay-1 {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-12px) rotate(3deg); }
  }
  @keyframes float-delay-2 {
    0%, 100% { transform: translateY(0) rotate(1deg); }
    50% { transform: translateY(-8px) rotate(-1deg); }
  }
  @keyframes float-delay-3 {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delay-1 { animation: float-delay-1 7s ease-in-out infinite; }
  .animate-float-delay-2 { animation: float-delay-2 6.5s ease-in-out infinite; }
  .animate-float-delay-3 { animation: float-delay-3 7.5s ease-in-out infinite; }
`;
