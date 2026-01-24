import { z } from "zod";

// Define the schema
export const youtubeSchema = z.object({
  url: z.string().min(1, { message: "Youtube url is required" }),
});
