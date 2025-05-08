import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';
import { usePage } from '@inertiajs/react';

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  const { user, categories } = usePage().props;

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} categories={categories} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}