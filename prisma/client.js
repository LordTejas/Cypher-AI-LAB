import { PrismaClient } from '@prisma/client'
import { getPrismaClient } from '@prisma/client/runtime/library';

let prisma;

const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}