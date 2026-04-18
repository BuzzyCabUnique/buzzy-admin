'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Moon, Search, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white/80 px-4 py-4 shadow-[0_12px_30px_rgba(15,15,15,0.04)] backdrop-blur-2xl dark:border-gray-700 dark:bg-[#1C1C1E]/86 md:px-6">
      <motion.div
        animate={isSearchFocused ? { y: -1 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="relative w-full max-w-md"
      >
        <Search className={cn('pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-colors', isSearchFocused && 'text-[#c78a00] dark:text-[#FFD400]')} />
        <Input
          className="pl-10 shadow-none"
          placeholder="Search rides, users, drivers, tickets..."
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </motion.div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-2xl border border-gray-200 bg-white/90 px-3 py-2 text-xs font-medium text-gray-600 shadow-[0_10px_24px_rgba(15,15,15,0.04)] backdrop-blur md:flex dark:border-gray-700 dark:bg-[#2A2A2D] dark:text-gray-300">
          Live ops: Toronto core
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">BUZZY Ops</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">admin@buzzy.ca</p>
        </div>
        <Avatar className="h-11 w-11 border border-[#FFD400]/35 bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] shadow-[0_10px_24px_rgba(255,212,0,0.18)]">
          <AvatarFallback className="bg-transparent font-semibold text-[#0D0D0D]">BA</AvatarFallback>
        </Avatar>
        <Button
          variant="secondary"
          onClick={() =>
            startTransition(async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.replace('/login');
              router.refresh();
            })
          }
          disabled={pending}
        >
          {pending ? 'Signing out...' : 'Logout'}
        </Button>
      </div>
    </header>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
