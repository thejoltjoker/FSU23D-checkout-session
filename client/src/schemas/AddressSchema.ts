import { z } from "zod";

const AddressSchema = z.object({
  city: z.string().nullable(),
  country: z.string().nullable(),
  line1: z.string().nullable(),
  line2: z.string().nullable(),
  state: z.string().nullable(),
  postal_code: z.string().nullable(),
});

export type Address = z.infer<typeof AddressSchema>;
