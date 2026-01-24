import { z } from "zod";

// Define the schema
export const majalahSchema = (isEdit) =>
  z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    thumbnail: isEdit
      ? z.any().optional() // Optional when editing
      : z
          .any()
          .refine((file) => file?.length > 0, { message: "Image is required" }), // Required when creating
    majalah: isEdit
      ? z.any().optional() // Optional when editing
      : z
          .any()
          .refine((file) => file?.length > 0, { message: "PDF is required" }),
  });
