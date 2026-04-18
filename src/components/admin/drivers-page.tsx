'use client';

import { useState } from 'react';
import { FileSearch, ShieldCheck, ShieldX } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/page-header';
import { DataTable } from '@/components/data/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminStore } from '@/store/admin-store';
import { DriverApplication } from '@/types';

const approvalVariants = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'danger',
} as const;

const subscriptionVariants = {
  Active: 'success',
  'Grace Period': 'warning',
  'Past Due': 'danger',
} as const;

export function DriversPage() {
  const driverApplications = useAdminStore((state) => state.driverApplications);
  const updateDriverApproval = useAdminStore((state) => state.updateDriverApproval);
  const [selectedDriver, setSelectedDriver] = useState<DriverApplication | null>(null);

  const pendingCount = driverApplications.filter((driver) => driver.approvalStatus === 'Pending').length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Fleet"
        title="Driver Management"
        description="Approve onboarding, preview documents, and watch subscription health before drivers fall out of compliance."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending approvals</CardDescription>
            <CardTitle className="text-3xl">{pendingCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Grace period accounts</CardDescription>
            <CardTitle className="text-3xl">
              {driverApplications.filter((driver) => driver.subscriptionStatus === 'Grace Period').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Rejected applications</CardDescription>
            <CardTitle className="text-3xl">
              {driverApplications.filter((driver) => driver.approvalStatus === 'Rejected').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Driver application queue</CardTitle>
          <CardDescription>Review docs, approve or reject, and keep subscription status visible.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={driverApplications}
            searchKeys={['name', 'city', 'vehicle', 'licenseNumber']}
            searchPlaceholder="Search driver name, vehicle, city, or license..."
            columns={[
              {
                key: 'name',
                header: 'Driver',
                sortable: true,
                sortValue: (row) => row.name,
                render: (row) => (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.vehicle}</p>
                  </div>
                ),
              },
              {
                key: 'city',
                header: 'City',
                sortable: true,
                sortValue: (row) => row.city,
                render: (row) => row.city,
              },
              {
                key: 'approval',
                header: 'Approval',
                sortable: true,
                sortValue: (row) => row.approvalStatus,
                render: (row) => <Badge variant={approvalVariants[row.approvalStatus]}>{row.approvalStatus}</Badge>,
              },
              {
                key: 'subscription',
                header: 'Subscription',
                sortable: true,
                sortValue: (row) => row.subscriptionStatus,
                render: (row) => <Badge variant={subscriptionVariants[row.subscriptionStatus]}>{row.subscriptionStatus}</Badge>,
              },
              {
                key: 'actions',
                header: 'Actions',
                render: (row) => (
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedDriver(row)}>
                      <FileSearch className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        updateDriverApproval(row.id, 'Approved');
                        toast.success(`${row.name} approved`);
                      }}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        updateDriverApproval(row.id, 'Rejected');
                        toast.warning(`${row.name} rejected`);
                      }}
                    >
                      <ShieldX className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedDriver)} onOpenChange={(open) => !open && setSelectedDriver(null)}>
        <DialogContent>
          {selectedDriver ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDriver.name}</DialogTitle>
                <DialogDescription>
                  Mock document preview and subscription details for compliance review.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Vehicle</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-gray-100">{selectedDriver.vehicle}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">License</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-gray-100">{selectedDriver.licenseNumber}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-[#FFD400]/22 bg-[linear-gradient(135deg,rgba(255,212,0,0.08),rgba(255,255,255,0.6))] p-5 dark:border-[#FFD400]/14 dark:bg-[#232326]/78">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Documents on file</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  {selectedDriver.documents.map((document) => (
                    <li key={document} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-[#2A2A2D]">
                      <span>{document}</span>
                      <Badge variant="info">Mock preview</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => { updateDriverApproval(selectedDriver.id, 'Approved'); toast.success('Driver approved'); }}>
                  Approve driver
                </Button>
                <Button variant="destructive" onClick={() => { updateDriverApproval(selectedDriver.id, 'Rejected'); toast.warning('Driver rejected'); }}>
                  Reject application
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
