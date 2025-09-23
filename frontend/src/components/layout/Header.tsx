'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFilter } from '@/contexts/FilterContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProfileModal from '@/components/profile/ProfileModal';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const pathname = usePathname();
  const { filters, setSearchQuery } = useFilter();
  const { state: cartState } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already handled by FilterContext
    // This function can be used for additional search logic if needed
    console.log('Search submitted:', filters.searchQuery);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle profile dropdown toggle
  const handleProfileToggle = () => {
    console.log('Profile toggle clicked, current state:', isProfileOpen);
    setIsProfileOpen(!isProfileOpen);
  };

  // Handle profile dropdown close
  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  // Handle profile modal
  const handleProfileClick = () => {
    setIsProfileOpen(false);
    setIsProfileModalOpen(true);
  };

  // Handle login
  const handleLogin = () => {
    setIsProfileOpen(false);
    setIsLoginModalOpen(true);
  };

  // Handle register
  const handleRegister = () => {
    setIsProfileOpen(false);
    setIsRegisterModalOpen(true);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <header className="relative bg-gradient-to-r from-stone-100 via-amber-50 to-stone-200 h-20 shadow-lg border-b border-stone-200">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-10 w-3 h-3 bg-stone-300 rounded-full animate-bounce"></div>
        <div className="absolute top-4 right-20 w-2 h-2 bg-amber-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-1/4 w-4 h-4 bg-stone-200 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-6 right-1/3 w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-4xl mr-3">☕</div>
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 font-fredoka">
              Pikkuri
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-110 rounded-full font-quicksand ${
                pathname === '/' 
                  ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                  : 'text-stone-700 hover:text-stone-600 bg-stone-200/50'
              }`}
            >
              🏠 HOME
            </Link>
            <Link 
              href="/menu" 
              className={`px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-110 rounded-full font-quicksand ${
                pathname === '/menu' 
                  ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                  : 'text-stone-700 hover:text-stone-600 bg-stone-200/50'
              }`}
            >
              🥐 MENU
            </Link>
            <Link 
              href="/orders" 
              className={`px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-110 rounded-full font-quicksand ${
                pathname === '/orders' 
                  ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                  : 'text-stone-700 hover:text-stone-600 bg-stone-200/50'
              }`}
            >
              📦 ORDERS
            </Link>
           

            <a 
              href="#contact" 
              className="px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-110 rounded-full font-quicksand text-stone-700 hover:text-stone-600 bg-stone-200/50"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              📞 CONTACT
            </a>

            
          </nav>

          {/* Right side - Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search bakery items..."
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                  className="w-68 pl-10 pr-4 py-2 border-2 border-stone-300 rounded-full focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-stone-100/50 backdrop-blur-sm text-stone-700 placeholder-stone-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {filters.searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </form>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-3 text-stone-700 hover:text-stone-600 bg-stone-200/50 rounded-full hover:bg-stone-200/70 transition-all duration-300 hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-stone-600 to-amber-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {cartState.itemCount}
              </span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={handleProfileToggle}
                className="relative p-3 text-stone-700 hover:text-stone-600 bg-stone-200/50 rounded-full hover:bg-stone-200/70 transition-all duration-300 hover:scale-110"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-stone-200/50 py-2 z-[9999]">
                  {isAuthenticated ? (
                    // Authenticated user menu
                    <>
                      <div className="px-4 py-2 border-b border-stone-200">
                        <p className="text-sm font-bold text-stone-800 font-fredoka">{user?.name}</p>
                        <p className="text-xs text-stone-600 font-quicksand">{user?.email}</p>
                      </div>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-100 transition-colors font-quicksand"
                        onClick={handleProfileClick}
                      >
                        👤 My Profile
                      </button>
                      <Link
                        href="/orders"
                        className="block px-4 py-3 text-sm text-stone-700 hover:bg-stone-100 transition-colors font-quicksand"
                        onClick={handleProfileClose}
                      >
                        📦 My Orders
                      </Link>
                      <hr className="my-2 border-stone-200" />
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-quicksand"
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>
                    </>
                  ) : (
                    // Guest user menu
                    <>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-100 transition-colors font-quicksand"
                        onClick={handleLogin}
                      >
                        🔐 Sign In
                      </button>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-stone-100 transition-colors font-quicksand"
                        onClick={handleRegister}
                      >
                        🎉 Sign Up
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>






            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-stone-700 hover:text-stone-600 bg-stone-200/50 rounded-full hover:bg-stone-200/70 transition-all duration-300 hover:scale-110"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-stone-50/90 backdrop-blur-sm rounded-2xl mt-2 shadow-lg">
              <Link 
                href="/" 
                className={`block px-4 py-3 text-base font-bold transition-colors rounded-xl ${
                  pathname === '/' 
                    ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                    : 'text-stone-700 hover:text-stone-600 hover:bg-stone-100'
                }`}
              >
                🏠 HOME
              </Link>
              <Link 
                href="/menu" 
                className={`block px-4 py-3 text-base font-bold transition-colors rounded-xl ${
                  pathname === '/menu' 
                    ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                    : 'text-stone-700 hover:text-stone-600 hover:bg-stone-100'
                }`}
              >
                🥐 MENU
              </Link>
              <Link 
                href="/orders" 
                className={`block px-4 py-3 text-base font-bold transition-colors rounded-xl ${
                  pathname === '/orders' 
                    ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                    : 'text-stone-700 hover:text-stone-600 hover:bg-stone-100'
                }`}
              >
                📦 ORDERS
              </Link>
              <Link 
                href="/about" 
                className={`block px-4 py-3 text-base font-bold transition-colors rounded-xl ${
                  pathname === '/about' 
                    ? 'text-white bg-gradient-to-r from-stone-600 to-amber-600 shadow-lg' 
                    : 'text-stone-700 hover:text-stone-600 hover:bg-stone-100'
                }`}
              >
                📖 OUR STORY
              </Link>
              <a 
                href="#contact" 
                className="block px-4 py-3 text-base font-bold transition-colors rounded-xl text-stone-700 hover:text-stone-600 hover:bg-stone-100"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false); // Close mobile menu
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                📞 CONTACT
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </header>
  );
};

export default Header;
