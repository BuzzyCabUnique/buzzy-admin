'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { DashboardMetric } from '@/types';
import { formatCompactNumber, formatCurrency } from '@/lib/utils';

const toneMap = {
  default: {
    glow: 'shadow-[0_18px_38px_rgba(255,212,0,0.12)]',
    chip: 'bg-[linear-gradient(135deg,rgba(255,212,0,0.22),rgba(255,159,10,0.12))] text-[#5E4500] dark:text-[#FFE682]',
    dot: 'bg-[#FFD400]',
  },
  success: {
    glow: 'shadow-[0_18px_38px_rgba(16,185,129,0.12)]',
    chip: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  warning: {
    glow: 'shadow-[0_18px_38px_rgba(245,158,11,0.14)]',
    chip: 'bg-amber-500/12 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
} as const;

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const isRevenue = metric.label === 'Revenue';
  const isPositive = !metric.delta.startsWith('-');
  const styles = toneMap[metric.tone];

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }}>
      <Card className={`h-full overflow-hidden ${styles.glow}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.label}</CardTitle>
              <div className="mt-3 h-1.5 w-14 rounded-full bg-gray-200 dark:bg-[#3A3A3D]">
                <div className={`h-1.5 w-8 rounded-full ${styles.dot}`} />
              </div>
            </div>
            <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${styles.chip}`}>
              Live
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                <AnimatedNumber value={metric.value} formatter={isRevenue ? formatCurrency : formatCompactNumber} />
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1.5 text-sm text-gray-500 dark:border-gray-700 dark:bg-[#323236] dark:text-gray-400">
                {isPositive ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-amber-400" />}
                <span>{metric.delta} vs last week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
