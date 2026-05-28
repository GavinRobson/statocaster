import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import "dotenv/config"

function initPrisma() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is not set")
  
  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

declare global {
  var __prisma: PrismaClient | undefined; 
}

export const prisma: PrismaClient =
  globalThis.__prisma ?? (globalThis.__prisma = initPrisma())

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma
}

