"use client";

import { PremiumCard } from "@/components/super-design/premium-card";
import { PremiumButton } from "@/components/super-design/premium-button";
import { Button } from "@/components/ui/button";
import { invoiceDesignClasses, superDesignColors } from "@/lib/super-design";
import { cn } from "@/lib/utils";
import {
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";

// Mock data - this would come from your database/API
const stats = [
  {
    name: "Total Invoices",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    name: "Total Revenue",
    value: "$54,239",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    name: "Active Clients",
    value: "73",
    change: "+3",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Pending Payments",
    value: "$12,450",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: Clock,
  },
];

const recentInvoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: "$2,500",
    status: "paid" as const,
    dueDate: "2025-01-15",
  },
  {
    id: "INV-002",
    client: "TechStart Inc",
    amount: "$1,800",
    status: "pending" as const,
    dueDate: "2025-01-20",
  },
  {
    id: "INV-003",
    client: "Global Solutions",
    amount: "$3,200",
    status: "overdue" as const,
    dueDate: "2025-01-10",
  },
  {
    id: "INV-004",
    client: "Innovation Labs",
    amount: "$950",
    status: "draft" as const,
    dueDate: "2025-01-25",
  },
];

const quickActions = [
  {
    name: "Create Invoice",
    description: "Start a new invoice from template",
    href: "/invoices/new",
    icon: Plus,
    variant: "thinkDifferent" as const,
  },
  {
    name: "View All Invoices",
    description: "Manage your invoices",
    href: "/invoices",
    icon: Eye,
    variant: "premium" as const,
  },
  {
    name: "Export Data",
    description: "Download reports and data",
    href: "#",
    icon: Download,
    variant: "glass" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-16 text-center shadow-2xl">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Think different
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Here's to the crazy ones. The misfits. The rebels. The troublemakers.
            </p>
          </div>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto leading-relaxed">
            The round pegs in the square holes. The ones who see things differently. They're not fond of rules.
            And they have no respect for the status quo. You can quote them, disagree with them, glorify or
            vilify them. About the only thing you can't do is ignore them. Because they change things.
          </p>
          <div className="pt-6">
            <PremiumButton variant="glass" size="lg" className="text-lg px-10 py-4 text-white hover:bg-white/20">
              <Plus className="w-6 h-6" />
              Create Your First Invoice
            </PremiumButton>
          </div>
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-cyan-300/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 transform scale-150" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <PremiumCard key={stat.name} variant="premium" className="text-center group hover:scale-105 transition-all duration-300">
            <div className="space-y-4">
              <div className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg",
                index === 0 && "bg-gradient-to-br from-blue-500 to-blue-600",
                index === 1 && "bg-gradient-to-br from-green-500 to-emerald-600", 
                index === 2 && "bg-gradient-to-br from-purple-500 to-purple-600",
                index === 3 && "bg-gradient-to-br from-orange-500 to-red-500"
              )}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
                  stat.changeType === "positive" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                )}>
                  <TrendingUp className={cn(
                    "w-3 h-3 mr-1",
                    stat.changeType === "negative" && "rotate-180"
                  )} />
                  {stat.change}
                </div>
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>

      {/* Quick Actions */}
      <PremiumCard title="⚡ Quick Actions" description="Get things done faster" className="bg-gradient-to-br from-gray-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={action.name}
              className={cn(
                "group relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
                index === 0 && "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
                index === 1 && "bg-gradient-to-br from-blue-500 to-cyan-600 text-white", 
                index === 2 && "bg-gradient-to-br from-gray-600 to-gray-700 text-white"
              )}
              onClick={() => window.location.href = action.href}
            >
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{action.name}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{action.description}</p>
                </div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>
      </PremiumCard>

      {/* Recent Invoices */}
      <PremiumCard title="📋 Recent Invoices" description="Your latest invoice activity" className="bg-gradient-to-br from-white to-gray-50">
        <div className="space-y-3">
          {recentInvoices.map((invoice, index) => (
            <div
              key={invoice.id}
              className="group flex items-center justify-between p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110",
                  index % 4 === 0 && "bg-gradient-to-br from-blue-500 to-blue-600",
                  index % 4 === 1 && "bg-gradient-to-br from-green-500 to-green-600",
                  index % 4 === 2 && "bg-gradient-to-br from-purple-500 to-purple-600",
                  index % 4 === 3 && "bg-gradient-to-br from-orange-500 to-orange-600"
                )}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{invoice.id}</div>
                  <div className="text-sm text-gray-600 font-medium">{invoice.client}</div>
                  <div className="text-xs text-gray-500">Due: {invoice.dueDate}</div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {invoice.amount}
                </div>
                <div className="flex items-center justify-end">
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
                      {
                        "bg-gradient-to-r from-green-500 to-emerald-500 text-white": invoice.status === "paid",
                        "bg-gradient-to-r from-yellow-500 to-orange-500 text-white": invoice.status === "pending",
                        "bg-gradient-to-r from-red-500 to-red-600 text-white": invoice.status === "overdue",
                        "bg-gradient-to-r from-gray-500 to-gray-600 text-white": invoice.status === "draft",
                      }
                    )}
                  >
                    {invoice.status === "paid" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {invoice.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                    {invoice.status === "overdue" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {invoice.status === "draft" && <Calendar className="w-3 h-3 mr-1" />}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <Button variant="outline" className="w-full h-12 text-base font-medium hover:bg-gray-50 transition-colors">
            View All Invoices
          </Button>
        </div>
      </PremiumCard>
    </div>
  );
}