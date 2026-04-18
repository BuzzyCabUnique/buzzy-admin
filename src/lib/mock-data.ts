import {
  AdminUserRecord,
  CommissionRecord,
  DashboardMetric,
  DriverApplication,
  LiveRide,
  PayoutLog,
  RevenuePoint,
  SubscriptionPlanRecord,
  SupportTicket,
} from '@/types';

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total rides', value: 18420, delta: '+12.4%', tone: 'default' },
  { label: 'Active rides', value: 248, delta: '+6.1%', tone: 'success' },
  { label: 'Revenue', value: 482900, delta: '+18.2%', tone: 'success' },
  { label: 'Active drivers', value: 1268, delta: '-1.7%', tone: 'warning' },
];

export const revenueSeries: RevenuePoint[] = [
  { label: 'Mon', revenue: 64000, rides: 2400, commission: 9600 },
  { label: 'Tue', revenue: 72000, rides: 2600, commission: 10800 },
  { label: 'Wed', revenue: 69000, rides: 2480, commission: 10350 },
  { label: 'Thu', revenue: 76000, rides: 2810, commission: 11400 },
  { label: 'Fri', revenue: 84500, rides: 3050, commission: 12675 },
  { label: 'Sat', revenue: 91000, rides: 3320, commission: 13650 },
  { label: 'Sun', revenue: 95400, rides: 3450, commission: 14310 },
];

export const liveRides: LiveRide[] = [
  {
    id: 'R-2481',
    riderName: 'Ava Mitchell',
    driverName: 'Noah Singh',
    fare: 22,
    eta: 4,
    status: 'Pickup',
    pickup: '100 King St W, Toronto',
    drop: '40 Bay St, Toronto',
    riderPosition: { x: 34, y: 46 },
    driverPosition: { x: 29, y: 42 },
  },
  {
    id: 'R-2482',
    riderName: 'Liam Chen',
    driverName: 'Maya Kaur',
    fare: 31,
    eta: 9,
    status: 'En Route',
    pickup: 'Union Station, Toronto',
    drop: 'Distillery District, Toronto',
    riderPosition: { x: 58, y: 38 },
    driverPosition: { x: 61, y: 49 },
  },
  {
    id: 'R-2483',
    riderName: 'Emma Roy',
    driverName: 'Daniel Brooks',
    fare: 18,
    eta: 6,
    status: 'Assigned',
    pickup: 'Yonge Dundas Sq, Toronto',
    drop: 'Liberty Village, Toronto',
    riderPosition: { x: 48, y: 28 },
    driverPosition: { x: 44, y: 35 },
  },
];

export const users: AdminUserRecord[] = [
  { id: 'U-1001', name: 'Ava Mitchell', email: 'ava@buzzy.ca', phone: '+1 416 555 1001', city: 'Toronto', role: 'Rider', status: 'Active', totalRides: 148, rating: 4.9, joinedAt: '2025-11-12' },
  { id: 'U-1002', name: 'Noah Singh', email: 'noah@buzzy.ca', phone: '+1 604 555 2002', city: 'Vancouver', role: 'Driver', status: 'Active', totalRides: 1082, rating: 4.8, joinedAt: '2025-07-03' },
  { id: 'U-1003', name: 'Emma Roy', email: 'emma@buzzy.ca', phone: '+1 514 555 3003', city: 'Montreal', role: 'Rider', status: 'Suspended', totalRides: 67, rating: 4.4, joinedAt: '2026-01-08' },
  { id: 'U-1004', name: 'Maya Kaur', email: 'maya@buzzy.ca', phone: '+1 403 555 4004', city: 'Calgary', role: 'Driver', status: 'Active', totalRides: 873, rating: 4.9, joinedAt: '2025-06-17' },
  { id: 'U-1005', name: 'Daniel Brooks', email: 'daniel@buzzy.ca', phone: '+1 613 555 5005', city: 'Ottawa', role: 'Driver', status: 'Blocked', totalRides: 412, rating: 4.1, joinedAt: '2025-09-23' },
  { id: 'U-1006', name: 'Sofia Patel', email: 'sofia@buzzy.ca', phone: '+1 416 555 6006', city: 'Toronto', role: 'Rider', status: 'Active', totalRides: 198, rating: 4.7, joinedAt: '2025-10-02' },
];

export const driverApplications: DriverApplication[] = [
  { id: 'D-2001', name: 'Harper Lewis', city: 'Toronto', vehicle: 'Toyota Prius', licenseNumber: 'ON-7D91', documents: ['License', 'Insurance', 'Background Check'], approvalStatus: 'Pending', subscriptionStatus: 'Grace Period', joinedAt: '2026-03-18' },
  { id: 'D-2002', name: 'Lucas Martin', city: 'Vancouver', vehicle: 'Honda Civic', licenseNumber: 'BC-3J22', documents: ['License', 'Insurance', 'Vehicle Permit'], approvalStatus: 'Approved', subscriptionStatus: 'Active', joinedAt: '2026-02-04' },
  { id: 'D-2003', name: 'Olivia Carter', city: 'Montreal', vehicle: 'Hyundai Kona', licenseNumber: 'QC-9L15', documents: ['License', 'Insurance'], approvalStatus: 'Rejected', subscriptionStatus: 'Past Due', joinedAt: '2026-03-07' },
];

export const payoutLogs: PayoutLog[] = [
  { id: 'P-3101', driverName: 'Noah Singh', amount: 1240, status: 'Paid', requestedAt: '2026-03-24 09:20' },
  { id: 'P-3102', driverName: 'Maya Kaur', amount: 980, status: 'Processing', requestedAt: '2026-03-25 14:05' },
  { id: 'P-3103', driverName: 'Daniel Brooks', amount: 610, status: 'Queued', requestedAt: '2026-03-26 18:42' },
];

export const commissionRecords: CommissionRecord[] = [
  { id: 'C-1', stream: 'Ride Commission', amount: 14310, percentage: 15, period: 'This week' },
  { id: 'C-2', stream: 'Driver Subscription', amount: 2980, percentage: 100, period: 'This month' },
  { id: 'C-3', stream: 'Cancellation Fee Share', amount: 820, percentage: 20, period: 'This week' },
];

export const subscriptions: SubscriptionPlanRecord[] = [
  { id: 'S-1', driverName: 'Noah Singh', plan: 'Driver Pro', amount: 20, renewalDate: '2026-04-01', status: 'Active' },
  { id: 'S-2', driverName: 'Maya Kaur', plan: 'Driver Pro', amount: 20, renewalDate: '2026-03-30', status: 'Grace Period', graceUntil: '2026-04-04' },
  { id: 'S-3', driverName: 'Daniel Brooks', plan: 'Driver Basic', amount: 12, renewalDate: '2026-03-21', status: 'Past Due', graceUntil: '2026-03-28' },
];

export const supportTickets: SupportTicket[] = [
  {
    id: 'T-9001',
    subject: 'Driver no-show refund request',
    category: 'Dispute',
    customerName: 'Ava Mitchell',
    priority: 'High',
    status: 'Investigating',
    openedAt: '2026-03-27 10:12',
    messages: [
      { id: 'm1', sender: 'User', message: 'My driver never arrived and I was charged a cancellation fee.', timestamp: '10:12' },
      { id: 'm2', sender: 'Admin', message: 'We are checking the trip trace and will update you shortly.', timestamp: '10:18' },
    ],
  },
  {
    id: 'T-9002',
    subject: 'Wallet top-up missing',
    category: 'Payment',
    customerName: 'Sofia Patel',
    priority: 'Medium',
    status: 'Open',
    openedAt: '2026-03-27 14:44',
    messages: [
      { id: 'm3', sender: 'User', message: 'My Interac top-up is not reflected in the app wallet.', timestamp: '14:44' },
    ],
  },
  {
    id: 'T-9003',
    subject: 'Driver document renewal',
    category: 'Driver',
    customerName: 'Lucas Martin',
    priority: 'Low',
    status: 'Resolved',
    openedAt: '2026-03-26 08:21',
    messages: [
      { id: 'm4', sender: 'User', message: 'Uploaded my renewed insurance card for review.', timestamp: '08:21' },
      { id: 'm5', sender: 'Admin', message: 'Documents verified. Your profile is back in good standing.', timestamp: '09:07' },
    ],
  },
];
