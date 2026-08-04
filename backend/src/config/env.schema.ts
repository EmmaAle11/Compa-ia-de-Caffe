/**
 * [BACKEND - Configuration]
 * Fail-fast environment validation. The app refuses to boot with a bad/missing config
 * instead of discovering it at the first request.
 */

import { z } from 'zod';

/**
 * An unset variable and an empty one (`FOO=` in a .env template) mean the same thing:
 * not configured. Without this, a blank line in .env.example blocks boot.
 */
const optionalSecret = z.preprocess(
  (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
  z.string().min(1).optional()
);

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().positive().default(3000),
  WEB_ORIGIN: z.string().url().default('http://localhost:5173'),

  // Optional while the corresponding adapter is not wired yet.
  GEMINI_API_KEY: optionalSecret,
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(raw: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Invalid environment configuration:\n${parsed.error.toString()}`);
  }
  return parsed.data;
}
