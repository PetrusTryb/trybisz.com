import { z, defineCollection } from "astro:content";

export const collections = {
  projects: defineCollection({
    schema: ({ image }) => z.object({
      cover: image().refine((img) => img.width >= 500, {
        message: "Cannot Determine file to upload - must be at least 500px wide",
      }).optional(),
      title: z.string().max(120),
      publicationDate: z.date(),
      published: z.boolean(),
      url: z.string().max(150).optional(),
      shortDescription: z.string().max(1000).optional(), // If repo provided, this can be fetched automatically
      tags: z.array(z.string()).max(120).optional(), // Read in the file if not GitHub URL provided
      extendedData: z.object({
        homepage: z.string(),
        stars: z.number(),
        forks: z.number(),
      }).optional() // Used only if GitHub URL provided, filled in automatically by middleware
    })
  }),
};
