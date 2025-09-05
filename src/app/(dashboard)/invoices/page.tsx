"use client";

import { useState } from "react";
import { PremiumCard } from "@/components/super-design/premium-card";
import { PremiumButton } from "@/components/super-design/premium-button";
import { Button } from "@/components/ui/button";
import { superDesignColors, superDesignVariants } from "@/lib/super-design";
import { cn } from "@/lib/utils";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  MoreHorizontal,
  Grid,
  List,
  ArrowUpDown,
} from "lucide-react";

// Mock data for invoices - this would come from your database/API
const mockInvoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    clientEmail: "billing@acme.com",
    amount: 2500,
    status: "paid" as const,
    dueDate: "2025-01-15",
    issueDate: "2024-12-15",
    items: 3,
  },
  {
    id: "INV-002",
    client: "TechStart Inc",
    clientEmail: "finance@techstart.com",
    amount: 1800,
    status: "pending" as const,
    dueDate: "2025-01-20",
    issueDate: "2024-12-20",
    items: 2,
  },
  {
    id: "INV-003",
    client: "Global Solutions",
    clientEmail: "accounts@global.com",
    amount: 3200,
    status: "overdue" as const,
    dueDate: "2025-01-10",
    issueDate: "2024-12-10",
    items: 4,
  },
  {
    id: "INV-004",
    client: "Innovation Labs",
    clientEmail: "billing@innovation.com",
    amount: 950,
    status: "draft" as const,
    dueDate: "2025-01-25",
    issueDate: "2024-12-25",
    items: 1,
  },
  {
    id: "INV-005",
    client: "Digital Agency Co",
    clientEmail: "payments@digital.com",
    amount: 4100,
    status: "paid" as const,
    dueDate: "2025-01-12",
    issueDate: "2024-12-12",
    items: 5,
  },
  {
    id: "INV-006",
    client: "Creative Studios",
    clientEmail: "finance@creative.com",
    amount: 2750,
    status: "pending" as const,
    dueDate: "2025-01-18",
    issueDate: "2024-12-18",
    items: 3,
  },
  {
    id: "INV-007",
    client: "Enterprise Corp",
    clientEmail: "billing@enterprise.com",
    amount: 5200,
    status: "overdue" as const,
    dueDate: "2025-01-08",
    issueDate: "2024-12-08",
    items: 6,
  },
  {
    id: "INV-008",
    client: "Startup Ventures",
    clientEmail: "accounts@startup.com",
    amount: 1350,
    status: "draft" as const,
    dueDate: "2025-01-30",
    issueDate: "2024-12-30",
    items: 2,
  },
];

// Calculate stats from mock data
const stats = [
  {
    name: "Total Invoices",
    value: mockInvoices.length.toString(),
    change: "+12%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    name: "Total Revenue",
    value: `$${mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`,
    change: "+8.2%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    name: "Pending Amount",
    value: `$${mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`,
    change: "+5.1%",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    name: "Overdue Amount",
    value: `$${mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`,
    change: "-2.1%",
    changeType: "negative" as const,
    icon: AlertCircle,
  },
];

type InvoiceStatus = "all" | "paid" | "pending" | "overdue" | "draft";
type SortField = "id" | "client" | "amount" | "dueDate" | "status";
type ViewMode = "grid" | "list";

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus>("all");
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  // Filter and sort invoices
  const filteredInvoices = mockInvoices
    .filter(invoice => {
      const matchesSearch = 
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === "amount") {
        aValue = a.amount;
        bValue = b.amount;
      } else if (sortField === "dueDate") {
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
          icon: CheckCircle,
          label: "Paid"
        };
      case "pending":
        return {
          className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
          icon: Clock,
          label: "Pending"
        };
      case "overdue":
        return {
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white",
          icon: AlertCircle,
          label: "Overdue"
        };
      case "draft":
        return {
          className: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
          icon: Calendar,
          label: "Draft"
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700",
          icon: FileText,
          label: "Unknown"
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Invoices
          </h1>
          <p className="text-gray-600 mt-2">Manage and track all your invoices</p>
        </div>
        <PremiumButton 
          variant="premium" 
          size="lg"
          onClick={() => window.location.href = "/invoices/new"}
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </PremiumButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <PremiumCard key={stat.name} variant="premium" className="text-center group hover:scale-105 transition-all duration-300">
            <div className="space-y-4">
              <div className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg",
                index === 0 && "bg-gradient-to-br from-blue-500 to-blue-600",
                index === 1 && "bg-gradient-to-br from-green-500 to-emerald-600", 
                index === 2 && "bg-gradient-to-br from-orange-500 to-yellow-600",
                index === 3 && "bg-gradient-to-br from-red-500 to-red-600"
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

      {/* Filters and Controls */}
      <PremiumCard variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              >
                <option value="id">Invoice ID</option>
                <option value="client">Client</option>
                <option value="amount">Amount</option>
                <option value="dueDate">Due Date</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {/* View Controls and Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-3 py-2 rounded-md transition-all duration-200",
                  viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-3 py-2 rounded-md transition-all duration-200",
                  viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </PremiumCard>

      {/* Invoices Content */}
      <PremiumCard title="📋 All Invoices" description={`${filteredInvoices.length} invoice${filteredInvoices.length !== 1 ? 's' : ''} found`} className="bg-gradient-to-br from-white to-gray-50">
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredInvoices.map((invoice, index) => {
              const statusConfig = getStatusConfig(invoice.status);
              return (
                <div
                  key={invoice.id}
                  className="group flex items-center justify-between p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer"
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
                      <div className="text-xs text-gray-500">{invoice.clientEmail}</div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      ${invoice.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Due: {invoice.dueDate}
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
                          statusConfig.className
                        )}
                      >
                        <statusConfig.icon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((invoice, index) => {
              const statusConfig = getStatusConfig(invoice.status);
              return (
                <div
                  key={invoice.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-200 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                        index % 4 === 0 && "bg-gradient-to-br from-blue-500 to-blue-600",
                        index % 4 === 1 && "bg-gradient-to-br from-green-500 to-green-600",
                        index % 4 === 2 && "bg-gradient-to-br from-purple-500 to-purple-600",
                        index % 4 === 3 && "bg-gradient-to-br from-orange-500 to-orange-600"
                      )}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
                          statusConfig.className
                        )}
                      >
                        <statusConfig.icon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </span>
                    </div>
                    
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{invoice.id}</div>
                      <div className="text-sm text-gray-600 font-medium">{invoice.client}</div>
                      <div className="text-xs text-gray-500 mt-1">{invoice.clientEmail}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        ${invoice.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Due: {invoice.dueDate}
                      </div>
                      <div className="text-xs text-gray-500">
                        {invoice.items} item{invoice.items !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="flex-1 mr-2">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              );
            })}
          </div>
        )}
        
        {filteredInvoices.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No invoices found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <PremiumButton 
              variant="premium"
              onClick={() => window.location.href = "/invoices/new"}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Invoice
            </PremiumButton>
          </div>
        )}
      </PremiumCard>
    </div>
  );
}