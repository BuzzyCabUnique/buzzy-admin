'use client';

import { ArrowUpRight, Download, Landmark, Percent } from 'lucide-react';
import { toast } from 'sonner';
import { OverviewCharts } from '@/components/charts/overview-charts';
import { PageHeader } from '@/components/admin/page-header';
import { DataTable } from '@/components/data/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/store/admin-store';
import { formatCurrency } from '@/lib/utils';

const payoutVariants = {
  Paid: 'success',
  Processing: 'info',
  Queued: 'warning',
} as const;

export function PaymentsPage() {
  const payoutLogs = useAdminStore((state) => state.payoutLogs);
  const revenueSeries = useAdminStore((state) => state.revenueSeries);
  const commissionRecords = useAdminStore((state) => state.commissionRecords);

  const totalPayouts = payoutLogs.reduce((sum, payout) => sum + payout.amount, 0);
  const totalCommission = commissionRecords.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Finance"
        title="Payments & Revenue"
        description="Track revenue trends, commission streams, and payout operations from one workspace."
        actions={
          <Button variant="outline" onClick={() => toast.success('Revenue package exported')}>
            <Download className="h-4 w-4" />
            Export ledger
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total payouts in queue</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(totalPayouts)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Commission earned</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(totalCommission)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Net margin cue</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              18.6%
              <ArrowUpRight className="h-5 w-5 text-emerald-500" />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <OverviewCharts data={revenueSeries} />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Commission tracking</CardTitle>
            <CardDescription>Track every revenue stream contributing to BUZZY admin margin.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={commissionRecords}
              searchKeys={['stream', 'period']}
              searchPlaceholder="Search revenue streams..."
              columns={[
                {
                  key: 'stream',
                  header: 'Stream',
                  sortable: true,
                  sortValue: (row) => row.stream,
                  render: (row) => (
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] p-2 text-[#0D0D0D] shadow-[0_10px_22px_rgba(255,212,0,0.16)]">
                        <Percent className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{row.stream}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.period}</p>
                      </div>
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
                  key: 'percentage',
                  header: 'Rate',
                  sortable: true,
                  sortValue: (row) => row.percentage,
                  render: (row) => `${row.percentage}%`,
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout logs</CardTitle>
            <CardDescription>Driver disbursement requests and payout processing state.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={payoutLogs}
              searchKeys={['driverName', 'status', 'requestedAt']}
              searchPlaceholder="Search payout logs..."
              columns={[
                {
                  key: 'driver',
                  header: 'Driver',
                  sortable: true,
                  sortValue: (row) => row.driverName,
                  render: (row) => row.driverName,
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
                  render: (row) => <Badge variant={payoutVariants[row.status]}>{row.status}</Badge>,
                },
                {
                  key: 'actions',
                  header: 'Action',
                  render: (row) => (
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Payout ${row.id} opened`)}>
                      <Landmark className="h-4 w-4" />
                      Review
                    </Button>
                  ),
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
