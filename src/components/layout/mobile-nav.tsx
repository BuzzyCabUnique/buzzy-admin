'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navItems } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="sticky bottom-0 z-30 border-t border-white/8 bg-[#0d0d0d]/96 px-3 py-3 backdrop-blur xl:hidden"
    >
      <div className="flex gap-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="relative min-w-fit">
              {isActive ? (
                <motion.span
                  layoutId="mobile-active-pill"
                  className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,212,0,0.98),rgba(255,159,10,0.78))] shadow-[0_10px_24px_rgba(255,212,0,0.2)]"
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
              ) : null}
              <motion.span
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'relative flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium transition',
                  isActive ? 'text-[#0d0d0d]' : 'bg-white/6 text-white/72',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </motion.span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
