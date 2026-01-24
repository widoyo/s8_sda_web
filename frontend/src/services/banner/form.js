import { z } from "zod";

// Define the schema
export const bannerSchema = z.object({
  banners: z
    .any()
    .refine((file) => file?.length > 0, { message: "Image is required" }),
});
