import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gray-200 dark:bg-[#2A2A2D]',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[buzzyShimmer_1.8s_infinite] before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,212,0,0.14),transparent)]',
        className,
      )}
    />
  );
}
