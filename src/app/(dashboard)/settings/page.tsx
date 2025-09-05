"use client";

import { useState } from "react";
import { PremiumCard } from "@/components/super-design/premium-card";
import { PremiumButton } from "@/components/super-design/premium-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Mail,
  Save,
  Upload,
  Camera,
  Eye,
  EyeOff,
  Check,
  Moon,
  Sun,
  Monitor,
  FileText,
  Zap,
  Star,
  Plus,
} from "lucide-react";

type TabType = "profile" | "company" | "billing" | "notifications" | "security" | "appearance";

const tabs = [
  { id: "profile" as TabType, label: "Profile", icon: User },
  { id: "company" as TabType, label: "Company", icon: Building2 },
  { id: "billing" as TabType, label: "Billing", icon: CreditCard },
  { id: "notifications" as TabType, label: "Notifications", icon: Bell },
  { id: "security" as TabType, label: "Security", icon: Shield },
  { id: "appearance" as TabType, label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState("system");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
                <p className="text-gray-600">john.doe@example.com</p>
                <p className="text-sm text-gray-500 mt-1">Member since December 2024</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Time Zone</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        );

      case "company":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Company Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Drop your logo here or click to upload</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  defaultValue="Your Company Inc."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tax ID / EIN</label>
                <input
                  type="text"
                  placeholder="12-3456789"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Business Type</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200">
                  <option>LLC</option>
                  <option>Corporation</option>
                  <option>Partnership</option>
                  <option>Sole Proprietorship</option>
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Business Address</label>
                <textarea
                  rows={3}
                  placeholder="Street address, city, state, zip code"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Default Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="8.25"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Currency</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>CAD (C$)</option>
                </select>
              </div>
            </div>

            <PremiumCard title="💼 Invoice Defaults" variant="glass" className="bg-blue-50/50 border border-blue-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Payment Terms (Days)</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200">
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="45">45 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Late Fee (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Invoice Footer</label>
                  <textarea
                    rows={3}
                    placeholder="Thank you for your business! Payment is due within 30 days."
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </PremiumCard>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-8">
            {/* Current Plan */}
            <PremiumCard title="💎 Current Plan" variant="premium">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro Plan</h3>
                    <p className="text-gray-600">Unlimited invoices and advanced features</p>
                    <p className="text-sm text-gray-500 mt-1">Renews on January 15, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    $29
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>
            </PremiumCard>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PremiumCard variant="glass" className="text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">248</div>
                    <div className="text-sm text-gray-500">Invoices this month</div>
                    <div className="text-xs text-green-600 font-medium">Unlimited</div>
                  </div>
                </div>
              </PremiumCard>
              
              <PremiumCard variant="glass" className="text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mx-auto flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1,847</div>
                    <div className="text-sm text-gray-500">Emails sent</div>
                    <div className="text-xs text-green-600 font-medium">Unlimited</div>
                  </div>
                </div>
              </PremiumCard>
              
              <PremiumCard variant="glass" className="text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">99.8%</div>
                    <div className="text-sm text-gray-500">Uptime</div>
                    <div className="text-xs text-green-600 font-medium">SLA: 99.9%</div>
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* Payment Methods */}
            <PremiumCard title="💳 Payment Methods">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/27</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Primary
                    </span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors duration-200">
                  <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Add new payment method</span>
                </button>
              </div>
            </PremiumCard>

            {/* Billing History */}
            <PremiumCard title="📋 Billing History">
              <div className="space-y-4">
                {[
                  { date: "Dec 15, 2024", amount: "$29.00", status: "Paid", invoice: "INV-2024-12" },
                  { date: "Nov 15, 2024", amount: "$29.00", status: "Paid", invoice: "INV-2024-11" },
                  { date: "Oct 15, 2024", amount: "$29.00", status: "Paid", invoice: "INV-2024-10" },
                ].map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{bill.invoice}</div>
                        <div className="text-sm text-gray-500">{bill.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{bill.amount}</div>
                      <div className="text-sm text-green-600">{bill.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-8">
            <PremiumCard title="📧 Email Notifications">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Invoice Updates</div>
                    <div className="text-sm text-gray-500">Get notified when invoices are paid or overdue</div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      emailNotifications ? "bg-blue-600" : "bg-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        emailNotifications ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Marketing Emails</div>
                    <div className="text-sm text-gray-500">Receive product updates and special offers</div>
                  </div>
                  <button
                    onClick={() => setMarketingEmails(!marketingEmails)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      marketingEmails ? "bg-blue-600" : "bg-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        marketingEmails ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard title="📱 Push Notifications">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Browser Notifications</div>
                    <div className="text-sm text-gray-500">Receive notifications in your browser</div>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      pushNotifications ? "bg-blue-600" : "bg-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        pushNotifications ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard title="⏰ Notification Schedule">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Quiet Hours Start</label>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Quiet Hours End</label>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </PremiumCard>
          </div>
        );

      case "security":
        return (
          <div className="space-y-8">
            <PremiumCard title="🔐 Password & Authentication">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <Button variant="outline">Update Password</Button>
              </div>
            </PremiumCard>

            <PremiumCard title="🔒 Two-Factor Authentication">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      twoFactorEnabled ? "bg-blue-600" : "bg-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
                
                {twoFactorEnabled && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <div className="font-medium text-green-800">Two-factor authentication is enabled</div>
                        <div className="text-sm text-green-600">Your account is protected with 2FA</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </PremiumCard>

            <PremiumCard title="📱 Active Sessions">
              <div className="space-y-4">
                {[
                  { device: "MacBook Pro", location: "San Francisco, CA", current: true },
                  { device: "iPhone 15", location: "San Francisco, CA", current: false },
                  { device: "Chrome on Windows", location: "New York, NY", current: false },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center">
                          {session.device}
                          {session.current && (
                            <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{session.location}</div>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-8">
            <PremiumCard title="🌙 Theme">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div 
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                      darkMode === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setDarkMode("light")}
                  >
                    <Sun className="w-8 h-8 text-yellow-500" />
                    <div>
                      <div className="font-medium text-gray-900">Light Mode</div>
                      <div className="text-sm text-gray-500">Clean and bright interface</div>
                    </div>
                  </div>
                  
                  <div 
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                      darkMode === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setDarkMode("dark")}
                  >
                    <Moon className="w-8 h-8 text-purple-500" />
                    <div>
                      <div className="font-medium text-gray-900">Dark Mode</div>
                      <div className="text-sm text-gray-500">Easy on the eyes in low light</div>
                    </div>
                  </div>
                  
                  <div 
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                      darkMode === "system" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setDarkMode("system")}
                  >
                    <Monitor className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-medium text-gray-900">System</div>
                      <div className="text-sm text-gray-500">Follow your system preference</div>
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard title="🎨 Color Scheme">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Blue", colors: "from-blue-500 to-indigo-600", active: true },
                  { name: "Purple", colors: "from-purple-500 to-pink-600", active: false },
                  { name: "Green", colors: "from-green-500 to-emerald-600", active: false },
                  { name: "Orange", colors: "from-orange-500 to-red-600", active: false },
                ].map((scheme) => (
                  <div
                    key={scheme.name}
                    className={cn(
                      "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 group",
                      scheme.active ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={cn("w-full h-16 rounded-lg bg-gradient-to-r", scheme.colors)} />
                    <div className="mt-3 text-center">
                      <div className="font-medium text-gray-900">{scheme.name}</div>
                    </div>
                    {scheme.active && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard title="📏 Interface Settings">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Interface Density</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200">
                    <option>Comfortable</option>
                    <option>Compact</option>
                    <option>Spacious</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Animation Speed</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 transition-all duration-200">
                    <option>Normal</option>
                    <option>Fast</option>
                    <option>Slow</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
            </PremiumCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <PremiumCard variant="glass">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </PremiumCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <PremiumCard variant="premium" className="bg-gradient-to-br from-white to-gray-50">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex justify-end pt-8 mt-8 border-t border-gray-200">
              <PremiumButton variant="premium" size="lg">
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </PremiumButton>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}