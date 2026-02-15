import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  await updateSession(request);
  return response;
}

export const config = {
  matcher: ['/', '/(en|ja|zh|ko)/:path*'],
};
