'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from '@materials-accounting/ui';
import { Providers } from '../providers';
import './global.css';

// В client компонентах нельзя использовать metadata экспорт напрямую
// Вместо этого используем стандартные meta теги или обновляем title динамически

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    document.title = 'Учет материалов';
  }, []);
  useEffect(() => {
    setSearchQuery('');
  }, [pathname]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleNavigate = (href: string) => {
    window.location.href = href;
  };
  const appInfo = {
    name: 'Учет материалов',
    version: '1.0.0',
  };
  return (
    <html lang="ru">
      <head>
        <meta name="description" content="Система учета материалов и накладных" />
      </head>
      <body>
        <Providers>
          <Layout
            currentPath={pathname}
            appName={appInfo.name}
            version={appInfo.version}
            onSearch={handleSearch}
            onNavigate={handleNavigate}
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}