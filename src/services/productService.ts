import { apiClient } from './apiClient';
import {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
  PaginatedResponse,
  PaginationParams,
} from './api.types';

export const productService = {
  /**
   * Récupère la liste des produits
   */
  getProducts: async (params?: PaginationParams & { producer_id?: string; status?: string }): Promise<PaginatedResponse<ProductDTO>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.producer_id) queryParams.append('producer_id', params.producer_id);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return apiClient.get<PaginatedResponse<ProductDTO>>(url);
  },

  /**
   * Récupère un produit par ID
   */
  getProductById: async (id: string): Promise<ProductDTO> => {
    return apiClient.get<ProductDTO>(`/products/${id}`);
  },

  /**
   * Crée un nouveau produit
   */
  createProduct: async (data: CreateProductDTO): Promise<ProductDTO> => {
    return apiClient.post<ProductDTO>('/products', data);
  },

  /**
   * Met à jour un produit
   */
  updateProduct: async (id: string, data: UpdateProductDTO): Promise<ProductDTO> => {
    return apiClient.patch<ProductDTO>(`/products/${id}`, data);
  },

  /**
   * Supprime un produit
   */
  deleteProduct: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/products/${id}`);
  },

  /**
   * Récupère la traçabilité complète d'un produit
   */
  getProductTraceability: async (id: string) => {
    return apiClient.get(`/products/${id}/traceability`);
  },

  /**
   * Récupère un produit par NFC tag ID
   */
  getProductByNFCTag: async (nfcTagId: string) => {
    return apiClient.get<ProductDTO>(`/products/nfc/${nfcTagId}`);
  },
};
