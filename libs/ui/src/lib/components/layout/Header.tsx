import * as React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface HeaderProps {
  onToggleSidebar: () => void;
  onSearch?: (query: string) => void;
}

/**
 * Компонент верхней панели приложения
 */
export function Header({ onToggleSidebar, onSearch }: HeaderProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch((e.target as any).value || '');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню</span>
        </Button>
        <a href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg">
            {/* Учет материалов */}
          </span>
        </a>
      </div>
      
      <div className="flex-1 px-4 md:px-8 lg:px-12">
        <div className="relative md:w-64 lg:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            className="w-full bg-background pl-8 md:w-64 lg:w-80"
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            3
          </span>
          <span className="sr-only">Уведомления</span>
        </Button>
        <div className="border-l h-8 mx-2" />
        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm">
            <div className="font-medium">Иван Иванов</div>
            <div className="text-muted-foreground">Администратор</div>
          </div>
          <Button variant="ghost" size="sm">
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}