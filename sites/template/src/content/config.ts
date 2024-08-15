import { schemas } from "@unicorn/common/src/content/config";
import { defineCollection } from "astro:content";

export const collections = {
  jobs: defineCollection({
    type: "content",
    schema: schemas.jobs,
  }),
  projects: defineCollection({
    type: "content",
    schema: schemas.projects,
  }),
};
