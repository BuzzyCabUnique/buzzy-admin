export const ADMIN_SESSION_COOKIE = 'buzzy_admin_session';

export const ADMIN_CREDENTIALS = {
  email: process.env.BUZZY_ADMIN_EMAIL ?? 'admin@buzzy.ca',
  password: process.env.BUZZY_ADMIN_PASSWORD ?? 'BuzzyAdmin123!',
};

export function isValidAdminLogin(email: string, password: string) {
  return email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password;
}
