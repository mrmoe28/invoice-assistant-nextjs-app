"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Shield,
  Bell,
  Palette,
  ChevronDown,
} from "lucide-react";

interface ProfileDropdownProps {
  className?: string;
}

export function ProfileDropdown({ className }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "JD";

  const userName = session?.user?.name || "John Doe";
  const userEmail = session?.user?.email || "john@example.com";

  return (
    <div ref={dropdownRef}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-medium">{userInitials}</span>
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{userName}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</div>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-500 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent isOpen={isOpen} className="w-72 z-[99999]">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-base font-medium">{userInitials}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{userName}</div>
                <div className="text-sm text-gray-500">{userEmail}</div>
                <div className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  Premium Plan
                </div>
              </div>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="py-1">
            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/profile";
              }}
            >
              <User className="w-4 h-4 mr-3 text-gray-500" />
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/settings";
              }}
            >
              <Settings className="w-4 h-4 mr-3 text-gray-500" />
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                // TODO: Open notifications settings
              }}
            >
              <Bell className="w-4 h-4 mr-3 text-gray-500" />
              Notifications
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                // TODO: Open appearance settings
              }}
            >
              <Palette className="w-4 h-4 mr-3 text-gray-500" />
              Appearance
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Billing & Support */}
          <div className="py-1">
            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/billing";
              }}
            >
              <CreditCard className="w-4 h-4 mr-3 text-gray-500" />
              Billing & Plans
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                // TODO: Open privacy settings
              }}
            >
              <Shield className="w-4 h-4 mr-3 text-gray-500" />
              Privacy & Security
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                setIsOpen(false);
                window.open("https://help.invoiceassistant.com", "_blank");
              }}
            >
              <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
              Help & Support
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Logout */}
          <div className="py-1">
            <DropdownMenuItem
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}