import { z } from "zod";

// Defining the Zod schema for form validation
export const onboardingFormSchema = z.object({
  brand: z.string().min(1, "Brand/Company name is required"), // Required field
  slug: z.string().min(1, "1851 URL is required"), // Required field
  email: z.string().email("Invalid email address"), // Email validation
  phone: z.string().min(10, "Phone number should be at least 10 characters long"), // Phone validation
  username: z.string().min(1, "Username is required"), // Required field
  franchise_site: z.string().optional().nullable(), // Optional field
  analytics_domain: z.string().optional().nullable(), // Optional field
  fb_page: z.string().optional().nullable(), // Optional field
  fran_email: z.string().optional().nullable(), // Optional field
  story_approval_email: z.string().optional().nullable(), // Optional field
  newsletter_list_id: z.string().optional().nullable(), // Optional field
  type: z.enum(["Starter", "Visibility", "Increase", "Enterprise"]).optional().nullable(), // Enum for select input
  brand_category: z.array(z.string()).optional(), // Multi-select input as an array of strings
  logo: z.any().optional(), // File input
});

// Infer type for TypeScript validation
export type OnboardingFormSchema = z.infer<typeof onboardingFormSchema>;
