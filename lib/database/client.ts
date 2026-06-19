import { PrismaClient } from "@prisma/client";

const globalForDatabase = globalThis as unknown as {
  databaseClient?: PrismaClient;
};

export const database = globalForDatabase.databaseClient ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.databaseClient = database;
}
