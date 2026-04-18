'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  commissionRecords,
  dashboardMetrics,
  driverApplications,
  liveRides,
  payoutLogs,
  revenueSeries,
  subscriptions,
  supportTickets,
  users,
} from '@/lib/mock-data';
import { DriverApplication, SupportMessage, SupportTicket, TicketStatus } from '@/types';

type AdminState = {
  metrics: typeof dashboardMetrics;
  revenueSeries: typeof revenueSeries;
  liveRides: typeof liveRides;
  users: typeof users;
  driverApplications: typeof driverApplications;
  payoutLogs: typeof payoutLogs;
  commissionRecords: typeof commissionRecords;
  subscriptions: typeof subscriptions;
  supportTickets: typeof supportTickets;
  selectedTicketId: string;
  toggleUserStatus: (userId: string) => void;
  setUserStatus: (userId: string, status: 'Active' | 'Suspended' | 'Blocked') => void;
  updateDriverApproval: (driverId: string, approvalStatus: DriverApplication['approvalStatus']) => void;
  setSelectedTicket: (ticketId: string) => void;
  addSupportReply: (ticketId: string, message: string) => void;
  setTicketStatus: (ticketId: string, status: TicketStatus) => void;
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      metrics: dashboardMetrics,
      revenueSeries,
      liveRides,
      users,
      driverApplications,
      payoutLogs,
      commissionRecords,
      subscriptions,
      supportTickets,
      selectedTicketId: supportTickets[0]?.id ?? '',
      toggleUserStatus: (userId) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  status: user.status === 'Active' ? 'Suspended' : user.status === 'Suspended' ? 'Blocked' : 'Active',
                }
              : user,
          ),
        })),
      setUserStatus: (userId, status) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === userId ? { ...user, status } : user)),
        })),
      updateDriverApproval: (driverId, approvalStatus) =>
        set((state) => ({
          driverApplications: state.driverApplications.map((driver) =>
            driver.id === driverId
              ? {
                  ...driver,
                  approvalStatus,
                  subscriptionStatus: approvalStatus === 'Approved' ? 'Active' : driver.subscriptionStatus,
                }
              : driver,
          ),
        })),
      setSelectedTicket: (ticketId) => set({ selectedTicketId: ticketId }),
      addSupportReply: (ticketId, message) =>
        set((state) => ({
          supportTickets: state.supportTickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  messages: [
                    ...ticket.messages,
                    {
                      id: `reply-${Date.now()}`,
                      sender: 'Admin',
                      message,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    } satisfies SupportMessage,
                  ],
                }
              : ticket,
          ),
        })),
      setTicketStatus: (ticketId, status) =>
        set((state) => ({
          supportTickets: state.supportTickets.map((ticket) =>
            ticket.id === ticketId ? ({ ...ticket, status } satisfies SupportTicket) : ticket,
          ),
        })),
    }),
    {
      name: 'buzzy-admin-store',
      partialize: (state) => ({
        users: state.users,
        driverApplications: state.driverApplications,
        supportTickets: state.supportTickets,
        selectedTicketId: state.selectedTicketId,
      }),
    },
  ),
);
