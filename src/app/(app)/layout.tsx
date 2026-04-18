import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { ADMIN_SESSION_COOKIE } from '@/lib/auth';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <AppShell>{children}</AppShell>;
}
