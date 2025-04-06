import * as React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  ScrollText, 
  Package, 
  FileText, 
  ArrowRightLeft,
  BarChart
} from 'lucide-react';
import { cn } from '../../utils';

/**
 * Объект для настройки пунктов меню
 */
const defaultMenuItems = [
  {
    title: 'Дашборд',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Клиенты',
    href: '/clients',
    icon: Users,
  },
  {
    title: 'Поставщики',
    href: '/suppliers',
    icon: Truck,
  },
  {
    title: 'Договоры',
    href: '/contracts',
    icon: ScrollText,
  },
  {
    title: 'Материалы',
    href: '/materials',
    icon: Package,
  },
  {
    title: 'Накладные',
    href: '/invoices',
    icon: FileText,
  },
  {
    title: 'Транзакции',
    href: '/transactions',
    icon: ArrowRightLeft,
  },
  {
    title: 'Регистр долгов',
    href: '/debt-movements',
    icon: BarChart,
  },
];

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems?: MenuItem[];
  currentPath?: string;
  appName?: string;
  version?: string;
  onNavigate?: (href: string) => void;
}

/**
 * Компонент боковой панели навигации
 */
export function Sidebar({ 
  isOpen, 
  onClose, 
  menuItems = defaultMenuItems,
  currentPath = '/',
  appName = 'Учет материалов',
  version = '1.0.0',
  onNavigate
}: SidebarProps) {
  // Закрываем меню при изменении маршрута на мобильных устройствах
  React.useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [currentPath, isOpen, onClose]);

  const handleClick = (href: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background transition-transform duration-300 md:sticky md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <a 
          href="/" 
          className="flex items-center gap-2 font-semibold"
          onClick={(e) => handleClick('/', e)}
        >
          <span className="font-bold text-lg">{appName}</span>
        </a>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid gap-1 px-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  currentPath === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
                onClick={(e) => handleClick(item.href, e)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        {/* <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {appName} v{version}
        </p> */}
      </div>
    </aside>
  );
}