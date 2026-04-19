import { apiClient } from './apiClient';
import {
  DashboardStatsDTO,
  SalesTrendDTO,
  ProductPerformanceDTO,
  ActivityLogDTO,
} from './api.types';

export const dashboardService = {
  /**
   * Récupère les statistiques du dashboard
   */
  getStats: async (): Promise<DashboardStatsDTO> => {
    return apiClient.get<DashboardStatsDTO>('/dashboard/stats');
  },

  /**
   * Récupère les tendances de ventes
   */
  getSalesTrends: async (months?: number): Promise<SalesTrendDTO[]> => {
    const url = `/dashboard/sales-trends${months ? `?months=${months}` : ''}`;
    return apiClient.get<SalesTrendDTO[]>(url);
  },

  /**
   * Récupère la performance des produits
   */
  getProductPerformance: async (limit?: number): Promise<ProductPerformanceDTO[]> => {
    const url = `/dashboard/product-performance${limit ? `?limit=${limit}` : ''}`;
    return apiClient.get<ProductPerformanceDTO[]>(url);
  },

  /**
   * Récupère l'activité récente
   */
  getRecentActivity: async (limit: number = 10): Promise<ActivityLogDTO[]> => {
    return apiClient.get<ActivityLogDTO[]>(`/dashboard/recent-activity?limit=${limit}`);
  },
};
