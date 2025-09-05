"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { superDesignVariants } from "@/lib/super-design";

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: 'default' | 'glass' | 'premium';
  children: React.ReactNode;
}

export function PremiumCard({ 
  title, 
  description, 
  variant = 'premium', 
  className, 
  children, 
  ...props 
}: PremiumCardProps) {
  return (
    <Card 
      className={cn(
        superDesignVariants.card[variant],
        "group cursor-pointer",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <CardHeader className="pb-3">
          {title && (
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={title || description ? "pt-0" : "p-6"}>
        {children}
      </CardContent>
    </Card>
  );
}