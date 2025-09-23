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
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>('/profile');
      return response;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw new Error('Failed to fetch profile');
    }
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    try {
      const response = await apiClient.put<UserProfile>('/profile', data);
      return response;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new Error('Failed to update profile');
    }
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiClient.post<{ avatarUrl: string }>('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw new Error('Failed to upload avatar');
    }
  }
}

export const profileService = new ProfileService();
