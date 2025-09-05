"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UsageContextType {
  invoiceCount: number;
  isTrialExhausted: boolean;
  isSubscribed: boolean;
  subscriptionPlan: "trial" | "pro" | null;
  incrementInvoiceCount: () => void;
  resetUsage: () => void;
  setSubscriptionStatus: (plan: "trial" | "pro", subscribed: boolean) => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<"trial" | "pro" | null>("trial");
  
  const TRIAL_LIMIT = 3;
  const isTrialExhausted = invoiceCount >= TRIAL_LIMIT && !isSubscribed;

  useEffect(() => {
    const storedCount = localStorage.getItem("invoice-count");
    const storedSubscription = localStorage.getItem("subscription-status");
    const storedPlan = localStorage.getItem("subscription-plan");
    
    if (storedCount) {
      setInvoiceCount(parseInt(storedCount, 10));
    }
    
    if (storedSubscription) {
      setIsSubscribed(JSON.parse(storedSubscription));
    }
    
    if (storedPlan) {
      setSubscriptionPlan(storedPlan as "trial" | "pro");
    }
  }, []);

  const incrementInvoiceCount = () => {
    const newCount = invoiceCount + 1;
    setInvoiceCount(newCount);
    localStorage.setItem("invoice-count", newCount.toString());
  };

  const resetUsage = () => {
    setInvoiceCount(0);
    localStorage.removeItem("invoice-count");
  };

  const setSubscriptionStatus = (plan: "trial" | "pro", subscribed: boolean) => {
    setSubscriptionPlan(plan);
    setIsSubscribed(subscribed);
    localStorage.setItem("subscription-status", JSON.stringify(subscribed));
    localStorage.setItem("subscription-plan", plan);
  };

  return (
    <UsageContext.Provider
      value={{
        invoiceCount,
        isTrialExhausted,
        isSubscribed,
        subscriptionPlan,
        incrementInvoiceCount,
        resetUsage,
        setSubscriptionStatus,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
}

export function useUsage() {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
}