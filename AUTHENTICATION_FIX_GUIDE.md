# NextAuth.js Google OAuth Fix Guide

## Issues Identified

1. **Missing Environment Variables**: The NextAuth configuration requires `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`
2. **NextAuth v4 Compatibility**: The current setup has compatibility issues with Next.js 15
3. **Missing NEXTAUTH_URL**: Required for proper OAuth redirects
4. **Session Strategy Mismatch**: JWT strategy without proper user handling

## Required Environment Variables

Create a `.env.local` file in your project root with:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth Configuration  
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# For production, update NEXTAUTH_URL to your domain
# NEXTAUTH_URL=https://your-domain.com
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`

## NextAuth Configuration Fixes

The main issues in your current setup:
- Missing required environment variables
- Incompatible session strategy with JWT
- Missing proper error handling
- TypeScript compatibility issues

## Testing Steps

1. Set up environment variables
2. Configure Google OAuth credentials
3. Test locally with `npm run dev`
4. Check browser console for errors
5. Test Google sign-in flow

## Common Error Solutions

- **500 Internal Server Error**: Usually missing environment variables
- **CLIENT_FETCH_ERROR**: NextAuth configuration issue
- **Configuration Error**: Google OAuth setup problem
- **Redirect URI Mismatch**: Check Google Console settings
