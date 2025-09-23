'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
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
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      clearError();
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      onClose(); // Close modal after successful registration
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
          🎉 Join Pikkuri
        </h2>
        <p className="text-stone-600 font-quicksand">
          Create your account to get started
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm font-quicksand">
          {error}
        </div>
      )}

      {/* Password Mismatch Error */}
      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm font-quicksand">
          Passwords do not match
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
            placeholder="Enter your full name"
          />
        </div>

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
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
            placeholder="Enter your phone number"
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
            minLength={6}
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
            placeholder="Create a password (min 6 characters)"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
            placeholder="Confirm your password"
          />
        </div>

        <div className="flex items-center">
          <input type="checkbox" required className="mr-2" />
          <span className="text-sm text-stone-600 font-quicksand">
            I agree to the{' '}
            <button type="button" className="text-stone-800 font-bold hover:text-amber-600">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-stone-800 font-bold hover:text-amber-600">
              Privacy Policy
            </button>
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || formData.password !== formData.confirmPassword}
          className="w-full px-4 py-3 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-6 text-center">
        <p className="text-stone-600 font-quicksand">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-stone-800 font-bold hover:text-amber-600 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  );

  return renderModalOverlay();
};

export default RegisterModal;
