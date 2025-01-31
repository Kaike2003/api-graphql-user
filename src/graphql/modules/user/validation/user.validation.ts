import { z } from "zod";

const schema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId"),
  name: z.string().min(2).max(40),
  email: z.string().email(),
  age: z.number().int(),
});

export const mutationCreateUserSchema = schema.omit({ id: true });
export const mutationDeleteUserByEmailSchema = schema.pick({ email: true });
export const mutationUpdateUserSchema = schema.omit({ id: true });
export const mutationUpdateUserByEmailSchema = schema.pick({ email: true, id: true });
export const queryUserSchema = schema.pick({ email: true });

export type TMutationCreateUserSchema = z.infer<typeof mutationCreateUserSchema>;
export type TMutationDeleteUserByEmailSchema = z.infer<typeof mutationDeleteUserByEmailSchema>;
export type TMutationUpdateUserSchema = z.infer<typeof mutationUpdateUserSchema>;
export type TMutationUpdateUserByEmailSchema = z.infer<typeof mutationUpdateUserByEmailSchema>;
export type TQueryUserSchema = z.infer<typeof queryUserSchema>;
