'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

const ConditionalFooter = () => {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  if (isDashboardPage) {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;