import { PrismaClient } from "@prisma/client";

const globalForDatabase = globalThis as unknown as {
  databaseClient?: PrismaClient;
};

export const database =
  globalForDatabase.databaseClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.databaseClient = database;
}
