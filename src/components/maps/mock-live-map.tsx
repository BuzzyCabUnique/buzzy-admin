'use client';

import { motion } from 'framer-motion';
import { CarFront, MapPin, User } from 'lucide-react';
import { LiveRide } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function MockLiveMap({ rides }: { rides: LiveRide[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Live ride monitor</CardTitle>
        <CardDescription>Mock city grid with rider and driver positions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[420px] overflow-hidden rounded-[24px] border border-white/8 bg-[#121214] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="absolute inset-0 buzzy-grid opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,212,0,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,159,10,0.08),transparent_24%)]" />
          {rides.map((ride, index) => (
            <div key={ride.id}>
              <motion.div
                animate={{ scale: [1, 1.14, 1], opacity: [0.3, 0.72, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/18"
                style={{ left: `${ride.riderPosition.x}%`, top: `${ride.riderPosition.y}%` }}
              />
              <motion.div
                className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0D0D0D] shadow-[0_12px_28px_rgba(255,255,255,0.18)]"
                style={{ left: `${ride.riderPosition.x}%`, top: `${ride.riderPosition.y}%` }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.18 }}
              >
                <User className="h-4 w-4" />
              </motion.div>
              <motion.div
                className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] text-[#0D0D0D] shadow-[0_14px_32px_rgba(255,212,0,0.24)]"
                style={{ left: `${ride.driverPosition.x}%`, top: `${ride.driverPosition.y}%` }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.24 }}
              >
                <CarFront className="h-4 w-4" />
              </motion.div>
              <div
                className="absolute h-px bg-[linear-gradient(90deg,rgba(255,212,0,0.92),rgba(255,159,10,0.5))]"
                style={{
                  left: `${Math.min(ride.riderPosition.x, ride.driverPosition.x)}%`,
                  top: `${Math.min(ride.riderPosition.y, ride.driverPosition.y)}%`,
                  width: `${Math.abs(ride.driverPosition.x - ride.riderPosition.x)}%`,
                  transform: `rotate(${ride.driverPosition.y > ride.riderPosition.y ? 12 : -12}deg)`,
                  transformOrigin: 'left center',
                }}
              />
            </div>
          ))}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[#FFD400]/18 bg-[#0D0D0D]/72 px-3 py-2 text-xs text-white/78 shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-[#FFD400]" />
            Toronto Control Grid
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {rides.map((ride) => (
            <motion.div
              key={ride.id}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="buzzy-card rounded-[20px] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{ride.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{ride.riderName} • {ride.driverName}</p>
                </div>
                <Badge variant={ride.status === 'Delayed' ? 'warning' : 'info'}>{ride.status}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
