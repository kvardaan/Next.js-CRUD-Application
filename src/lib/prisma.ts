import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Use a global variable to hold the Prisma client instance in development mode
// This helps avoid exhausting the database connection pool during hot reloading
declare global {
	var prisma: PrismaClient | undefined
}

const globalPrisma = global as unknown as { prisma: PrismaClient | undefined }

if (process.env.NODE_ENV === 'development') {
	if (!globalPrisma.prisma) {
		globalPrisma.prisma = prisma
	}
} else {
	globalPrisma.prisma = prisma
}

// Export the Prisma client instance
export default globalPrisma.prisma
