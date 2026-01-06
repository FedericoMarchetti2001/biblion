import { z } from "zod";

export const BookFormatSchema = z.enum(["epub", "pdf", "mobi", "other"]);
export type BookFormat = z.infer<typeof BookFormatSchema>;

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string().optional(),
  language: z.string(),
  format: BookFormatSchema,
  coverUrl: z.string().optional(),
  progressPercent: z.number().optional()
});
export type Book = z.infer<typeof BookSchema>;

export const LookupModeSchema = z.enum(["quick", "detailed"]);
export type LookupMode = z.infer<typeof LookupModeSchema>;

export const LookupRequestSchema = z.object({
  motherTongue: z.string().min(2),
  targetLanguage: z.string().min(2),
  selectedText: z.string().min(1),
  context: z.object({
    sentence: z.string().min(1),
    paragraph: z.string().optional(),
    chapter: z.string().optional()
  }),
  bookMeta: z
    .object({
      title: z.string().optional(),
      author: z.string().optional(),
      language: z.string().optional()
    })
    .optional(),
  mode: LookupModeSchema
});
export type LookupRequest = z.infer<typeof LookupRequestSchema>;

export const LookupResponseSchema = z.object({
  translation: z.object({
    text: z.string(),
    alternatives: z.array(z.string()).optional()
  }),
  definition: z.object({
    text: z.string(),
    examples: z.array(z.string()).optional()
  }),
  etymology: z
    .object({
      text: z.string()
    })
    .optional(),
  synonyms: z.array(z.string()).optional(),
  grammar: z
    .object({
      partOfSpeech: z.string().optional(),
      genus: z.string().optional(),
      plural: z.string().optional(),
      conjugationHint: z.string().optional()
    })
    .optional(),
  providerMeta: z.object({
    provider: z.string(),
    latencyMs: z.number(),
    cached: z.boolean()
  })
});
export type LookupResponse = z.infer<typeof LookupResponseSchema>;

export const BooksListResponseSchema = z.object({
  items: z.array(BookSchema)
});
export type BooksListResponse = z.infer<typeof BooksListResponseSchema>;
