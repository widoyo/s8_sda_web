import { z } from "zod";

// Define the schema
export const petaGeolocationSchema = (isEdit) =>
  z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    location: z.string().min(1, { message: "Location is required" }),
    file: isEdit
      ? z.any().optional() // Optional when editing
      : z
          .any()
          .refine((file) => file?.length > 0, { message: "File is required" }),
  });
