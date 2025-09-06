#!/usr/bin/env node

/**
 * Prisma Client Verification Script for Vercel Deployment
 * This script ensures Prisma client is properly generated and accessible
 */

const { exec } = require('child_process')
const { existsSync } = require('fs')
const path = require('path')

async function verifyPrismaClient() {
  console.log('🔍 Verifying Prisma Client setup...')
  
  // Check if Prisma client exists
  const prismaClientPath = path.join(process.cwd(), 'node_modules', '@prisma', 'client')
  if (!existsSync(prismaClientPath)) {
    console.error('❌ Prisma Client not found in node_modules')
    process.exit(1)
  }
  
  // Check if generated client exists
  const generatedClientPath = path.join(prismaClientPath, 'index.js')
  if (!existsSync(generatedClientPath)) {
    console.error('❌ Generated Prisma Client not found')
    console.log('🔧 Running prisma generate...')
    
    await new Promise((resolve, reject) => {
      exec('npx prisma generate', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Failed to generate Prisma Client:', error)
          reject(error)
        } else {
          console.log('✅ Prisma Client generated successfully')
          resolve(stdout)
        }
      })
    })
  }
  
  // Try importing Prisma Client
  try {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    console.log('✅ Prisma Client import successful')
    
    // Test basic connection (if DATABASE_URL is available)
    if (process.env.DATABASE_URL) {
      try {
        await prisma.$queryRaw`SELECT 1`
        console.log('✅ Database connection test successful')
      } catch (dbError) {
        console.warn('⚠️  Database connection test failed (expected in CI/build):', dbError.message)
      } finally {
        await prisma.$disconnect()
      }
    }
    
    console.log('🎉 All Prisma Client verifications passed!')
    
  } catch (importError) {
    console.error('❌ Failed to import Prisma Client:', importError)
    process.exit(1)
  }
}

verifyPrismaClient().catch(error => {
  console.error('❌ Verification failed:', error)
  process.exit(1)
})