import type { ZodFormattedError } from 'zod';
import { serverSchema, serverEnv } from './schema';

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`;
      }
      return;
    })
    .filter(Boolean);

const _serverEnv = serverSchema.safeParse(serverEnv);
if (!_serverEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_serverEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

export const env = { ..._serverEnv.data };
