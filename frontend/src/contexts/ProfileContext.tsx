'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { profileService, UserProfile, UpdateProfileRequest } from '@/services/profileService';

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load profile on mount
  useEffect(() => {
    refreshProfile();
  }, []);

  // Refresh profile from API
  const refreshProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      console.error('Failed to refresh profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProfile = await profileService.updateProfile(data);
      setProfile(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Failed to update profile:', err);
      throw err; // Re-throw to handle in component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      isLoading,
      error,
      updateProfile,
      refreshProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
