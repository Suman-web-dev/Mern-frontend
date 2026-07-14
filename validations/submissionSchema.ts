import { z } from "zod";

const presenterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  institution: z.string().min(2, "Institution name is required"),
  department: z.string().min(2, "Department name is required"),
  country: z.string().min(2, "Country is required"),
  orcid: z.string().optional(),
});

const coAuthorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  institution: z.string().min(2, "Institution name is required"),
  country: z.string().min(2, "Country is required"),
  orcid: z.string().optional(),
});

export const submissionSchema = z.object({
  // Abstract Information
  journal: z.string().min(1, "Journal selection is required"),
  presentationType: z.string().min(1, "Presentation type is required"),
  researchArea: z.string().min(1, "Research area is required"),
  keywords: z.string().min(1, "Keywords are required"),
  year: z.string().min(1, "Year is required"),
  duration: z.string().min(1, "Duration is required"),
  
  // Presenter Details
  presenter: presenterSchema,
  
  // Co Authors
  coAuthors: z.array(coAuthorSchema).optional(),
  
  // Abstract
  abstract: z.string().min(10, "Abstract must be at least 10 characters").max(5000, "Abstract must not exceed 5000 characters"),
  biography: z.string().min(10, "Biography must be at least 10 characters").max(2000, "Biography must not exceed 2000 characters"),
  
  // Declaration
  consentToPublish: z.boolean().refine((val) => val === true, "You must consent to publish"),
  consentToDataProcessing: z.boolean().refine((val) => val === true, "You must consent to data processing"),
  confirmAvailability: z.boolean().refine((val) => val === true, "You must confirm availability"),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
