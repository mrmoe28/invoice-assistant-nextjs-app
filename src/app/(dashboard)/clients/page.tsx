"use client";

import { useState } from "react";
import { PremiumCard } from "@/components/super-design/premium-card";
import { PremiumButton } from "@/components/super-design/premium-button";
import { Button } from "@/components/ui/button";
import { superDesignColors, invoiceDesignClasses } from "@/lib/super-design";
import { cn } from "@/lib/utils";
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Calendar,
  Grid,
  List,
  MoreHorizontal,
  User,
  Building2,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react";

// Mock client data - this would come from your database/API
const mockClients = [
  {
    id: "CLT-001",
    name: "Acme Corporation",
    email: "billing@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
    company: "Acme Corporation",
    totalInvoices: 15,
    totalRevenue: 42500,
    outstandingAmount: 2500,
    lastInvoiceDate: "2024-12-15",
    status: "active" as const,
    avatar: "AC",
    rating: 5,
  },
  {
    id: "CLT-002", 
    name: "Sarah Johnson",
    email: "sarah@techstart.com",
    phone: "+1 (555) 987-6543",
    address: "456 Innovation Blvd, San Francisco, CA 94107",
    company: "TechStart Inc",
    totalInvoices: 8,
    totalRevenue: 18900,
    outstandingAmount: 1800,
    lastInvoiceDate: "2024-12-20",
    status: "active" as const,
    avatar: "SJ",
    rating: 4,
  },
  {
    id: "CLT-003",
    name: "Michael Chen",
    email: "m.chen@global.com",
    phone: "+1 (555) 456-7890",
    address: "789 Corporate Way, Austin, TX 73301",
    company: "Global Solutions",
    totalInvoices: 22,
    totalRevenue: 67200,
    outstandingAmount: 3200,
    lastInvoiceDate: "2024-12-10",
    status: "overdue" as const,
    avatar: "MC",
    rating: 3,
  },
  {
    id: "CLT-004",
    name: "Emma Wilson",
    email: "emma@innovation.com",
    phone: "+1 (555) 321-0987",
    address: "321 Research Dr, Boston, MA 02101",
    company: "Innovation Labs",
    totalInvoices: 5,
    totalRevenue: 9500,
    outstandingAmount: 950,
    lastInvoiceDate: "2024-12-25",
    status: "new" as const,
    avatar: "EW",
    rating: 5,
  },
  {
    id: "CLT-005",
    name: "David Rodriguez",
    email: "david@digital.com",
    phone: "+1 (555) 654-3210",
    address: "654 Creative St, Los Angeles, CA 90210",
    company: "Digital Agency Co",
    totalInvoices: 18,
    totalRevenue: 54300,
    outstandingAmount: 0,
    lastInvoiceDate: "2024-12-12",
    status: "active" as const,
    avatar: "DR",
    rating: 5,
  },
  {
    id: "CLT-006",
    name: "Lisa Anderson",
    email: "lisa@creative.com",
    phone: "+1 (555) 789-0123",
    address: "987 Design Ave, Seattle, WA 98101",
    company: "Creative Studios",
    totalInvoices: 12,
    totalRevenue: 28750,
    outstandingAmount: 2750,
    lastInvoiceDate: "2024-12-18",
    status: "active" as const,
    avatar: "LA",
    rating: 4,
  },
];

// Calculate client stats
const clientStats = [
  {
    name: "Total Clients",
    value: mockClients.length.toString(),
    change: "+3 this month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Active Clients",
    value: mockClients.filter(c => c.status === 'active').length.toString(),
    change: "+2 this month",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    name: "Outstanding",
    value: `$${mockClients.reduce((sum, c) => sum + c.outstandingAmount, 0).toLocaleString()}`,
    change: "-5% this month",
    changeType: "negative" as const,
    icon: DollarSign,
  },
  {
    name: "Avg Revenue",
    value: `$${Math.round(mockClients.reduce((sum, c) => sum + c.totalRevenue, 0) / mockClients.length).toLocaleString()}`,
    change: "+12% this month",
    changeType: "positive" as const,
    icon: FileText,
  },
];

type ClientStatus = "all" | "active" | "new" | "overdue";
type ViewMode = "grid" | "list";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter clients
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
          label: "Active"
        };
      case "new":
        return {
          className: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
          label: "New"
        };
      case "overdue":
        return {
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white",
          label: "Overdue"
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700",
          label: "Unknown"
        };
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Clients
          </h1>
          <p className="text-gray-600 mt-2">Manage your client relationships and contacts</p>
        </div>
        <PremiumButton 
          variant="premium" 
          size="lg"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-5 h-5" />
          Add Client
        </PremiumButton>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clientStats.map((stat, index) => (
          <PremiumCard key={stat.name} variant="premium" className="text-center group hover:scale-105 transition-all duration-300">
            <div className="space-y-4">
              <div className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg",
                index === 0 && "bg-gradient-to-br from-blue-500 to-blue-600",
                index === 1 && "bg-gradient-to-br from-green-500 to-emerald-600", 
                index === 2 && "bg-gradient-to-br from-orange-500 to-yellow-600",
                index === 3 && "bg-gradient-to-br from-purple-500 to-purple-600"
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

      {/* Add Client Form */}
      {showAddForm && (
        <PremiumCard title="➕ Add New Client" variant="glass" className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-200/50">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter client name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="client@company.com"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <textarea
                placeholder="Street address, city, state, zip"
                rows={3}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-4">
              <PremiumButton variant="premium" type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </PremiumButton>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </PremiumCard>
      )}

      {/* Filters and Controls */}
      <PremiumCard variant="glass" className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ClientStatus)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Clients</option>
                <option value="active">Active</option>
                <option value="new">New</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* View Controls and Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-3 py-2 rounded-md transition-all duration-200",
                  viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-3 py-2 rounded-md transition-all duration-200",
                  viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </PremiumCard>

      {/* Clients Content */}
      <PremiumCard title="👥 All Clients" description={`${filteredClients.length} client${filteredClients.length !== 1 ? 's' : ''} found`} className="bg-gradient-to-br from-white to-gray-50">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => {
              const statusConfig = getStatusConfig(client.status);
              return (
                <div
                  key={client.id}
                  className={cn(
                    invoiceDesignClasses.client.card,
                    "group relative overflow-hidden"
                  )}
                >
                  <div className="space-y-4">
                    {/* Header with avatar and status */}
                    <div className="flex items-center justify-between">
                      <div className={invoiceDesignClasses.client.avatar}>
                        {client.avatar}
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
                          statusConfig.className
                        )}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    {/* Client Info */}
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">{client.company}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        {renderStars(client.rating)}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {client.phone}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          ${client.totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Total Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {client.totalInvoices}
                        </div>
                        <div className="text-xs text-gray-500">Invoices</div>
                      </div>
                    </div>

                    {/* Outstanding amount if any */}
                    {client.outstandingAmount > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-orange-500 mr-2" />
                          <span className="text-sm font-medium text-orange-700">
                            ${client.outstandingAmount.toLocaleString()} outstanding
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex space-x-2 pt-4">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client) => {
              const statusConfig = getStatusConfig(client.status);
              return (
                <div
                  key={client.id}
                  className="group flex items-center justify-between p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className={invoiceDesignClasses.client.avatar}>
                      {client.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{client.name}</div>
                      <div className="text-sm text-gray-600 font-medium">{client.company}</div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="text-xs text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {client.email}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {client.totalInvoices} invoices
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        ${client.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Total Revenue</div>
                    </div>
                    
                    {client.outstandingAmount > 0 && (
                      <div className="text-center">
                        <div className="font-bold text-lg text-orange-600">
                          ${client.outstandingAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Outstanding</div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
                          statusConfig.className
                        )}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {filteredClients.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No clients found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <PremiumButton 
              variant="premium"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Client
            </PremiumButton>
          </div>
        )}
      </PremiumCard>
    </div>
  );
}