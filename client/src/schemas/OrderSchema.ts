import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  customerId: z.string(),
  email: z.string().email(),
  totalAmount: z.number(),
  servicePointId: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
