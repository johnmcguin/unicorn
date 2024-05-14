import type { z } from "astro/zod";
import { schemas } from "./config";

export type JobView = z.infer<typeof schemas.jobs>;
export type ProjectView = z.infer<typeof schemas.projects>;
