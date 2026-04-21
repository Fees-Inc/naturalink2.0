import { apiClient } from './apiClient';
import {
  DashboardStatsDTO,
  SalesTrendDTO,
  ProductPerformanceDTO,
  ActivityLogDTO,
} from './api.types';
import { MOCK_DASHBOARD_STATS } from '@/data/mockNaturalink';

const useDashboardMock = () => import.meta.env.VITE_USE_LIVE_PRODUCT_API !== 'true';

export const dashboardService = {
  /**
   * Récupère les statistiques du dashboard
   */
  getStats: async (): Promise<DashboardStatsDTO> => {
    if (useDashboardMock()) {
      return MOCK_DASHBOARD_STATS;
    }
    return apiClient.get<DashboardStatsDTO>('/dashboard/stats');
  },

  /**
   * Récupère les tendances de ventes
   */
  getSalesTrends: async (months?: number): Promise<SalesTrendDTO[]> => {
    if (useDashboardMock()) {
      return [
        { month: 'Sep', revenue: 2_100_000, transactions: 42 },
        { month: 'Oct', revenue: 2_800_000, transactions: 55 },
        { month: 'Nov', revenue: 3_400_000, transactions: 61 },
        { month: 'Déc', revenue: 2_950_000, transactions: 58 },
        { month: 'Jan', revenue: 3_200_000, transactions: 64 },
      ];
    }
    const url = `/dashboard/sales-trends${months ? `?months=${months}` : ''}`;
    return apiClient.get<SalesTrendDTO[]>(url);
  },

  /**
   * Récupère la performance des produits
   */
  getProductPerformance: async (limit?: number): Promise<ProductPerformanceDTO[]> => {
    if (useDashboardMock()) {
      return [
        { product_id: 'ci-cacao-soubre-01', product_name: 'Cacao Soubré', sales: 2400, revenue: 4_440_000 },
        { product_id: 'ci-cafe-tonkpi-02', product_name: 'Café Tonkpi', sales: 800, revenue: 2_560_000 },
        { product_id: 'ci-cajou-korhogo-03', product_name: 'Cajou Korhogo', sales: 5000, revenue: 4_900_000 },
      ].slice(0, limit ?? 10);
    }
    const url = `/dashboard/product-performance${limit ? `?limit=${limit}` : ''}`;
    return apiClient.get<ProductPerformanceDTO[]>(url);
  },

  /**
   * Récupère l'activité récente
   */
  getRecentActivity: async (limit: number = 10): Promise<ActivityLogDTO[]> => {
    if (useDashboardMock()) {
      const demo: ActivityLogDTO[] = [
        {
          id: '1',
          user_id: 'demo',
          action: 'scan_nfc',
          resource_type: 'product',
          resource_id: 'ci-banane-bonoua-04',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'demo',
          action: 'lot_created',
          resource_type: 'product',
          resource_id: 'ci-cacao-soubre-01',
          created_at: new Date(Date.now() - 3600_000).toISOString(),
        },
      ];
      return demo.slice(0, limit);
    }
    return apiClient.get<ActivityLogDTO[]>(`/dashboard/recent-activity?limit=${limit}`);
  },
};
