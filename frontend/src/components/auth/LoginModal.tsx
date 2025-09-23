'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) clearError();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      onClose(); // Close modal after successful login
    } catch (err) {
      // Error is handled by context
    }
  };

  // Render modal overlay
  const renderModalOverlay = () => (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalContent()}
      </div>
    </div>
  );

  // Render modal content
  const renderModalContent = () => (
    <>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-2 font-fredoka">
          🔐 Welcome Back
        </h2>
        <p className="text-stone-600 font-quicksand">
          Sign in to your account
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm font-quicksand">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-stone-600 font-quicksand">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-stone-600 hover:text-stone-800 font-quicksand"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 text-center">
        <p className="text-stone-600 font-quicksand">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-stone-800 font-bold hover:text-amber-600 transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  );

  return renderModalOverlay();
};

export default LoginModal;
