import crypto from "crypto";

export const SESSION_COOKIE = "gm_admin_session";

function secret() {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

/** Deterministic token proving the caller knows ADMIN_PASSWORD, without storing the password itself in the cookie. */
export function makeSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD || "admin";
  return crypto.createHmac("sha256", secret()).update(password).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const real = process.env.ADMIN_PASSWORD || "admin";
  // Constant-time-ish comparison
  return (
    candidate.length === real.length &&
    crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(real))
  );
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  return token === makeSessionToken();
}
