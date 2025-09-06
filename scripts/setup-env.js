#!/usr/bin/env node

/**
 * Environment Setup Script for NextAuth.js Google OAuth
 * 
 * This script helps you set up the required environment variables
 * for Google OAuth authentication with NextAuth.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

// Generate a secure random secret
function generateSecret() {
  return crypto.randomBytes(32).toString('hex');
}

// Create .env.local file
function createEnvFile() {
  const envContent = `# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${generateSecret()}

# Google OAuth Configuration
# Get these from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database (if using Prisma)
# DATABASE_URL="postgresql://username:password@localhost:5432/invoice_assistant"

# For production deployment, update NEXTAUTH_URL to your domain:
# NEXTAUTH_URL=https://your-domain.com
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
}

// Create .env.example file
function createEnvExample() {
  const exampleContent = `# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database (if using Prisma)
# DATABASE_URL="postgresql://username:password@localhost:5432/invoice_assistant"
`;

  fs.writeFileSync(envExamplePath, exampleContent);
  console.log('✅ Created .env.example file');
}

// Main setup function
function setup() {
  console.log('🚀 Setting up NextAuth.js environment...\n');

  try {
    // Check if .env.local already exists
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env.local already exists. Skipping creation.');
    } else {
      createEnvFile();
    }

    // Create .env.example if it doesn't exist
    if (!fs.existsSync(envExamplePath)) {
      createEnvExample();
    }

    console.log('\n📋 Next steps:');
    console.log('1. Get Google OAuth credentials from: https://console.cloud.google.com/');
    console.log('2. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local');
    console.log('3. Set authorized redirect URI in Google Console:');
    console.log('   - Development: http://localhost:3000/api/auth/callback/google');
    console.log('   - Production: https://your-domain.com/api/auth/callback/google');
    console.log('4. Run: npm run dev');
    console.log('\n✨ Setup complete!');

  } catch (error) {
    console.error('❌ Error setting up environment:', error.message);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setup();
}

module.exports = { setup, generateSecret };
