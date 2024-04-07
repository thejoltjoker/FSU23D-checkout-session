import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  customerId: z.optional(z.string().startsWith("cus_")),
});

export type User = z.infer<typeof UserSchema>;
