# NextAuth.js Google OAuth Troubleshooting Guide

## Quick Fix Summary

The 500 errors you're seeing are caused by missing environment variables. Here's how to fix them:

### 1. Set Up Environment Variables

Run the setup script:
```bash
node scripts/setup-env.js
```

Or manually create `.env.local` with:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

### 3. Common Error Solutions

#### "Failed to load resource: 500"
- **Cause**: Missing `NEXTAUTH_SECRET` or Google OAuth credentials
- **Fix**: Set up environment variables properly

#### "CLIENT_FETCH_ERROR"
- **Cause**: NextAuth configuration issue
- **Fix**: Check that all required env vars are set

#### "Configuration Error" from Google
- **Cause**: Wrong redirect URI or missing credentials
- **Fix**: Verify Google Console settings match your domain

#### Button not redirecting
- **Cause**: Missing `NEXTAUTH_URL` or wrong callback URL
- **Fix**: Ensure `NEXTAUTH_URL` matches your domain

### 4. Testing Steps

1. Set up environment variables
2. Start development server: `npm run dev`
3. Open browser console (F12)
4. Click Google sign-in button
5. Check for errors in console
6. Verify redirect to Google OAuth

### 5. Production Deployment

For Vercel deployment:
1. Add environment variables in Vercel dashboard
2. Update `NEXTAUTH_URL` to your production domain
3. Update Google Console redirect URI to production URL
4. Redeploy

### 6. Debug Mode

The updated configuration includes debug mode for development:
```typescript
debug: process.env.NODE_ENV === 'development'
```

This will show detailed NextAuth logs in the console.

## Files Modified

- `src/app/api/auth/[...nextauth]/route.ts` - Fixed NextAuth configuration
- `src/app/login/page.tsx` - Improved error handling
- `scripts/setup-env.js` - Environment setup script
- `AUTHENTICATION_FIX_GUIDE.md` - Detailed setup guide

## Next Steps

1. Run the environment setup script
2. Configure Google OAuth credentials
3. Test the sign-in flow
4. Deploy to production with proper environment variables
