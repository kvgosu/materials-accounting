import * as React from "react";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";
import { cn } from "../../utils";

/**
 * Провайдер для всех тултипов
 * Рекомендуется оборачивать тултипы в корневом компоненте
 */
const TooltipProvider = TooltipPrimitives.Provider;

/**
 * Корневой компонент тултипа
 * Управляет состоянием видимости
 */
const Tooltip = TooltipPrimitives.Root;

/**
 * Триггер тултипа
 * Элемент, при наведении на который показывается тултип
 */
const TooltipTrigger = TooltipPrimitives.Trigger;

/**
 * Интерфейс для контента тултипа
 */
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitives.Content> {
  className?: string;
  sideOffset?: number;
}

/**
 * Компонент для содержимого тултипа
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitives.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitives.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };