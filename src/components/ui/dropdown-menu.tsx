"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div className="relative">{children}</div>;
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ children, className, onClick, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ children, isOpen, className, ...props }, ref) => {
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-200 py-2 z-[99999]",
        "animate-in slide-in-from-top-2 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ children, className, onClick, disabled, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};