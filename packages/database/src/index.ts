import { PrismaClient } from '@prisma/client';

// Global singleton instance of PrismaClient
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Prevent multiple connections during local HMR/live reloads
  const globalWithPrisma = global as typeof globalThis & {
    prisma?: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = globalWithPrisma.prisma;
}

export { prisma, PrismaClient };
export * from '@prisma/client';

/**
 * Executes high-performance similarity search insidepgvector memory tables.
 */
export async function recallSemanticMemory(
  personaId: string,
  queryEmbedding: number[],
  matchCount = 5
): Promise<any[]> {
  const vectorString = `[${queryEmbedding.join(',')}]`;
  
  // Custom Raw SQL query executing Cosine Distance match via pgvector '<=>' operator
  return prisma.$queryRawUnsafe(`
    SELECT id, content, tags, "createdAt",
           (embedding <=> '${vectorString}'::vector) as distance
    FROM "Memory"
    WHERE "personaId" = $1
    ORDER BY distance ASC
    LIMIT $2
  `, personaId, matchCount);
}
