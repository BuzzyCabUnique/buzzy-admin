'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RevenuePoint } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function OverviewCharts({ data }: { data: RevenuePoint[] }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  const axisColor = isDark ? '#E5E7EB' : '#374151';
  const gridColor = isDark ? 'rgba(107,114,128,0.25)' : 'rgba(209,213,219,0.85)';
  const tooltipStyle = useMemo(
    () => ({
      background: isDark ? 'rgba(28, 28, 30, 0.96)' : 'rgba(255, 255, 255, 0.98)',
      border: isDark ? '1px solid rgba(255, 212, 0, 0.18)' : '1px solid rgba(229, 231, 235, 0.95)',
      borderRadius: '16px',
      boxShadow: isDark ? '0 22px 54px rgba(0, 0, 0, 0.32)' : '0 18px 40px rgba(15, 15, 15, 0.12)',
      color: isDark ? '#F3F4F6' : '#111827',
    }),
    [isDark],
  );

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <Card>
        <CardHeader>
          <CardTitle>Operations overview</CardTitle>
          <CardDescription>Revenue, ride volume, and commission collected.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="rides">Rides</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue">
              <div className="h-[320px] w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                      <defs>
                        <linearGradient id="buzzyRevenueFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFD400" stopOpacity={0.45} />
                          <stop offset="70%" stopColor="#FF9F0A" stopOpacity={0.18} />
                          <stop offset="100%" stopColor="#FF9F0A" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 6" vertical={false} stroke={gridColor} />
                      <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                      <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value ?? 0))}
                        contentStyle={tooltipStyle}
                        labelStyle={{ color: isDark ? '#FFD400' : '#8A5B00', fontWeight: 600 }}
                        itemStyle={{ color: isDark ? '#F3F4F6' : '#111827', padding: 0 }}
                        cursor={{ fill: 'rgba(255, 212, 0, 0.08)' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FFD400"
                        strokeWidth={3}
                        fill="url(#buzzyRevenueFill)"
                        activeDot={{ r: 6, fill: '#FFD400', stroke: isDark ? '#1C1C1E' : '#FFFFFF', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <Skeleton className="h-full w-full rounded-2xl" />
                )}
              </div>
            </TabsContent>
            <TabsContent value="rides">
              <div className="h-[320px] w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                      <defs>
                        <linearGradient id="buzzyRideBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFD400" stopOpacity={0.95} />
                          <stop offset="100%" stopColor="#FF9F0A" stopOpacity={0.78} />
                        </linearGradient>
                        <linearGradient id="buzzyCommissionBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={isDark ? '#5B5B60' : '#9CA3AF'} stopOpacity={0.95} />
                          <stop offset="100%" stopColor={isDark ? '#2A2A2D' : '#4B5563'} stopOpacity={0.78} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 6" vertical={false} stroke={gridColor} />
                      <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        labelStyle={{ color: isDark ? '#FFD400' : '#8A5B00', fontWeight: 600 }}
                        itemStyle={{ color: isDark ? '#F3F4F6' : '#111827', padding: 0 }}
                        cursor={{ fill: 'rgba(255, 212, 0, 0.08)' }}
                      />
                      <Bar dataKey="rides" fill="url(#buzzyRideBar)" radius={[14, 14, 0, 0]} />
                      <Bar dataKey="commission" fill="url(#buzzyCommissionBar)" radius={[14, 14, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Skeleton className="h-full w-full rounded-2xl" />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
