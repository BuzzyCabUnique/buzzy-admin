'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CarFront, CircleDollarSign, CreditCard, LayoutDashboard, ShieldAlert, Users, UserSquare2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rides', label: 'Live Ride Monitor', icon: CarFront },
  { href: '/users', label: 'User Management', icon: Users },
  { href: '/drivers', label: 'Driver Management', icon: UserSquare2 },
  { href: '/payments', label: 'Payments & Revenue', icon: CircleDollarSign },
  { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/support', label: 'Support & Disputes', icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="hidden border-r border-white/8 bg-[#0d0d0d]/96 text-white shadow-[20px_0_60px_rgba(13,13,13,0.14)] backdrop-blur xl:flex xl:w-72 xl:flex-col"
    >
      <div className="border-b border-white/8 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FFD400]">BUZZY Admin</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Admin Panel</h1>
        <p className="mt-1 text-sm text-white/58">Operations, safety, payments, and support.</p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <motion.div key={item.href} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
              <Link
                href={item.href}
                className="group relative flex items-center overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium"
              >
                {isActive ? (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,212,0,0.98),rgba(255,159,10,0.78))] shadow-[0_0_0_1px_rgba(255,212,0,0.24),0_14px_30px_rgba(255,212,0,0.2)]"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <span
                  className={cn(
                    'relative z-10 flex items-center gap-3 transition-colors',
                    isActive ? 'text-[#0d0d0d]' : 'text-white/66 group-hover:text-white',
                  )}
                >
                  <Icon className={cn('h-4 w-4 transition-transform duration-200', !isActive && 'group-hover:scale-105')} />
                  <span>{item.label}</span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="border-t border-white/8 px-6 py-5 text-sm text-white/56">
        <p className="font-medium text-white">BUZZY Canada Inc.</p>
        <p className="mt-1">Premium operations workspace for Vercel deployment.</p>
      </div>
    </motion.aside>
  );
}
