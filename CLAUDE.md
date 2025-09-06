# Invoice Assistant - Development Solutions & Troubleshooting

This file documents common issues and their solutions for the Invoice Assistant project.

## Authentication Issues

### NextAuth Version Compatibility

**Problem**: NextAuth v4 vs v5 compatibility issues with Next.js 15 and TypeScript errors.

**Solution**: 
1. Use NextAuth v5 beta for Next.js 15 compatibility:
   ```bash
   npm install next-auth@beta --legacy-peer-deps
   ```

2. Remove incompatible Prisma adapter if using JWT strategy:
   ```bash
   npm uninstall @next-auth/prisma-adapter
   ```

3. Update authentication route for v5 API:
   ```typescript
   // /src/app/api/auth/[...nextauth]/route.ts
   import NextAuth from 'next-auth'
   import Google from 'next-auth/providers/google'
   
   const handler = NextAuth({
     providers: [Google({...})],
     session: { strategy: "jwt" },
     // ... other config
   })
   
   export { handler as GET, handler as POST }
   ```

### Environment Variable Configuration

**Problem**: Application loading `.env` file with placeholder values instead of actual environment variables.

**Root Cause**: Next.js loads environment files in priority order:
1. `.env.local` (highest priority)
2. `.env.development` / `.env.production`
3. `.env` (lowest priority)

**Solution for Vercel Deployment**:
1. Add `.env` to `.vercelignore` to prevent deployment conflicts:
   ```
   # .vercelignore
   .env
   ```

2. Configure actual environment variables in Vercel dashboard:
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `DATABASE_URL`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

3. Keep `.env.local` for local development with real values
4. Use `.env` only for documentation with placeholder values

### Authentication 500 Errors

**Common Causes**:
- Missing or invalid `NEXTAUTH_SECRET`
- Placeholder values in environment variables
- NextAuth version compatibility issues
- Missing Google OAuth configuration

**Debugging Steps**:
1. Verify environment variables are loaded correctly
2. Check NextAuth version compatibility with Next.js version
3. Ensure Google OAuth credentials are valid
4. Test authentication endpoints return appropriate status codes

## Development Workflow

### Environment Setup Priority
1. **Local Development**: Use `.env.local` with real values
2. **Vercel Deployment**: Configure in Vercel dashboard
3. **Documentation**: Use `.env` with placeholders (add to .vercelignore)

### Deployment Checklist
- [ ] Environment variables configured in Vercel dashboard
  - [ ] `NEXTAUTH_URL` = https://your-app.vercel.app (production URL)
  - [ ] `NEXTAUTH_SECRET` = (secure random string)
  - [ ] `GOOGLE_CLIENT_ID` = (Google OAuth client ID)
  - [ ] `GOOGLE_CLIENT_SECRET` = (Google OAuth client secret)
  - [ ] `DATABASE_URL` = (production database connection)
  - [ ] `STRIPE_SECRET_KEY` = (Stripe secret key)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = (Stripe public key)
- [ ] `.env` added to `.vercelignore`
- [ ] NextAuth version compatible with Next.js version
- [ ] Authentication endpoints returning correct responses
- [ ] No placeholder values in production environment
- [ ] Local `NEXTAUTH_URL` matches development server port

### Critical Lesson: NEXTAUTH_URL Verification
**Always verify that `NEXTAUTH_URL` is correctly set in both environments:**
- Local: `http://localhost:PORT` (match actual dev server port)
- Production: `https://your-app.vercel.app` (exact production domain)

**Failure to set this correctly causes CLIENT_FETCH_ERROR**

## Key Learnings

1. **Environment Variable Priority**: Vercel should use dashboard variables, not committed files
2. **NextAuth Compatibility**: Always match NextAuth version with Next.js requirements
3. **Prisma Adapter**: Remove if using JWT-only strategy to avoid dependency conflicts
4. **Direct Solutions**: Fix root causes instead of implementing workarounds