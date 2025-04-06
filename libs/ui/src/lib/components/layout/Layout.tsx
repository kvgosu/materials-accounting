import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar, MenuItem } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  menuItems?: MenuItem[];
  appName?: string;
  version?: string;
  onSearch?: (query: string) => void;
  onNavigate?: (href: string) => void;
}

/**
 * Основной макет приложения
 */
export function Layout({ 
  children, 
  currentPath,
  menuItems,
  appName,
  version,
  onSearch,
  onNavigate
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onSearch={onSearch}
      />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          currentPath={currentPath}
          menuItems={menuItems}
          appName={appName}
          version={version}
          onNavigate={onNavigate}
        />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      <Footer appName={appName} version={version} />
    </div>
  );
}