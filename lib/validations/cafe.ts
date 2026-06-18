import { z } from "zod";

export const cafeSchema = z.object({
  name: z.string().min(2, "نام کافه باید حداقل ۲ کاراکتر باشد"),
  slug: z
    .string()
    .min(3, "اسلاگ باید حداقل ۳ کاراکتر باشد")
    .regex(/^[a-z0-9-]+$/, "اسلاگ فقط حروف انگلیسی کوچک، عدد و خط تیره باشد"),
  description: z.string().max(500).optional(),
  phone: z.string().optional(),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  address: z.string().optional()
});

export type CafeInput = z.infer<typeof cafeSchema>;
