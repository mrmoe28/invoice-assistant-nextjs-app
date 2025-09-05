"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { PremiumCard } from "@/components/super-design/premium-card";
import { PremiumButton } from "@/components/super-design/premium-button";
import { Button } from "@/components/ui/button";
import { superDesignColors } from "@/lib/super-design";
import { cn } from "@/lib/utils";
import {
  FileText,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    }, 2000);
  };

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security for your invoice data"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create professional invoices in seconds"
    },
    {
      icon: Sparkles,
      title: "Think Different",
      description: "Revolutionary approach to invoice management"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Invoice Assistant
                </h1>
                <p className="text-sm text-gray-500">Think different</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Here's to the crazy ones
              </h2>
              <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                The misfits. The rebels. The troublemakers. The round pegs in the square holes.
                The ones who see things differently.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 max-w-md mx-auto lg:mx-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  index === 0 && "bg-gradient-to-r from-green-500 to-emerald-500",
                  index === 1 && "bg-gradient-to-r from-yellow-500 to-orange-500",
                  index === 2 && "bg-gradient-to-r from-purple-500 to-pink-500"
                )}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-600">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center lg:justify-end">
          <PremiumCard variant="premium" className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
                <p className="text-gray-600">Sign in to your account to continue</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <PremiumButton
                  type="submit"
                  variant="thinkDifferent"
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </PremiumButton>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 font-medium hover:bg-gray-50"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 font-medium hover:bg-gray-50"
                  disabled
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.341-.09.394-.293 1.192-.334 1.358-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.726-1.378l-.737 2.82c-.265 1.026-.98 2.314-1.457 3.104 1.089.337 2.268.52 3.57.52 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001"/>
                  </svg>
                  Apple
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up for free
                </a>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}