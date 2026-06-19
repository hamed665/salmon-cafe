import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../lib/auth/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const fullName = process.env.ADMIN_NAME?.trim() || "Platform Admin";

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  }

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters long.");
  }

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      fullName,
      passwordHash: hashPassword(password),
      role: UserRole.PLATFORM_ADMIN
    },
    create: {
      email,
      fullName,
      passwordHash: hashPassword(password),
      role: UserRole.PLATFORM_ADMIN
    }
  });

  console.log(`Admin user ready: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
