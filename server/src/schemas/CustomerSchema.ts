import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.optional(z.object({})),
});

export type Customer = z.infer<typeof CustomerSchema>;
