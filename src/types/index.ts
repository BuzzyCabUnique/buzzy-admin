export type ThemeMode = 'light' | 'dark';

export type LiveRideStatus = 'Searching' | 'Assigned' | 'Pickup' | 'En Route' | 'Delayed';
export type UserRole = 'Rider' | 'Driver';
export type UserStatus = 'Active' | 'Suspended' | 'Blocked';
export type DriverApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
export type SubscriptionStatus = 'Active' | 'Grace Period' | 'Past Due';
export type TicketStatus = 'Open' | 'Investigating' | 'Resolved';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export type Position = {
  x: number;
  y: number;
};

export type DashboardMetric = {
  label: string;
  value: number;
  delta: string;
  tone: 'default' | 'success' | 'warning';
};

export type RevenuePoint = {
  label: string;
  revenue: number;
  rides: number;
  commission: number;
};

export type LiveRide = {
  id: string;
  riderName: string;
  driverName: string;
  fare: number;
  eta: number;
  status: LiveRideStatus;
  pickup: string;
  drop: string;
  riderPosition: Position;
  driverPosition: Position;
};

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  status: UserStatus;
  totalRides: number;
  rating: number;
  joinedAt: string;
};

export type DriverApplication = {
  id: string;
  name: string;
  city: string;
  vehicle: string;
  licenseNumber: string;
  documents: string[];
  approvalStatus: DriverApprovalStatus;
  subscriptionStatus: SubscriptionStatus;
  joinedAt: string;
};

export type PayoutLog = {
  id: string;
  driverName: string;
  amount: number;
  status: 'Paid' | 'Processing' | 'Queued';
  requestedAt: string;
};

export type CommissionRecord = {
  id: string;
  stream: string;
  amount: number;
  percentage: number;
  period: string;
};

export type SubscriptionPlanRecord = {
  id: string;
  driverName: string;
  plan: string;
  amount: number;
  renewalDate: string;
  status: SubscriptionStatus;
  graceUntil?: string;
};

export type SupportMessage = {
  id: string;
  sender: 'Admin' | 'User';
  message: string;
  timestamp: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  category: string;
  customerName: string;
  priority: TicketPriority;
  status: TicketStatus;
  openedAt: string;
  messages: SupportMessage[];
};
