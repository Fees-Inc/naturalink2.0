import { apiClient } from './apiClient';
import {
  ProducerDTO,
  CreateProducerDTO,
  UpdateProducerDTO,
  PaginatedResponse,
  PaginationParams,
} from './api.types';

export const producerService = {
  /**
   * Récupère la liste des producteurs
   */
  getProducers: async (params?: PaginationParams): Promise<PaginatedResponse<ProducerDTO>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `/producers${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiClient.get<PaginatedResponse<ProducerDTO>>(url);
  },

  /**
   * Récupère un producteur par ID
   */
  getProducerById: async (id: string): Promise<ProducerDTO> => {
    return apiClient.get<ProducerDTO>(`/producers/${id}`);
  },

  /**
   * Crée un nouveau producteur
   */
  createProducer: async (data: CreateProducerDTO): Promise<ProducerDTO> => {
    return apiClient.post<ProducerDTO>('/producers', data);
  },

  /**
   * Met à jour un producteur
   */
  updateProducer: async (id: string, data: UpdateProducerDTO): Promise<ProducerDTO> => {
    return apiClient.patch<ProducerDTO>(`/producers/${id}`, data);
  },

  /**
   * Supprime un producteur
   */
  deleteProducer: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/producers/${id}`);
  },

  /**
   * Récupère les produits d'un producteur
   */
  getProducerProducts: async (producerId: string, params?: PaginationParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const url = `/producers/${producerId}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiClient.get(url);
  },

  /**
   * Récupère les statistiques d'un producteur
   */
  getProducerStats: async (producerId: string) => {
    return apiClient.get(`/producers/${producerId}/stats`);
  },
};
