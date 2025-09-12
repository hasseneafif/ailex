"use client";

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
        {children}
    </NextIntlClientProvider>
  );
}
