import { z } from "zod";

// Define the schema
export const strukturOrganisasiSchema = z.object({
  img: z
    .any()
    .refine((file) => file?.length > 0, { message: "Image is required" }),
});
