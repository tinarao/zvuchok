import { z } from "zod";

const validators = {
  name: z
    .string({ message: "Название не указано" })
    .min(2, "Слишком короткое название")
    .max(64, "Слишком длинное название"),
  description: z.optional(
    z
      .string()
      .max(640, "Слишком длинное описание")
      .min(2, "Слишком короткое описание"),
  ),
  tags: z.array(
    z.string().max(32, "Слишком длинный тег").min(2, "Слишком короткий тег"),
  ),
  genres: z.array(
    z.string().max(32, "Слишком длинный жанр").min(2, "Слишком короткий жанр"),
  ),
};

export const createSampleValidation = z.object({
  name: validators.name,
  description: validators.description,
  tags: validators.tags,
  genres: validators.genres,
});

export type CreateSampleDTO = z.infer<typeof createSampleValidation> & { file: File };