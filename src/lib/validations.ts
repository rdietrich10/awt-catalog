import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone must be 20 characters or fewer")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(100, "Subject must be 100 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message must be 5,000 characters or fewer"),
});

export type ContactInput = z.infer<typeof contactSchema>;

const variantItemSchema = z.object({
  strength: z.string().trim().max(200),
  vialSize: z.string().trim().max(200),
  concentration: z.string().trim().max(200),
  schedule: z.string().trim().max(500),
  price: z.number().nonnegative().optional(),
  membershipPrice: z.number().nonnegative().optional(),
  sku: z.string().trim().max(50).optional(),
});

const productItemSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200),
  category: z.string().trim().max(100).optional().default("Uncategorized"),
  sku: z.string().trim().max(50).optional(),
  genericName: z.string().trim().max(200).optional().default(""),
  medicationClass: z.string().trim().max(200).optional().default(""),
  administrationRoute: z.string().trim().max(200).optional().default(""),
  isBlend: z.boolean().optional().default(false),
  blendComponents: z.array(z.string().trim().max(200)).optional(),
  price: z.number().nonnegative().optional(),
  membershipPrice: z.number().nonnegative().optional(),
  variants: z.array(variantItemSchema).optional().default([]),
  keyBenefits: z.array(z.string().trim().max(500)).optional().default([]),
});

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone must be 20 characters or fewer")
    .optional()
    .or(z.literal("")),
  products: z
    .array(productItemSchema)
    .min(1, "At least one product is required")
    .max(50, "Maximum 50 products per inquiry"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
