'use client';

import { useMemo, useState } from 'react';
import { MapPinned, RadioTower, Route, Siren, TimerReset } from 'lucide-react';
import { toast } from 'sonner';
import { MockLiveMap } from '@/components/maps/mock-live-map';
import { PageHeader } from '@/components/admin/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminStore } from '@/store/admin-store';
import { LiveRide, LiveRideStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';

const rideVariants = {
  Assigned: 'default',
  Pickup: 'info',
  'En Route': 'success',
  Delayed: 'warning',
  Searching: 'warning',
} as const;

const statusOptions: Array<'All' | LiveRideStatus> = ['All', 'Assigned', 'Pickup', 'En Route', 'Delayed'];

export function RidesPage() {
  const rides = useAdminStore((state) => state.liveRides);
  const [status, setStatus] = useState<'All' | LiveRideStatus>('All');
  const [selectedRide, setSelectedRide] = useState<LiveRide | null>(null);

  const filteredRides = useMemo(() => {
    return status === 'All' ? rides : rides.filter((ride) => ride.status === status);
  }, [rides, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dispatch"
        title="Live Ride Monitor"
        description="Monitor active rides, compare ETA against actual progress, and jump into incidents fast."
        actions={
          <Button variant="outline" onClick={() => toast.success('Live monitor refreshed')}>
            <TimerReset className="h-4 w-4" />
            Refresh feed
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button key={option} variant={status === option ? 'default' : 'outline'} size="sm" onClick={() => setStatus(option)}>
            {option}
          </Button>
        ))}
      </div>

      <MockLiveMap rides={filteredRides} />

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredRides.map((ride) => (
          <Card key={ride.id}>
            <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle>{ride.id}</CardTitle>
                  <Badge variant={rideVariants[ride.status]}>{ride.status}</Badge>
                </div>
                <CardDescription>
                  {ride.riderName} is matched with {ride.driverName}.
                </CardDescription>
              </div>
              <div className="rounded-2xl border border-[#FFD400]/18 bg-[#FFF8D6] px-3 py-2 text-right dark:border-[#FFD400]/12 dark:bg-[#2A2616]">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Live ETA</p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{ride.eta} min</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Pickup</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{ride.pickup}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Dropoff</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{ride.drop}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-2"><Route className="h-4 w-4" /> {formatCurrency(ride.fare)}</span>
                  <span className="inline-flex items-center gap-2"><RadioTower className="h-4 w-4" /> Driver online</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info(`Dispatch ping sent to ${ride.driverName}`)}>
                    Ping driver
                  </Button>
                  <Button size="sm" onClick={() => setSelectedRide(ride)}>
                    Open details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Dialog open={Boolean(selectedRide)} onOpenChange={(open) => !open && setSelectedRide(null)}>
        <DialogContent>
          {selectedRide ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRide.id} ride details</DialogTitle>
                <DialogDescription>
                  {selectedRide.riderName} with {selectedRide.driverName} in {selectedRide.status.toLowerCase()} stage.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Pickup</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{selectedRide.pickup}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Dropoff</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{selectedRide.drop}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Estimated fare</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(selectedRide.fare)}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">ETA</p>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{selectedRide.eta} minutes</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => toast.success(`Mapped route opened for ${selectedRide.id}`)}>
                  <MapPinned className="h-4 w-4" />
                  Open route
                </Button>
                <Button variant="destructive" onClick={() => toast.warning(`Safety escalation raised for ${selectedRide.id}`)}>
                  <Siren className="h-4 w-4" />
                  Escalate issue
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
