"use client";

import { useState } from "react";
import { PremiumCard } from "@/components/super-design/premium-card";
import { PremiumButton } from "@/components/super-design/premium-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Plus,
  X,
  Calculator,
  Save,
  Send,
  Eye,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Hash,
  DollarSign,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Client {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export default function NewInvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now()}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  
  const [client, setClient] = useState<Client>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ]);

  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const handleSave = () => {
    console.log('Saving invoice...', { invoiceNumber, client, items, total });
    // TODO: Implement save functionality
  };

  const handleSend = () => {
    console.log('Sending invoice...', { invoiceNumber, client, items, total });
    // TODO: Implement send functionality
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Invoice
            </h1>
            <p className="text-gray-600">Build professional invoices that get paid faster</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => window.print()}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <PremiumButton variant="glass" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </PremiumButton>
          <PremiumButton variant="thinkDifferent" onClick={handleSend}>
            <Send className="w-4 h-4 mr-2" />
            Send Invoice
          </PremiumButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Invoice Details */}
          <PremiumCard title="📄 Invoice Details" className="bg-gradient-to-br from-white to-blue-50/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Hash className="w-4 h-4 mr-1" />
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Issue Date
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>
          </PremiumCard>

          {/* Client Information */}
          <PremiumCard title="👤 Bill To" className="bg-gradient-to-br from-white to-green-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Client Name
                </label>
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter client or company name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  placeholder="client@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={client.phone}
                  onChange={(e) => setClient({ ...client, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Billing Address
                </label>
                <textarea
                  value={client.address}
                  onChange={(e) => setClient({ ...client, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 resize-none"
                  placeholder="Enter full billing address"
                />
              </div>
            </div>
          </PremiumCard>

          {/* Invoice Items */}
          <PremiumCard 
            title="🛍️ Invoice Items" 
            description="Add products or services to your invoice"
            className="bg-gradient-to-br from-white to-purple-50/30"
          >
            <div className="space-y-4">
              {/* Items Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-5">Description</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Rate</div>
                <div className="col-span-2 text-center">Amount</div>
                <div className="col-span-1"></div>
              </div>

              {/* Invoice Items */}
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-center"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-center"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-center font-medium text-gray-900">
                      ${item.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Item Button */}
              <Button
                variant="outline"
                onClick={addItem}
                className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Item
              </Button>
            </div>
          </PremiumCard>

          {/* Notes */}
          <PremiumCard title="📝 Notes & Terms" className="bg-gradient-to-br from-white to-orange-50/30">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Additional Notes or Terms
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200 resize-none"
                placeholder="Payment terms, thank you note, or any additional information..."
              />
            </div>
          </PremiumCard>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <PremiumCard title="💰 Invoice Summary" className="sticky top-6 bg-gradient-to-br from-white to-gray-50">
            <div className="space-y-4">
              {/* Tax Rate Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calculator className="w-4 h-4 mr-1" />
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Quick Actions */}
          <PremiumCard title="⚡ Quick Actions" className="bg-gradient-to-br from-white to-blue-50/30">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Building className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Add to Client List
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Reminder
              </Button>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}