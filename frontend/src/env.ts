import z from 'zod';

export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
export const env: Env = envSchema.parse(import.meta.env);
