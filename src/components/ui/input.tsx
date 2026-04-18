import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#FFD400]/60 focus:bg-white focus:ring-4 focus:ring-[rgba(255,212,0,0.16)] dark:border-gray-700 dark:bg-[#2A2A2D] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-[#FFD400]/35 dark:focus:bg-[#323236]',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
