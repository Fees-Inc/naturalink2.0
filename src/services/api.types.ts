// Types pour l'API backend

export type UserRole = 'consumer' | 'producer' | 'distributor' | 'admin';
export type ProductStatus = 'active' | 'inactive' | 'archived';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type KYCStatus = 'pending' | 'verified' | 'rejected';

// ============ Auth & User ============

export interface AuthResponse {
  access_token: string;
  user: UserDTO;
  profile: ProfileDTO;
}

export interface UserDTO {
  id: string;
  email: string;
  created_at: string;
}

export interface ProfileDTO {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  role: UserRole;
  location?: string;
  phone?: string;
  avatar_url?: string;
  is_verified: boolean;
  kyc_status: KYCStatus;
  created_at: string;
  updated_at: string;
}

// ============ Producer & Cooperative ============

export interface ProducerDTO {
  id: string;
  user_id: string;
  cooperative_id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio?: string;
  avatar_url?: string;
  certification_status: 'pending' | 'verified' | 'rejected';
  products_count: number;
  total_earnings: number;
  verified_products_count: number;
  created_at: string;
  updated_at: string;
}

export interface CooperativeDTO {
  id: string;
  name: string;
  location: string;
  members_count: number;
  contact_email: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProducerDTO {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio?: string;
  cooperative_id?: string;
}

export interface UpdateProducerDTO {
  name?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  phone?: string;
}

// ============ Products ============

export interface ProductDTO {
  id: string;
  producer_id: string;
  name: string;
  description: string;
  origin_location: string;
  status: ProductStatus;
  price: number;
  quantity: number;
  unit: string; // kg, L, etc
  harvest_date: string;
  expiry_date?: string;
  certifications: string[];
  sustainability_info?: string;
  photo_url?: string;
  nfc_tag_id?: string; // unique NFC identifier
  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  origin_location: string;
  price: number;
  quantity: number;
  unit: string;
  harvest_date: string;
  expiry_date?: string;
  certifications?: string[];
  sustainability_info?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  status?: ProductStatus;
  certifications?: string[];
}

// ============ Distributors ============

export interface DistributorDTO {
  id: string;
  user_id: string;
  company_name: string;
  email: string;
  phone: string;
  location: string;
  contact_person?: string;
  total_purchases: number;
  total_products_distributed: number;
  created_at: string;
  updated_at: string;
}

export interface CreateDistributorDTO {
  company_name: string;
  email: string;
  phone: string;
  location: string;
  contact_person?: string;
}

// ============ Transactions & Billing ============

export interface TransactionDTO {
  id: string;
  producer_id?: string;
  distributor_id?: string;
  product_id: string;
  amount: number;
  quantity: number;
  status: TransactionStatus;
  commission_percentage: number;
  commission_amount: number;
  producer_net_amount: number;
  created_at: string;
  updated_at: string;
}

export interface BillingEstimateDTO {
  product_price: number;
  quantity: number;
  commission_percentage: number;
  commission_amount: number;
  net_amount: number;
  total_amount: number;
}

export interface InvoiceDTO {
  id: string;
  transaction_id: string;
  producer_id: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  issued_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

// ============ Analytics ============

export interface DashboardStatsDTO {
  total_producers: number;
  total_products: number;
  total_distributors: number;
  total_revenue: number;
  active_transactions: number;
  verified_producers: number;
  month_over_month_growth: number; // percentage
}

export interface SalesTrendDTO {
  month: string;
  revenue: number;
  transactions: number;
}

export interface ProductPerformanceDTO {
  product_id: string;
  product_name: string;
  sales: number;
  revenue: number;
  rating?: number;
}

export interface ActivityLogDTO {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  created_at: string;
}

// ============ NFC & Blockchain ============

export interface NFCProductDataDTO {
  nfc_id: string;
  product: ProductDTO;
  producer: ProducerDTO;
  transformation_history: TransformationStepDTO[];
  consumer_notes: ConsumerNoteDTO[];
  verification_timestamp: string;
}

export interface TransformationStepDTO {
  id: string;
  product_id: string;
  step_type: 'harvest' | 'processing' | 'packaging' | 'transport' | 'distribution';
  location: string;
  timestamp: string;
  description?: string;
  actor_name: string;
}

export interface ConsumerNoteDTO {
  id: string;
  product_id: string;
  rating: number;
  comment: string;
  consumer_name?: string;
  created_at: string;
}

// ============ Pagination ============

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
