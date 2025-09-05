# 🚀 Vercel Deployment Reference Guide

## **Pre-Deployment Checklist** ✅

**Run this checklist EVERY TIME before deploying to Vercel:**

### 1. **TypeScript & Lint Validation**
```bash
# ALWAYS run these commands before any deployment
npm run lint          # Must pass with 0 errors
npm run build         # Must compile successfully
npx tsc --noEmit      # Check types without emitting files
```

### 2. **Environment Variables Setup**
```bash
# Check what's currently set in Vercel
vercel env ls

# Required for most Next.js apps with auth:
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production  
vercel env add DATABASE_URL production
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
```

### 3. **Database Preparation (if using Prisma)**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npm run db:push

# Verify connection
npx prisma studio
```

---

## 🐛 **Common Vercel Deployment Errors & Solutions**

### **Error 1: TypeScript Unused Import Warnings**
```
Warning: 'NextAuth' is defined but never used. @typescript-eslint/no-unused-vars
```
**✅ Solution:**
- Only import what you actually use
- For type declarations, avoid unnecessary imports
- **Example Fix:**
```typescript
// ❌ Bad
import NextAuth from "next-auth"
declare module "next-auth" { ... }

// ✅ Good  
declare module "next-auth" { ... }
```

### **Error 2: ESLint no-require-imports**
```
A `require()` style import is forbidden @typescript-eslint/no-require-imports
```
**✅ Solution:**
```typescript
// ❌ Bad
plugins: [require("tailwindcss-animate")]

// ✅ Good
import tailwindcssAnimate from "tailwindcss-animate";
plugins: [tailwindcssAnimate]
```

### **Error 3: Prisma Client Initialization**
```
Error: @prisma/client did not initialize yet. Please run 'prisma generate'
```
**✅ Solution:**
```bash
npx prisma generate
```
**Always run after:**
- Changing prisma/schema.prisma
- Fresh git clone
- npm install

### **Error 4: NextAuth Import Compatibility (Next.js 15)**
```
Type error: This expression is not callable. Type 'typeof import("next-auth")' has no call signatures.
```
**✅ Solution:**
```typescript
// ❌ Bad (works in Next.js 14)
import NextAuth from 'next-auth'

// ✅ Good (Next.js 15 compatible)
import { NextAuth } from 'next-auth'
```

### **Error 5: Type Overlap Warnings**
```
This comparison appears to be unintentional because the types have no overlap
```
**✅ Solution - Use Discriminated Unions:**
```typescript
// ❌ Bad
type Status = "positive" as const;
if (status === "negative") { } // TypeScript knows this is impossible

// ✅ Good
type Status = "positive" | "negative" | "neutral";
const getStyle = (status: Status) => cn(
  status === "positive" && "text-green-500",
  status === "negative" && "text-red-500", 
  status === "neutral" && "text-gray-500"
);
```

### **Error 6: ESLint no-explicit-any**
```
Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
```
**✅ Solution:**
```typescript
// ❌ Bad
icon: any;

// ✅ Good
icon: React.ComponentType<{ className?: string }>;
```

---

## 🔧 **Vercel-Specific Configuration**

### **Next.js Config Optimization**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence workspace root warning
  outputFileTracingRoot: __dirname,
  
  // Optimize for Vercel
  experimental: {
    optimizeCss: true,
  },
  
  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint strict mode  
  eslint: {
    ignoreDuringBuilds: false,
  }
};

module.exports = nextConfig;
```

### **Vercel Environment Variables**
**Standard Next.js App Variables:**
```bash
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secure-secret-key
DATABASE_URL=postgresql://user:pass@host/db
```

**Add Variables via CLI:**
```bash
# Single variable
echo "your-secret-value" | vercel env add VARIABLE_NAME production

# Multiple variables
vercel env add DATABASE_URL production
# Paste your database URL when prompted
```

---

## 🚨 **Emergency Deployment Workflow**

When deployment fails, follow this **exact sequence**:

1. **📸 Take screenshot of error**
2. **🔍 Find error in this guide** 
3. **🛠️ Apply specific solution**
4. **✅ Test locally:**
   ```bash
   npm run lint && npm run build
   ```
5. **🚀 Deploy:**
   ```bash
   git add . && git commit -m "fix: specific error description" && git push
   ```
6. **♻️ Repeat if more errors appear**

---

## 📋 **TypeScript Best Practices for Vercel**

### **Use Strict TypeScript Configuration**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### **Import Best Practices**
```typescript
// ✅ Always use ES6 imports
import React from 'react';
import type { NextPage } from 'next';

// ✅ Use type-only imports when possible
import type { Session } from 'next-auth';

// ✅ Avoid default imports for libraries that don't support them
import { NextAuth } from 'next-auth'; // Not: import NextAuth
```

### **Component Type Definitions**
```typescript
// ✅ Proper component typing
interface Props {
  title: string;
  status: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}

const MyComponent: React.FC<Props> = ({ title, status, icon: Icon }) => {
  return (
    <div className={cn(
      status === "positive" && "text-green-500",
      status === "negative" && "text-red-500",
      status === "neutral" && "text-gray-500"
    )}>
      <Icon className="w-4 h-4" />
      {title}
    </div>
  );
};
```

---

## 🎯 **Project Setup Template**

**For every new project deploying to Vercel:**

1. **Install Core Dependencies**
```bash
npm install @types/node @types/react @types/react-dom
npm install -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. **Setup TypeScript Config**
```bash
npx tsc --init --strict --target es2022 --module esnext --moduleResolution node
```

3. **Configure ESLint**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-require-imports": "error"
  }
}
```

4. **Pre-commit Hook (Optional)**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run build"
    }
  }
}
```

---

## 📚 **Quick Reference Commands**

```bash
# Pre-deployment validation
npm run lint && npm run build

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME production

# Database (Prisma)
npx prisma generate
npx prisma db push

# Emergency deployment
git add . && git commit -m "fix: [error]" && git push

# Check deployment status
vercel logs --limit=50
```

---

**🎯 Remember: This file should be your FIRST reference when any Vercel deployment error occurs!**

*Last Updated: September 2025*