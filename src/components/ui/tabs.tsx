'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-12 items-center justify-center rounded-2xl border border-gray-200 bg-white p-1 text-gray-500 shadow-[0_10px_22px_rgba(15,15,15,0.04)] backdrop-blur dark:border-gray-700 dark:bg-[#2A2A2D] dark:text-gray-400',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium text-gray-500 transition duration-200 hover:text-gray-900 data-[state=active]:bg-[linear-gradient(135deg,rgba(255,212,0,0.96),rgba(255,159,10,0.72))] data-[state=active]:text-[#0D0D0D] data-[state=active]:shadow-[0_10px_24px_rgba(255,212,0,0.2)] dark:text-gray-400 dark:hover:text-gray-100',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('mt-6 outline-none', className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
