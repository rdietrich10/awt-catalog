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
  referralCode: z
    .string()
    .trim()
    .max(50, "Referral code must be 50 characters or fewer")
    .optional()
    .or(z.literal("")),
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
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),
  sex: z.enum(["Male", "Female", "Other"], {
    message: "Please select a sex",
  }),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required")
    .refine(
      (v) => {
        const d = new Date(v);
        return !isNaN(d.getTime()) && d < new Date();
      },
      { message: "Date of birth must be a valid date in the past" },
    ),
  address1: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .max(200, "Address must be 200 characters or fewer"),
  address2: z
    .string()
    .trim()
    .max(200, "Address line 2 must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must be 100 characters or fewer"),
  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .max(2, "Use a 2-letter state abbreviation"),
  zip: z
    .string()
    .trim()
    .min(5, "ZIP code must be at least 5 digits")
    .max(10, "ZIP code must be 10 characters or fewer")
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code (e.g. 12345 or 12345-6789)"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone must be 20 characters or fewer"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  products: z
    .array(productItemSchema)
    .min(1, "At least one product is required")
    .max(50, "Maximum 50 products per inquiry"),
  referralCode: z
    .string()
    .trim()
    .max(50, "Referral code must be 50 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const insuranceVerificationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required")
    .refine(
      (v) => {
        const d = new Date(v);
        return !isNaN(d.getTime()) && d < new Date();
      },
      { message: "Date of birth must be a valid date in the past" },
    ),
  addressLine1: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .max(200, "Address must be 200 characters or fewer"),
  addressLine2: z
    .string()
    .trim()
    .max(200, "Address line 2 must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City must be 100 characters or fewer"),
  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .max(2, "Use a 2-letter state abbreviation"),
  zip: z
    .string()
    .trim()
    .min(5, "ZIP code must be at least 5 digits")
    .max(10, "ZIP code must be 10 characters or fewer")
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code (e.g. 33435 or 33435-1234)"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20, "Phone must be 20 characters or fewer"),
  sex: z.enum(["Male", "Female", "Other"], {
    message: "Please select a sex",
  }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  insuranceCompany: z
    .string()
    .trim()
    .min(1, "Insurance company name is required")
    .max(200, "Insurance company name must be 200 characters or fewer"),
  policyNumber: z
    .string()
    .trim()
    .min(1, "Policy number is required")
    .max(100, "Policy number must be 100 characters or fewer"),
  hipaaConsent: z.literal(true, {
    message: "You must acknowledge the privacy notice to continue",
  }),
});

export type InsuranceVerificationInput = z.infer<typeof insuranceVerificationSchema>;
