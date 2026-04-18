import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE } from '@/lib/auth';

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === 'authenticated';

  redirect(isAuthenticated ? '/dashboard' : '/login');
}
