import { z } from "astro:content";

export const schemas = {
  jobs: z.object({
    title: z.string(),
    started: z.coerce.date(),
    company: z.string(),
    ended: z.coerce.date().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  }),
  projects: z.object({
    title: z.string(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    repo: z.string().optional(),
  }),
};
