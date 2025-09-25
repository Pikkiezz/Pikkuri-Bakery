import { apiClient, API_CONFIG } from '@/config/api';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone: string;
}

export class ProfileService {
  // Mock data for development - TODO: Replace with real API calls
  private mockProfile: UserProfile = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  async getProfile(): Promise<UserProfile> {
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await apiClient.get<UserProfile>(API_CONFIG.ENDPOINTS.USERS.PROFILE);
      // return response;
      
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => resolve(this.mockProfile), 500);
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw new Error('Failed to fetch profile');
    }
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await apiClient.put<UserProfile>(API_CONFIG.ENDPOINTS.USERS.PROFILE, data);
      // return response;
      
      // Mock implementation
      this.mockProfile = { ...this.mockProfile, ...data, updatedAt: new Date().toISOString() };
      return new Promise((resolve) => {
        setTimeout(() => resolve(this.mockProfile), 500);
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new Error('Failed to update profile');
    }
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    try {
      // TODO: Replace with real API call when backend is ready
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await apiClient.post<{ avatarUrl: string }>(API_CONFIG.ENDPOINTS.USERS.AVATAR, formData);
      // return response;
      
      // Mock implementation
      const mockAvatarUrl = `/api/placeholder/100/100?t=${Date.now()}`;
      return new Promise((resolve) => {
        setTimeout(() => resolve({ avatarUrl: mockAvatarUrl }), 1000);
      });
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw new Error('Failed to upload avatar');
    }
  }
}

export const profileService = new ProfileService();
