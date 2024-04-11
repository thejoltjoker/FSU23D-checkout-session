import { z } from "zod";
import { AddressSchema } from "./AddressSchema";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  address: AddressSchema.optional(),
  customerId: z.optional(z.string().startsWith("cus_")),
});

export type User = z.infer<typeof UserSchema>;
