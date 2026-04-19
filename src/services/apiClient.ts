import axios, { AxiosInstance, AxiosError } from 'axios';
import { supabase } from '@/integrations/supabase/client';

// Configuration basée sur l'environnement
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 30000; // 30 seconds

// Types pour les erreurs
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export interface ApiError extends AxiosError<ApiErrorResponse> {}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token JWT
    this.client.interceptors.request.use(
      async (config) => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
          }
        } catch (error) {
          console.error('Error getting auth token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          // Token expiré ou invalide
          console.log('Unauthorized - clearing session');
          supabase.auth.signOut();
        }
        return Promise.reject(error);
      }
    );
  }

  // Getter pour l'instance axios
  public getInstance(): AxiosInstance {
    return this.client;
  }

  // Helper pour les requêtes GET
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Helper pour les requêtes POST
  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Helper pour les requêtes PATCH
  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  // Helper pour les requêtes PUT
  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Helper pour les requêtes DELETE
  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

// Instance unique
export const apiClient = new ApiClient();

// Export l'instance axios brute si besoin
export const api = apiClient.getInstance();
