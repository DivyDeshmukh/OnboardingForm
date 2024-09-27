import { z } from 'zod';

export const onboardingFormSchema = z.object({
  brand_name: z.string().min(1, 'Brand name is required'),
  
  slug: z.string().optional(),  // Slug will be generated dynamically

  email: z.string().email('Invalid email address'),

  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be no more than 15 digits'),

  username: z.string().min(1, 'Username is required'),

  franchise_site: z.string().url('Invalid URL format for franchise site'),
  
  analytics_domain: z.string().url('Invalid URL format for analytics domain'),
  
  fb_page: z.string().url('Invalid URL format for Facebook page'),
  
  fran_connect_email: z.string().email('Invalid email address for franchise connection'),
  
  story_approval: z.boolean().optional(),  // Optional boolean
  
  alerts_email: z.string().email('Invalid email address for alerts'),
  
  newsletter_list_id: z.string().optional(),  // Optional newsletter ID
  
  type: z.enum(["Starter", "Visibility", "Increase", "Enterprise"], {
    errorMap: () => ({ message: 'Invalid type selected' })
  }),  // Adjust enum values based on actual types
  
  // Select component, brand_category must be one of these values
  brand_category: z.array(z.enum(["Automotive", "Beauty", "Construction", "Consultant", "Consumer Goods", "Consumer Services", "Education", "Facilities Services", "Finance"])),

  // Photo upload validation
  logo: z
  .any()
  .refine((file) => file instanceof File, { message: 'Logo must be a file' })
  .refine((file) => file && file.size <= 5 * 1024 * 1024, { message: 'Logo must be less than 5MB' })  // Ensure file exists and check size
  .refine((file) => file && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), {
    message: 'Logo must be a JPEG, PNG, or GIF'
  }), // Accepted file types
});
