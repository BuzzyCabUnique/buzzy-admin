'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between', className)}
    >
      <div>
        {eyebrow ? (
          <p className="bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] bg-clip-text text-sm font-semibold uppercase tracking-[0.24em] text-transparent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {actions ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.24 }}
          className="flex flex-wrap items-center gap-3"
        >
          {actions}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
