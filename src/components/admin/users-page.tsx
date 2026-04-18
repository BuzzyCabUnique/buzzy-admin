'use client';

import { useMemo, useState } from 'react';
import { Eye, ShieldBan, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/page-header';
import { DataTable } from '@/components/data/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminStore } from '@/store/admin-store';
import { AdminUserRecord, UserRole, UserStatus } from '@/types';
import { formatDate } from '@/lib/utils';

const statusVariants = {
  Active: 'success',
  Suspended: 'warning',
  Blocked: 'danger',
} as const;

const roleVariants = {
  Rider: 'info',
  Driver: 'default',
} as const;

export function UsersPage() {
  const users = useAdminStore((state) => state.users);
  const setUserStatus = useAdminStore((state) => state.setUserStatus);
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

  const filteredUsers = useMemo(() => {
    return roleFilter === 'All' ? users : users.filter((user) => user.role === roleFilter);
  }, [roleFilter, users]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Trust & Access"
        title="User Management"
        description="Search riders and drivers, review account health, and take moderation actions without leaving the dashboard."
      />

      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Accounts directory</CardTitle>
            <CardDescription>Filter by role, inspect profile details, and toggle account status.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Rider', 'Driver'] as const).map((role) => (
              <Button key={role} size="sm" variant={roleFilter === role ? 'default' : 'outline'} onClick={() => setRoleFilter(role)}>
                {role}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredUsers}
            searchKeys={['name', 'email', 'phone', 'city']}
            searchPlaceholder="Search people, email, phone, or city..."
            columns={[
              {
                key: 'identity',
                header: 'User',
                sortable: true,
                sortValue: (row) => row.name,
                render: (row) => (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                  </div>
                ),
              },
              {
                key: 'role',
                header: 'Role',
                sortable: true,
                sortValue: (row) => row.role,
                render: (row) => <Badge variant={roleVariants[row.role]}>{row.role}</Badge>,
              },
              {
                key: 'status',
                header: 'Status',
                sortable: true,
                sortValue: (row) => row.status,
                render: (row) => <Badge variant={statusVariants[row.status]}>{row.status}</Badge>,
              },
              {
                key: 'city',
                header: 'City',
                sortable: true,
                sortValue: (row) => row.city,
                render: (row) => row.city,
              },
              {
                key: 'rides',
                header: 'Total rides',
                sortable: true,
                sortValue: (row) => row.totalRides,
                render: (row) => row.totalRides.toLocaleString('en-CA'),
              },
              {
                key: 'actions',
                header: 'Actions',
                render: (row) => (
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedUser(row)}>
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant={row.status === 'Blocked' ? 'secondary' : 'destructive'}
                      onClick={() => {
                        const nextStatus: UserStatus = row.status === 'Blocked' ? 'Active' : row.status === 'Active' ? 'Suspended' : 'Blocked';
                        setUserStatus(row.id, nextStatus);
                        toast.success(`${row.name} is now ${nextStatus.toLowerCase()}`);
                      }}
                    >
                      {row.status === 'Blocked' ? <ShieldCheck className="h-4 w-4" /> : <ShieldBan className="h-4 w-4" />}
                      {row.status === 'Blocked' ? 'Restore' : row.status === 'Active' ? 'Suspend' : 'Block'}
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedUser)} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent>
          {selectedUser ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedUser.name}</DialogTitle>
                <DialogDescription>
                  {selectedUser.role} profile with moderation and trust information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Email</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-gray-100">{selectedUser.email}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-gray-100">{selectedUser.phone}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Joined</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-gray-100">{formatDate(selectedUser.joinedAt)}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Rating</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-gray-100">{selectedUser.rating.toFixed(1)} / 5</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(['Active', 'Suspended', 'Blocked'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={selectedUser.status === status ? 'default' : 'outline'}
                    onClick={() => {
                      setUserStatus(selectedUser.id, status);
                      setSelectedUser({ ...selectedUser, status });
                      toast.success(`Account updated to ${status.toLowerCase()}`);
                    }}
                  >
                    Set {status}
                  </Button>
                ))}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
