import { z } from "zod";

// Define the schema
export const pengumumanSchema = (isEdit) =>
  z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    pengumuman: isEdit
      ? z.any().optional() // Optional when editing
      : z
          .any()
          .refine((file) => file?.length > 0, { message: "File is required" }),
  });
