import { PrismaClient } from '@prisma/client';

// Declare global variable
declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma client instance
export const prisma = global.prisma || new PrismaClient();

// Set global 'prisma' variable if NODE_ENV is not 'production'
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Async function to connect to the database
async function connectDB() {
  try {
    await prisma.$connect();
    console.log('? Database connected successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export default connectDB;
