import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(50),
  description: z.string().trim().min(1, "Description is required"),
});

export const updatePostSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(50),
    description: z.string().trim().min(1, "Description is required"),
  })
  .partial();
