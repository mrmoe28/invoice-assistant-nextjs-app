"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/super-design/premium-button";
import { superDesignUtils } from "@/lib/super-design";
import { useUsage } from "@/contexts/usage-context";
import { getStripe } from "@/lib/stripe";
import {
  Check,
  Crown,
  Zap,
  FileText,
  Download,
  Mail,
  Users,
  BarChart3,
  Shield,
} from "lucide-react";

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { invoiceCount, isSubscribed, subscriptionPlan } = useUsage();
  const premiumClasses = superDesignUtils.getPremiumClasses();

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(priceId);
      
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold ${premiumClasses.gradientText}`}>
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Start with our free trial, then upgrade to unlock unlimited invoicing power
        </p>
      </div>

      {/* Current Usage */}
      <Card className={`${premiumClasses.glassCard} border-blue-200`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Current Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Invoices Created: {invoiceCount} / {isSubscribed ? "∞" : "3"}
              </p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: isSubscribed ? "100%" : `${Math.min((invoiceCount / 3) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>
            <Badge variant={isSubscribed ? "default" : invoiceCount >= 3 ? "destructive" : "secondary"}>
              {isSubscribed ? "Pro Plan" : invoiceCount >= 3 ? "Trial Expired" : "Trial"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Trial Plan */}
        <Card className={`relative ${premiumClasses.glassCard} ${subscriptionPlan === "trial" ? "ring-2 ring-blue-500" : ""}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-500" />
                <CardTitle>Trial Plan</CardTitle>
              </div>
              {subscriptionPlan === "trial" && !isSubscribed && (
                <Badge>Current Plan</Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">Free</div>
              <CardDescription>Perfect to get started</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>3 free invoice creations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>PDF download & email</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Basic templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Client management</span>
              </li>
            </ul>
            <Button variant="outline" disabled className="w-full">
              {subscriptionPlan === "trial" && !isSubscribed ? "Current Plan" : "Free Forever"}
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className={`relative ${premiumClasses.glassCard} ${isSubscribed ? "ring-2 ring-purple-500" : ""} border-purple-200`}>
          {!isSubscribed && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
          )}
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-purple-500" />
                <CardTitle>Pro Plan</CardTitle>
              </div>
              {isSubscribed && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Current Plan
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">$24.99</div>
              <CardDescription>per month</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="font-medium">Unlimited invoices</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>PDF download & email</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Premium templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Advanced client management</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Analytics & reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Priority support</span>
              </li>
            </ul>
            {isSubscribed ? (
              <Button disabled className="w-full">
                Current Plan
              </Button>
            ) : (
              <PremiumButton
                variant="premium"
                className="w-full"
                onClick={() => handleSubscribe("price_pro_monthly")}
                disabled={loading === "price_pro_monthly"}
              >
                {loading === "price_pro_monthly" ? "Processing..." : "Upgrade to Pro"}
              </PremiumButton>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Comparison */}
      <div className="max-w-4xl mx-auto">
        <Card className={premiumClasses.glassCard}>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>See what's included in each plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Feature</th>
                    <th className="text-center py-3">Trial</th>
                    <th className="text-center py-3">Pro</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Invoice Creation
                    </td>
                    <td className="text-center py-3">3 invoices</td>
                    <td className="text-center py-3">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF Download
                    </td>
                    <td className="text-center py-3">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Invoices
                    </td>
                    <td className="text-center py-3">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Client Management
                    </td>
                    <td className="text-center py-3">Basic</td>
                    <td className="text-center py-3">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </td>
                    <td className="text-center py-3">-</td>
                    <td className="text-center py-3">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Priority Support
                    </td>
                    <td className="text-center py-3">-</td>
                    <td className="text-center py-3">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}