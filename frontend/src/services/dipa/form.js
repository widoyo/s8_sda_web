import { z } from "zod";

// Define the schema
export const dipaSchema = (isEdit) =>
  z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    dipa: isEdit
      ? z.any().optional() // Optional when editing
      : z
          .any()
          .refine((file) => file?.length > 0, { message: "PDF is required" }),
  });
