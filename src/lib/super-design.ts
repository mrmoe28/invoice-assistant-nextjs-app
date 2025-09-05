// Super_design integration configuration and utilities
import { cn } from "./utils";

// Super_design color palette - professional gradients and colors
export const superDesignColors = {
  gradients: {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    danger: "bg-gradient-to-r from-red-500 to-pink-500",
    neutral: "bg-gradient-to-r from-gray-500 to-slate-500",
    // Glass morphism backgrounds
    glass: "bg-white/10 backdrop-blur-lg border border-white/20",
    glassDark: "bg-black/10 backdrop-blur-lg border border-black/20",
    // Think different inspired
    thinkDifferent: "bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800",
  },
  shadows: {
    soft: "shadow-lg shadow-black/5",
    medium: "shadow-xl shadow-black/10",
    strong: "shadow-2xl shadow-black/20",
    colored: "shadow-lg shadow-blue-500/25",
  },
  animations: {
    slideIn: "animate-in slide-in-from-bottom-4 duration-300",
    fadeIn: "animate-in fade-in duration-500",
    scaleIn: "animate-in zoom-in-95 duration-200",
    bounceIn: "animate-bounce",
  }
};

// Super_design component variants
export const superDesignVariants = {
  card: {
    default: cn(
      "rounded-xl border bg-white text-gray-900",
      superDesignColors.shadows.soft,
      "transition-all duration-300 hover:scale-[1.02]"
    ),
    glass: cn(
      "rounded-xl",
      superDesignColors.gradients.glass,
      "transition-all duration-300 hover:backdrop-blur-xl"
    ),
    premium: cn(
      "rounded-xl border bg-gradient-to-br from-white to-gray-50",
      superDesignColors.shadows.medium,
      "transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
    ),
  },
  button: {
    premium: cn(
      superDesignColors.gradients.primary,
      "text-white rounded-lg transition-all duration-300",
      "hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25",
      superDesignColors.animations.scaleIn
    ),
    glass: cn(
      superDesignColors.gradients.glass,
      "text-foreground rounded-lg transition-all duration-300",
      "hover:backdrop-blur-xl hover:bg-white/20"
    ),
    thinkDifferent: cn(
      superDesignColors.gradients.thinkDifferent,
      "text-white rounded-lg transition-all duration-300",
      "hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
    ),
  }
};

// Super_design utility functions
export const superDesignUtils = {
  // Generate professional color combinations
  getColorPalette: (theme: 'light' | 'dark' = 'light') => ({
    background: theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-white' : 'bg-gradient-to-br from-gray-900 to-black',
    surface: theme === 'light' ? 'bg-white/80 backdrop-blur-sm' : 'bg-gray-800/80 backdrop-blur-sm',
    accent: superDesignColors.gradients.primary,
    text: theme === 'light' ? 'text-gray-900' : 'text-gray-100',
    textMuted: theme === 'light' ? 'text-gray-600' : 'text-gray-400',
  }),

  // Professional spacing and layout
  getLayoutClasses: (size: 'sm' | 'md' | 'lg' = 'md') => ({
    container: size === 'sm' ? 'max-w-4xl' : size === 'md' ? 'max-w-6xl' : 'max-w-7xl',
    padding: size === 'sm' ? 'p-4' : size === 'md' ? 'p-6' : 'p-8',
    gap: size === 'sm' ? 'gap-4' : size === 'md' ? 'gap-6' : 'gap-8',
  }),

  // Animation presets
  getAnimationClasses: (type: 'entrance' | 'hover' | 'focus') => {
    switch (type) {
      case 'entrance':
        return cn(
          superDesignColors.animations.slideIn,
          superDesignColors.animations.fadeIn
        );
      case 'hover':
        return "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg";
      case 'focus':
        return "focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200";
      default:
        return "";
    }
  },

  // Premium styling classes for billing and subscription pages
  getPremiumClasses: () => ({
    gradientText: "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300",
    glassCard: "bg-white/80 backdrop-blur-xl border border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50"
  })
};

// Super_design specific CSS classes for invoice application
export const invoiceDesignClasses = {
  // Dashboard specific
  dashboard: {
    hero: cn(
      "min-h-[60vh] flex items-center justify-center",
      superDesignColors.gradients.thinkDifferent,
      "text-white relative overflow-hidden"
    ),
    statsCard: cn(
      superDesignVariants.card.premium,
      "p-6 text-center hover:shadow-xl transition-all duration-300"
    ),
    quickAction: cn(
      superDesignVariants.button.premium,
      "p-4 rounded-xl flex items-center gap-3 w-full justify-start"
    ),
  },
  // Invoice specific
  invoice: {
    form: cn(
      superDesignVariants.card.glass,
      "p-8 rounded-2xl backdrop-blur-xl"
    ),
    preview: cn(
      "bg-white rounded-xl border-2 border-gray-100",
      superDesignColors.shadows.medium,
      "p-8 h-full overflow-auto"
    ),
    lineItem: cn(
      "grid grid-cols-5 gap-4 p-4 rounded-lg",
      "hover:bg-gray-50 transition-colors duration-200",
      "border border-transparent hover:border-gray-200"
    ),
  },
  // Client management
  client: {
    card: cn(
      superDesignVariants.card.default,
      "p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
    ),
    avatar: "w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold",
  }
};

const superDesign = {
  colors: superDesignColors,
  variants: superDesignVariants,
  utils: superDesignUtils,
  invoice: invoiceDesignClasses,
};

export default superDesign;