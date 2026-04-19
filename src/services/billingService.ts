import { apiClient } from './apiClient';
import { BillingEstimateDTO, InvoiceDTO } from './api.types';

export const billingService = {
  /**
   * Obtient une estimation de commission
   */
  estimateCommission: async (
    productPrice: number,
    quantity: number
  ): Promise<BillingEstimateDTO> => {
    return apiClient.post<BillingEstimateDTO>('/billing/estimate-commission', {
      productPrice,
      quantity,
    });
  },

  /**
   * Récupère une facture
   */
  getInvoice: async (id: string): Promise<InvoiceDTO> => {
    return apiClient.get<InvoiceDTO>(`/billing/invoice/${id}`);
  },

  /**
   * Récupère les factures d'un producteur
   */
  getProducerInvoices: async (producerId: string) => {
    return apiClient.get(`/billing/invoices?producer_id=${producerId}`);
  },
};
