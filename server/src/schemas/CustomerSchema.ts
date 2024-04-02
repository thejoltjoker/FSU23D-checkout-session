import { z } from "zod";

export const CustomerSchema = z.object({
  name: z.string(),
  address: z.object({}),
  email: z.string().email(),
});

export type Customer = z.infer<typeof CustomerSchema>;
