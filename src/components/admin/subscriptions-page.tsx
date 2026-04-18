'use client';

import { BellRing, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/page-header';
import { DataTable } from '@/components/data/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/store/admin-store';
import { formatCurrency } from '@/lib/utils';

const subscriptionVariants = {
  Active: 'success',
  'Grace Period': 'warning',
  'Past Due': 'danger',
} as const;

export function SubscriptionsPage() {
  const subscriptions = useAdminStore((state) => state.subscriptions);

  const recurringRevenue = subscriptions.reduce((sum, subscription) => sum + subscription.amount, 0);
  const atRisk = subscriptions.filter((subscription) => subscription.status !== 'Active');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Subscriptions"
        description="Monitor monthly driver plans, payment health, and drivers nearing the end of their grace period."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Monthly recurring revenue</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(recurringRevenue)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Grace period accounts</CardDescription>
            <CardTitle className="text-3xl">{subscriptions.filter((item) => item.status === 'Grace Period').length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Past due drivers</CardDescription>
            <CardTitle className="text-3xl">{subscriptions.filter((item) => item.status === 'Past Due').length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Plan ledger</CardTitle>
            <CardDescription>Subscription plans, amounts, renewals, and current collection status.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={subscriptions}
              searchKeys={['driverName', 'plan', 'status']}
              searchPlaceholder="Search driver subscriptions..."
              columns={[
                {
                  key: 'driver',
                  header: 'Driver',
                  sortable: true,
                  sortValue: (row) => row.driverName,
                  render: (row) => row.driverName,
                },
                {
                  key: 'plan',
                  header: 'Plan',
                  sortable: true,
                  sortValue: (row) => row.plan,
                  render: (row) => (
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] p-2 text-[#0D0D0D] shadow-[0_10px_22px_rgba(255,212,0,0.16)]">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <span>{row.plan}</span>
                    </div>
                  ),
                },
                {
                  key: 'amount',
                  header: 'Amount',
                  sortable: true,
                  sortValue: (row) => row.amount,
                  render: (row) => formatCurrency(row.amount),
                },
                {
                  key: 'status',
                  header: 'Status',
                  sortable: true,
                  sortValue: (row) => row.status,
                  render: (row) => <Badge variant={subscriptionVariants[row.status]}>{row.status}</Badge>,
                },
                {
                  key: 'renewal',
                  header: 'Renewal',
                  sortable: true,
                  sortValue: (row) => row.renewalDate,
                  render: (row) => row.renewalDate,
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grace period alerts</CardTitle>
            <CardDescription>Drivers who need follow-up before access is reduced.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {atRisk.map((subscription) => (
              <div key={subscription.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{subscription.driverName}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {subscription.graceUntil ? `Grace until ${subscription.graceUntil}` : 'Payment required immediately'}
                    </p>
                  </div>
                  <Badge variant={subscriptionVariants[subscription.status]}>{subscription.status}</Badge>
                </div>
                <Button className="mt-4 w-full" variant="outline" onClick={() => toast.success(`Reminder sent to ${subscription.driverName}`)}>
                  <BellRing className="h-4 w-4" />
                  Send reminder
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
