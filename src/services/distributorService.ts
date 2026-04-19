import { apiClient } from './apiClient';
import {
  DistributorDTO,
  CreateDistributorDTO,
  PaginatedResponse,
  PaginationParams,
} from './api.types';

export const distributorService = {
  /**
   * Récupère la liste des distributeurs
   */
  getDistributors: async (params?: PaginationParams): Promise<PaginatedResponse<DistributorDTO>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `/distributors${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiClient.get<PaginatedResponse<DistributorDTO>>(url);
  },

  /**
   * Récupère un distributeur par ID
   */
  getDistributorById: async (id: string): Promise<DistributorDTO> => {
    return apiClient.get<DistributorDTO>(`/distributors/${id}`);
  },

  /**
   * Crée un nouveau distributeur
   */
  createDistributor: async (data: CreateDistributorDTO): Promise<DistributorDTO> => {
    return apiClient.post<DistributorDTO>('/distributors', data);
  },

  /**
   * Met à jour un distributeur
   */
  updateDistributor: async (id: string, data: Partial<CreateDistributorDTO>): Promise<DistributorDTO> => {
    return apiClient.patch<DistributorDTO>(`/distributors/${id}`, data);
  },

  /**
   * Supprime un distributeur
   */
  deleteDistributor: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/distributors/${id}`);
  },
};
