import { z } from 'zod';

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  EXAMPLE: z.string(),
});

export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
  EXAMPLE: process.env.EXAMPLE,
};
