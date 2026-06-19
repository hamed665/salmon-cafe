import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const normalizedPassword = password.trim();

  if (normalizedPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(normalizedPassword, salt, KEY_LENGTH).toString("hex");

  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string | null | undefined) {
  if (!storedHash) return false;

  const [algorithm, salt, hash] = storedHash.split(":");
  if (algorithm !== "scrypt" || !salt || !hash) return false;

  const candidate = scryptSync(password.trim(), salt, KEY_LENGTH);
  const expected = Buffer.from(hash, "hex");

  if (candidate.length !== expected.length) return false;

  return timingSafeEqual(candidate, expected);
}
