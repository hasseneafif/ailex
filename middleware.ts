import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Default locale is French
  defaultLocale: 'en',
  locales: ['fr', 'en'], // Add more if needed
  localeDetection: true, // Automatically detect user language
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
