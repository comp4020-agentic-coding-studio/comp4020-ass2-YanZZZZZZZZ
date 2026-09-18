import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { courseNodeSchema } from "astro-course-university/schemas";

const weekSchema = z.coerce.number().int().min(1).max(12);
const courseNodeLoader = (dir: string) =>
  glob({ pattern: ["**/*.{md,mdx}", "!**/CLAUDE.md"], base: `src/content/${dir}` });
const teacherRefs = z.array(reference("people")).min(1);

// A standards-based grade band for one criterion: a named tier (this
// course's combat vocabulary standing in for HD/D/C/N) plus what that tier
// actually looks like for this specific criterion, not a generic scale.
const markingBand = z.object({
  tier: z.string().trim().min(1),
  descriptor: z.string().trim().min(1),
});

const weightedMarking = z
  .object({
    mode: z.literal("weighted"),
    criteria: z
      .array(
        z.object({
          name: z.string().trim().min(1),
          weight: z.number().positive(),
          bands: z.array(markingBand).min(2).optional(),
        }),
      )
      .min(1),
  })
  .superRefine((marking, ctx) => {
    const total = marking.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (total !== 100) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: `criterion weights sum to ${total}, not 100`,
      });
    }
  });

const holisticMarking = z.object({
  mode: z.literal("holistic"),
  description: z.string().trim().min(40),
  bands: z.array(markingBand).min(2).optional(),
});

export const collections = {
  sessions: defineCollection({
    loader: courseNodeLoader("sessions"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
      })
      .loose(),
  }),

  assessments: defineCollection({
    loader: courseNodeLoader("assessments"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        due: z.coerce.date(),
        weight: z.coerce.number().positive().max(100),
        marking: z.discriminatedUnion("mode", [weightedMarking, holisticMarking]).optional(),
        // The reflection sits beside the artifact, not inside it: a short,
        // specific prompt (Death Notes' ~200-word convention, not a generic
        // "what did you learn") naming one decision the artifact doesn't
        // explain on its own.
        reflection: z
          .object({
            prompt: z.string().trim().min(1),
            words: z.coerce.number().int().positive(),
          })
          .optional(),
      })
      .loose(),
  }),

  lectures: defineCollection({
    loader: courseNodeLoader("lectures"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
        slides: z
          .string()
          .regex(/^\/decks\/[a-z0-9-]+\/$/)
          .optional(),
      })
      .loose(),
  }),

  // This course's own addition to the fixed four above: an undated
  // collection of the subsystem-level arguments (the bonfire economy, combat
  // legibility, ...) a lecture links into, rather than a week-by-week
  // duplicate of the schedule.
  topics: defineCollection({
    loader: courseNodeLoader("topics"),
    schema: courseNodeSchema.loose(),
  }),

  people: defineCollection({
    loader: courseNodeLoader("people"),
    schema: ({ image }) =>
      z
        .object({
          title: z.string().trim().min(1),
          description: z.string().trim().min(40),
          role: z.string().trim().min(1),
          contact: z.string().trim().min(1).optional(),
          affiliation: z.string().trim().min(1).optional(),
          email: z.email().optional(),
          url: z.url().optional(),
          photo: image().optional(),
          photoAlt: z.string().trim().optional(),
          gamerAvatar: image().optional(),
          gamerAvatarAlt: z.string().trim().optional(),
          gamerAge: z.string().trim().min(1).optional(),
          gamesPlayed: z.array(z.string().trim().min(1)).min(1).optional(),
          published: z.coerce.boolean().default(true),
        })
        .superRefine((person, ctx) => {
          if (person.photo && !person.photoAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["photoAlt"],
              message: "describe the photo when one is supplied",
            });
          }
          if (person.gamerAvatar && !person.gamerAvatarAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["gamerAvatarAlt"],
              message: "describe the gamer avatar when one is supplied",
            });
          }
        }),
  }),
};
