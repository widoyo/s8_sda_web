import { z } from "zod";

// Define the schema
export const tugasFungsiSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});
