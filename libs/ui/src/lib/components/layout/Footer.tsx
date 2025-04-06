
interface FooterProps {
  appName?: string;
  version?: string;
}

/**
 * Компонент нижней панели приложения
 */
export function Footer({ 
  appName = 'Учет материалов',
  version = '1.0.0'
}: FooterProps) {
  return (
    <footer className="border-t py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {appName}. Все права защищены.
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Версия {version}
          </p>
        </div>
      </div>
    </footer>
  );
}