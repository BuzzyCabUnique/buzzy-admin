'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(255,212,0,0.18)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white dark:ring-offset-[#1C1C1E]',
  {
    variants: {
      variant: {
        default:
          'bg-[linear-gradient(135deg,#FFD400_0%,#FFC936_56%,#FF9F0A_100%)] text-black shadow-[0_12px_30px_rgba(255,212,0,0.24)] hover:brightness-[1.02] hover:shadow-[0_16px_38px_rgba(255,212,0,0.3)] dark:bg-yellow-400 dark:text-black',
        secondary:
          'bg-gray-100 text-gray-900 shadow-[0_12px_24px_rgba(15,15,15,0.08)] hover:bg-gray-200 dark:bg-[#2A2A2D] dark:text-gray-100 dark:hover:bg-[#323236]',
        outline:
          'border border-gray-200 bg-white text-gray-900 shadow-[0_10px_24px_rgba(15,15,15,0.06)] hover:border-[#FFD400]/45 hover:bg-[#fff7cc] dark:border-gray-700 dark:bg-[#2A2A2D] dark:text-gray-100 dark:hover:border-[#FFD400]/35 dark:hover:bg-[#323236]',
        ghost:
          'text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-[#2A2A2D]',
        destructive:
          'bg-[linear-gradient(135deg,#FB7185_0%,#E11D48_100%)] text-white shadow-[0_12px_28px_rgba(225,29,72,0.22)] hover:brightness-105',
      },
      size: {
        default: 'h-11 px-4 py-2.5',
        sm: 'h-9 rounded-xl px-3',
        lg: 'h-12 rounded-2xl px-6',
        icon: 'h-11 w-11 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    const nativeProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    const motionProps = props as React.ComponentProps<typeof motion.button>;

    if (asChild) {
      const Comp = Slot;
      return <Comp className={classes} ref={ref} {...nativeProps} />;
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={disabled ? undefined : { y: -1 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        disabled={disabled}
        {...motionProps}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
