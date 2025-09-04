"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
