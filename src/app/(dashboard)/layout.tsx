"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PremiumButton } from "@/components/super-design/premium-button";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { superDesignUtils } from "@/lib/super-design";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Menu,
  X,
  Plus,
  Bell,
  Search,
  Moon,
  Sun,
} from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const layoutClasses = superDesignUtils.getLayoutClasses("lg");

  return (
    <div className={cn("min-h-screen", darkMode && "dark")}>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-white dark:from-gray-900 dark:to-black">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform lg:relative lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col bg-white/80 backdrop-blur-xl border-r border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50">
            {/* Logo and close button */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                    Invoice
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Think different
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 mr-3",
                        isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="p-4 space-y-3">
              <PremiumButton
                variant="premium"
                className="w-full"
                onClick={() => window.location.href = "/invoices/new"}
              >
                <Plus className="w-4 h-4" />
                New Invoice
              </PremiumButton>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top navigation */}
          <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50 relative z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search invoices, clients..."
                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 w-64"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <ProfileDropdown />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <div className={cn("mx-auto", layoutClasses.container, layoutClasses.padding)}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}