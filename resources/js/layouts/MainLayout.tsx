import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';

interface Props {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    children?: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
  }>;
}

export function MainLayout({ children, user, categories }: Props) {
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