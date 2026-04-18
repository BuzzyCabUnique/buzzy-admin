'use client';

import { ArrowRight, BellRing, CarFront, CreditCard, Download, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { MetricCard } from '@/components/charts/metric-card';
import { OverviewCharts } from '@/components/charts/overview-charts';
import { PageHeader } from '@/components/admin/page-header';
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

const rideVariants = {
  Assigned: 'default',
  Pickup: 'info',
  'En Route': 'success',
  Delayed: 'warning',
  Searching: 'warning',
} as const;

export function DashboardPage() {
  const metrics = useAdminStore((state) => state.metrics);
  const revenueSeries = useAdminStore((state) => state.revenueSeries);
  const liveRides = useAdminStore((state) => state.liveRides);
  const subscriptions = useAdminStore((state) => state.subscriptions);
  const commissionRecords = useAdminStore((state) => state.commissionRecords);

  const totalRevenue = revenueSeries.reduce((sum, point) => sum + point.revenue, 0);
  const totalCommission = commissionRecords.reduce((sum, record) => sum + record.amount, 0);
  const atRiskSubscriptions = subscriptions.filter((subscription) => subscription.status !== 'Active');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Dashboard"
        description="A real-time snapshot of BUZZY rides, finance, driver health, and trust operations across Canada."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success('Daily snapshot exported') }>
              <Download className="h-4 w-4" />
              Export snapshot
            </Button>
            <Button onClick={() => toast.success('Ops digest shared with leadership')}>
              Share digest
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.65fr_1fr]">
        <OverviewCharts data={revenueSeries} />

        <Card>
          <CardHeader>
            <CardTitle>Executive pulse</CardTitle>
            <CardDescription>Top indicators operations teams usually check first every morning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-[linear-gradient(135deg,rgba(255,212,0,0.08),rgba(255,255,255,0.7))] p-4 dark:border-gray-700 dark:bg-[#232326]/78">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gross revenue this week</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="rounded-2xl bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] p-3 text-[#0D0D0D] shadow-[0_10px_24px_rgba(255,212,0,0.16)]">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-[linear-gradient(135deg,rgba(255,212,0,0.08),rgba(255,255,255,0.7))] p-4 dark:border-gray-700 dark:bg-[#232326]/78">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Commission captured</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(totalCommission)}</p>
                </div>
                <div className="rounded-2xl bg-[#151515] p-3 text-[#FFD400] shadow-[0_10px_24px_rgba(15,15,15,0.18)] dark:bg-[#2a2a2d]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-[linear-gradient(135deg,rgba(255,212,0,0.08),rgba(255,255,255,0.7))] p-4 dark:border-gray-700 dark:bg-[#232326]/78">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Subscriptions needing action</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">{atRiskSubscriptions.length}</p>
                </div>
                <div className="rounded-2xl bg-[#FFD400]/16 p-3 text-[#8A5B00] dark:text-[#FFD966]">
                  <BellRing className="h-5 w-5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Live operations queue</CardTitle>
            <CardDescription>Active ride dispatches and ETAs currently under watch.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveRides.map((ride) => (
              <div key={ride.id} className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white dark:bg-[#2A2A2D] p-4 dark:border-gray-700 dark:bg-[#2A2A2D] md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] p-3 text-[#0D0D0D] shadow-[0_12px_28px_rgba(255,212,0,0.2)]">
                    <CarFront className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{ride.id}</p>
                      <Badge variant={rideVariants[ride.status]}>{ride.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {ride.riderName} with {ride.driverName}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {ride.pickup} to {ride.drop}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">ETA</p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{ride.eta} min</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Fare</p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(ride.fare)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription alerts</CardTitle>
            <CardDescription>Grace periods and payment risk across the driver base.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {atRiskSubscriptions.map((subscription) => (
              <div key={subscription.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{subscription.driverName}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {subscription.plan} renews on {subscription.renewalDate}
                    </p>
                  </div>
                  <Badge variant={subscriptionVariants[subscription.status]}>{subscription.status}</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subscription.graceUntil ? `Grace until ${subscription.graceUntil}` : 'Needs attention from billing ops'}
                  </p>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Reminder sent to ${subscription.driverName}`)}>
                    Notify
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
