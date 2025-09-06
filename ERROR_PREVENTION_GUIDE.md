# 🚫 Error Prevention Guide - Invoice Assistant

## Quick Reference for Common TypeScript & Next.js Errors

### 1. **Type Overlap Errors** ⚠️

**Error**: `This comparison appears to be unintentional because the types have no overlap`

**Root Cause**: Comparing union types that TypeScript knows can never be equal

**❌ Bad Example**:
```typescript
type Status = "positive" as const;
// All values are "positive", so checking for "negative" will always be false
if (stat.changeType === "negative") { /* never runs */ }
```

**✅ Best Practice Solution**:
```typescript
// Use proper discriminated unions
type StatChangeType = "positive" | "negative" | "neutral";

// Use explicit conditions instead of ternary
const bgColor = cn(
  stat.changeType === "positive" && "bg-green-100",
  stat.changeType === "negative" && "bg-red-100", 
  stat.changeType === "neutral" && "bg-gray-100"
);
```

### 2. **NextAuth TypeScript Errors** 🔐

**Error**: `Property 'id' does not exist on type Session.user`

**Root Cause**: NextAuth types don't include custom properties by default

**✅ Solution**:
```typescript
// Create types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  interface User {
    id: string
  }
}
```

### 3. **Build Compilation Failures** 🏗️

**Error**: `Next.js build worker exited with code: 1`

**Root Cause**: TypeScript errors prevent successful compilation

**Prevention Checklist**:
- ✅ Run `npm run build` locally before pushing
- ✅ Fix all TypeScript errors shown in terminal
- ✅ Use strict TypeScript configuration
- ✅ Test type-checking with `tsc --noEmit`

### 4. **Environment Variable Issues** 🌍

**Error**: `Configuration error` in NextAuth or API routes

**Root Cause**: Missing or incorrect environment variables

**Prevention Steps**:
```bash
# Always check Vercel env vars are set
vercel env ls

# Required variables checklist:
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="secure-secret-key"
NEXTAUTH_URL="https://your-app.vercel.app" 
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### 5. **Prisma Client Initialization Errors** 🗄️

**Error**: `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`

**Root Cause**: Prisma client hasn't been generated after schema changes or fresh installation

**✅ Solution**:
```bash
# Generate the Prisma client
npm run db:generate
# or
npx prisma generate

# Then test the build
npm run build
```

**Prevention Protocol**:
```bash
# 1. Always generate client after schema changes
npm run db:generate

# 2. Test connection locally
npm run db:push

# 3. Verify schema is current
npx prisma generate

# 4. Check production database
npx prisma studio
```

### 6. **Database Connection Errors** 🗄️

**Error**: Database connection failures or schema issues

**Prevention Protocol**:
```bash
# 1. Test connection locally
npm run db:push

# 2. Verify schema is current
npx prisma generate

# 3. Check production database
npx prisma studio
```

---

## 🔄 **Error Fix Workflow**

### When You Encounter Any Error:

1. **📸 Screenshot** - Capture the exact error message
2. **🔍 Analyze** - Identify the error type from this guide
3. **🛠️ Apply Fix** - Use the specific solution pattern
4. **✅ Test Locally** - Run `npm run build` to verify
5. **🚀 Deploy** - Commit and push to trigger deployment
6. **♻️ Repeat** - If new errors appear, repeat process

### 🚨 **Emergency Deployment Commands**

```bash
# Quick fix and deploy sequence:
git add . && git commit -m "fix: resolve [error-type]" && git push

# Check deployment status:
vercel env ls
vercel logs --limit=50
```

---

## 📋 **Pre-Deployment Checklist**

Before every commit:

- [ ] `npm run build` passes locally
- [ ] No TypeScript errors in terminal
- [ ] Environment variables are set in Vercel
- [ ] Database schema is up to date
- [ ] All imports are correct and exist

---

## 🎯 **TypeScript Best Practices (2025)**

### Use Discriminated Unions
```typescript
// ✅ Good
type ApiState = 
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; message: string }

// ❌ Avoid
type ApiState = {
  status: "loading" | "success" | "error"
  data?: any
  message?: string
}
```

### Proper Type Narrowing
```typescript
// ✅ Use type guards
if (apiState.status === "success") {
  // TypeScript knows apiState.data exists
  console.log(apiState.data)
}
```

### Use `as const` for Literal Types
```typescript
// ✅ Preserves exact literal types
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"
```

---

**Remember**: Every error is an opportunity to improve our type safety and prevent future issues! 🛡️