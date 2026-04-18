import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { ADMIN_SESSION_COOKIE } from '@/lib/auth';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === 'authenticated';

  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,212,0,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,159,10,0.14),transparent_30%)]" />
      <div className="absolute left-[12%] top-20 h-40 w-40 rounded-full bg-[#FFD400]/12 blur-3xl" />
      <div className="absolute bottom-10 right-[10%] h-56 w-56 rounded-full bg-[#FF9F0A]/12 blur-3xl" />
      <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <section className="hidden rounded-[32px] border border-gray-200 bg-white/90 p-10 shadow-2xl shadow-black/5 backdrop-blur xl:block dark:border-gray-700 dark:bg-[#2A2A2D]/92">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8A5B00] dark:text-[#FFE682]">BUZZY Canada</p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Operations control for every ride, payout, dispute, and driver subscription.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            A standalone admin PWA designed for dispatch, finance, support, and trust teams. Built for clarity, speed,
            and daily operational decisions.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['18.4K', 'Rides monitored'],
              ['1.2K', 'Active drivers'],
              ['$482K', 'Revenue tracked'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#2A2A2D]">
                <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-center lg:justify-end">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
