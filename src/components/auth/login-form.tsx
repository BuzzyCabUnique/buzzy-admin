'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState('admin@buzzy.ca');
  const [password, setPassword] = useState('BuzzyAdmin123!');

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-md">
      <Card className="overflow-hidden border-gray-200 bg-white shadow-[0_28px_70px_rgba(15,15,15,0.14)] dark:border-gray-700 dark:bg-[#2A2A2D] dark:shadow-[0_36px_90px_rgba(0,0,0,0.38)]">
        <CardHeader className="space-y-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FFD400]/35 bg-[#FFD400]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A5B00] dark:text-[#FFE682]">
            Secure access
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#FFD400_0%,#FF9F0A_100%)] text-[#0D0D0D] shadow-[0_14px_30px_rgba(255,212,0,0.24)]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <CardTitle className="text-2xl">Admin login</CardTitle>
            <CardDescription>Use the mock credentials to access the BUZZY Admin Panel.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@buzzy.ca" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="BuzzyAdmin123!" type="password" />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-[#323236] dark:text-gray-400">
            Default credentials: <span className="font-medium text-gray-800 dark:text-gray-100">admin@buzzy.ca</span> / <span className="font-medium text-gray-800 dark:text-gray-100">BuzzyAdmin123!</span>
          </div>
          <Button
            className="w-full"
            onClick={() =>
              startTransition(async () => {
                const response = await fetch('/api/auth/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                  toast.error('Invalid credentials', { description: 'Use admin@buzzy.ca / BuzzyAdmin123!' });
                  return;
                }

                toast.success('Login successful', { description: 'Redirecting to the dashboard.' });
                router.replace('/dashboard');
                router.refresh();
              })
            }
            disabled={pending}
          >
            {pending ? 'Signing in...' : 'Login'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
