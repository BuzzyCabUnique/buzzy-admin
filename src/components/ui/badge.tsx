import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]', {
  variants: {
    variant: {
      default: 'border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-[#2A2A2D] dark:text-gray-200',
      success: 'border-emerald-300/40 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
      warning: 'border-[#FFD400]/45 bg-[#FFD400]/16 text-[#8A5B00] dark:text-[#FFD966]',
      danger: 'border-rose-300/35 bg-rose-500/12 text-rose-700 dark:text-rose-300',
      info: 'border-[#FFD400]/48 bg-[linear-gradient(135deg,rgba(255,212,0,0.22),rgba(255,159,10,0.1))] text-[#5E4500] dark:text-[#FFE682]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
