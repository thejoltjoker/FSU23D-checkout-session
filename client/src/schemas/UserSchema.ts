import { z } from "zod";
import { AddressSchema } from "./AddressSchema";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  address: AddressSchema.optional(),
  phone: z.string().optional(),
  customerId: z.optional(z.string().startsWith("cus_")),
});

export type User = z.infer<typeof UserSchema>;
