'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/ProfileContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone
      });
    }
  }, [profile]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);
      await updateProfile(formData);
      onClose(); // Close modal after successful save
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  // Render modal overlay
  const renderModalOverlay = () => (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800 font-fredoka">
          👤 My Profile
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {isLoading ? renderLoadingState() : renderProfileTab()}
      </div>
    </>
  );

  // Render loading state
  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h3 className="text-xl font-bold text-stone-700 mb-2 font-fredoka">Loading profile...</h3>
        <p className="text-stone-600 font-quicksand">Please wait while we fetch your data</p>
      </div>
    </div>
  );

  // Render profile tab
  const renderProfileTab = () => (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm font-quicksand">
          {error}
        </div>
      )}

      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-stone-200 to-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">👤</span>
        </div>
        <h3 className="text-xl font-bold text-stone-800 font-fredoka">{profile?.name || 'Loading...'}</h3>
        <p className="text-stone-600 font-quicksand">{profile?.email || 'Loading...'}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
          />
        </div>
      </div>

      {saveError && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm font-quicksand">
          {saveError}
        </div>
      )}

      <div className="flex space-x-3">
        <button 
          onClick={() => {
            if (!isSaving) {
              handleSave();
            }
            onClose();
          }}
          disabled={isSaving}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-3 border-2 border-stone-300 text-stone-700 font-bold rounded-xl transition-all duration-300 hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );


  return renderModalOverlay();
};

export default ProfileModal;
