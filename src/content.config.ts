import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const base = { title: z.string(), description: z.string(), topic: z.string() };

export const collections = {
  proyectos: defineCollection({
    loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/projects" }),
    schema: z.object({ ...base, repo: z.string().url(), tags: z.array(z.string()).default([]) }),
  }),
  blog: defineCollection({
    loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/blog" }),
    schema: z.object({ ...base, date: z.coerce.date() }),
  }),
};
