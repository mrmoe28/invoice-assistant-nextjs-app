"use client";

import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { superDesignVariants } from "@/lib/super-design";

interface PremiumButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'premium' | 'glass' | 'thinkDifferent' | 'default';
  isLoading?: boolean;
}

export function PremiumButton({ 
  variant = 'premium', 
  className, 
  children, 
  isLoading = false,
  disabled,
  ...props 
}: PremiumButtonProps) {
  const premiumVariants = {
    premium: superDesignVariants.button.premium,
    glass: superDesignVariants.button.glass,
    thinkDifferent: superDesignVariants.button.thinkDifferent,
    default: "", // Use default shadcn button styles
  };

  return (
    <Button
      className={cn(
        variant !== 'default' && premiumVariants[variant],
        "relative overflow-hidden group",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isLoading && "cursor-wait",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shine effect on hover */}
      {variant !== 'default' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <span className={cn(isLoading && "opacity-0", "relative z-10 flex items-center gap-2")}>
        {children}
      </span>
    </Button>
  );
}