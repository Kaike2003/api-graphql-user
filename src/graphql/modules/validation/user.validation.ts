import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(40),
  email: z.string().email(),
  age: z.number().int(),
});

export const createUserSchema = schema;

export type TCreateUserSchema = z.infer<typeof createUserSchema>;
