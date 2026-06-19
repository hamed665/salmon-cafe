"use server";

import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { database } from "@/lib/database/client";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { clearAuthSession, setAuthSession } from "@/lib/auth/session";

function normalizeEmail(value: FormDataEntryValue | null) {
  return value?.toString().trim().toLowerCase() ?? "";
}

function readPassword(value: FormDataEntryValue | null) {
  return value?.toString() ?? "";
}

function safeRedirectPath(value: FormDataEntryValue | null) {
  const path = value?.toString();
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/dashboard";
  return path;
}

export async function loginAction(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = readPassword(formData.get("password"));
  const nextPath = safeRedirectPath(formData.get("next"));

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  const user = await database.user.findUnique({ where: { email } });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirect("/login?error=invalid_credentials");
  }

  await setAuthSession({ id: user.id, role: user.role });
  redirect(nextPath);
}

export async function registerAction(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const fullName = formData.get("fullName")?.toString().trim() || null;
  const mobile = formData.get("mobile")?.toString().trim() || null;
  const password = readPassword(formData.get("password"));

  if (!email || !password || password.length < 8) {
    redirect("/register?error=invalid_fields");
  }

  const existingUser = await database.user.findUnique({ where: { email } });
  if (existingUser) {
    redirect("/register?error=email_exists");
  }

  const user = await database.user.create({
    data: {
      email,
      fullName,
      mobile,
      passwordHash: hashPassword(password),
      role: UserRole.CAFE_OWNER
    }
  });

  await setAuthSession({ id: user.id, role: user.role });
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearAuthSession();
  redirect("/login");
}
