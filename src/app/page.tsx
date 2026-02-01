'use client';

import { Header, Footer } from '@/components/shared';
import { Hero, Features, ParentInfo } from '@/components/landing';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <ParentInfo />
      </main>
      <Footer />
    </>
  );
}
