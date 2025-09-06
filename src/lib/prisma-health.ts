import { prisma } from './prisma'

/**
 * Health check utility for Prisma client
 * Ensures client is properly initialized before use
 */
export async function checkPrismaHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Prisma health check failed:', error)
    return false
  }
}

/**
 * Retry mechanism for Prisma operations
 * Useful for handling cold start issues
 */
export async function withPrismaRetry<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === retries) {
        throw error
      }
      
      console.warn(`Prisma operation failed (attempt ${attempt}/${retries}):`, error)
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
  
  throw lastError
}