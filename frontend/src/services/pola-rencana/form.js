import { z } from "zod";

// Define the schema
export const polaRencanaSchema = z.object({
  pdf: z
    .any()
    .refine((file) => file?.length > 0, { message: "PDF is required" }),
});
