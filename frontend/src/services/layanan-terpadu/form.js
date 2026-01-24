import { z } from "zod";

// Define the schema
export const layananTerpaduSchema = (isEdit) =>
  z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" }),
    platform: z.enum(["website", "mobile"], {
      errorMap: () => ({ message: "Platform selection is required" }),
    }),
    url: z.string().min(1, { message: "url is required" }),
    description: z.string(),
    img: isEdit
      ? z.any().optional() // Optional when editing
      : z
          .any()
          .refine((file) => file?.length > 0, { message: "Image is required" }), // Required when creating
  });
