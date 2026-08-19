export type Role = 'super_admin' | 'owner' | 'stylist';

export type SalonType = 'mens' | 'womens' | 'unisex';

export interface Salon {
  id: string;
  name: string;
  type: SalonType;
  tagline: string;
  address: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  currency: string;
  logo?: string;
  ownerName: string;
}

export interface SalonTenant {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  type: SalonType;
  plan: 'Starter' | 'Professional' | 'Premium';
  monthlyFee: number;
  createdAt: string;
  
  // Payment & Plan Details for Super Admin
  planStartDate: string;
  planEndDate: string;
  paymentStatus: 'paid' | 'payment_pending' | 'overdue';
  ownerUsername: string;
  ownerPasskey: string;
}

export interface SaaSInvoice {
  id: string;
  salonId: string;
  salonName: string;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export type QueueStatus = 'waiting' | 'called' | 'in_service' | 'completed' | 'cancelled';

export interface QueueEntry {
  id: string;
  tokenNumber: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerGender: 'male' | 'female' | 'other';
  ageGroup: 'kids' | 'adult' | 'senior';
  isReturning: boolean;
  serviceIds: string[];
  serviceNames: string[];
  totalAmount: number;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  preferredEmployeeId?: string;
  preferredEmployeeName?: string;
  arrivalTime: string;
  startTime?: string;
  endTime?: string;
  waitingTimeMins: number;
  status: QueueStatus;
  notes?: string;
  visitType: 'walk_in' | 'appointment';
}

export type CustomerCategory = 'VIP' | 'Regular' | 'New' | 'Lost' | 'Potential';

export interface VisitHistory {
  id: string;
  date: string;
  services: string[];
  employeeName: string;
  amount: number;
  rating?: number;
  feedback?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  ageGroup: 'kids' | 'adult' | 'senior';
  birthday?: string;
  anniversary?: string;
  location?: string;
  customerSince: string;
  category: CustomerCategory;
  totalVisits: number;
  totalSpent: number;
  avgBill: number;
  lastVisitDate: string;
  avgVisitFrequencyDays: number;
  favoriteEmployeeId?: string;
  favoriteEmployeeName?: string;
  favoriteService?: string;
  notes?: string;
  visitHistory: VisitHistory[];
  lastRating?: number;
}

export interface Employee {
  id: string;
  name: string;
  photo: string;
  position: string;
  specialization: string;
  experienceYears: number;
  joiningDate: string;
  workingHours: string;
  servicesProvided: string[];
  commissionPercentage: number;
  status: 'active' | 'on_break' | 'absent';
  phone: string;
  username?: string;
  passkey?: string;
  
  // Stylist Metrics
  customersServedToday: number;
  customersServedWeek?: number;
  customersServedMonth?: number;
  avgServiceTimeMins: number;
  rating: number;
  ratingsCount: number;
  revenueGeneratedToday: number;
  revenueGeneratedMonth?: number;
  repeatCustomersToday: number;
  complaintsCount: number;
  attendanceDays: number;
  performanceScore: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  durationMins: number;
  price: number;
  targetGender: 'mens' | 'womens' | 'unisex';
  popular?: boolean;
  description?: string;
}

export type AppointmentStatus = 'confirmed' | 'waiting' | 'completed' | 'cancelled' | 'no_show';

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceIds: string[];
  serviceNames: string[];
  employeeId: string;
  employeeName: string;
  date: string;
  time: string;
  durationMins: number;
  status: AppointmentStatus;
  notes?: string;
  totalPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  purchasePrice: number;
  sellingPrice: number;
  supplier: string;
  unit: string;
  lastRestocked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'flat' | 'bogo' | 'free_service';
  discountValue: number;
  validUntil: string;
  targetAudience: 'all' | 'vip' | 'regular' | 'inactive' | 'male' | 'female' | 'specific_service';
  targetServiceName?: string;
  isActive: boolean;
  claimedCount: number;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'thank_you' | 'offer' | 'appointment_reminder' | 'birthday' | 'revisit_reminder' | 'wedding';
  templateText: string;
}

export interface WeddingBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  eventType: 'groom' | 'bride' | 'couple' | 'group' | 'family';
  eventDate: string;
  trialDate?: string;
  packageTitle: string;
  servicesRequired: string[];
  groupSize: number;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  totalBudget: number;
  advancePaid: number;
  status: 'inquiry' | 'confirmed' | 'trial_done' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface RatingReview {
  id: string;
  customerName: string;
  employeeId: string;
  employeeName: string;
  serviceName: string;
  stars: number;
  tags: string[];
  comment?: string;
  createdAt: string;
}

export interface SalonInsight {
  id: string;
  type: 'peak_hours' | 'top_performer' | 'inactive_alert' | 'revenue_driver' | 'staffing_tip' | 'loyal_customer';
  title: string;
  message: string;
  impactLevel: 'high' | 'medium' | 'info';
  actionText?: string;
  actionTab?: string;
}

export interface DailyClosingSummary {
  date: string;
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  totalRevenue: number;
  serviceRevenue: number;
  productRevenue: number;
  discountsGiven: number;
  paymentCash: number;
  paymentUPI: number;
  paymentCard: number;
  avgBillAmount: number;
  appointmentsCount: number;
  walkInsCount: number;
  avgRatingToday: number;
  lowStockItemsCount: number;
  pendingFollowupsCount: number;
  isClosed: boolean;
}
