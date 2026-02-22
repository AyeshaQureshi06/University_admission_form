import { z } from 'zod';

export const personalInfoSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  father_name: z.string().min(2, "Father's name is required"),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Format: XXXXX-XXXXXXX-X'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  religion: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(10, 'Complete address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().optional(),
  photo_url: z.string().optional(),
});

export const academicInfoSchema = z.object({
  qualification: z.string().min(1, 'Qualification is required'),
  board_institute: z.string().min(2, 'Board/Institute is required'),
  passing_year: z.coerce.number().min(1950).max(new Date().getFullYear()),
  total_marks: z.coerce.number().optional(),
  obtained_marks: z.coerce.number().min(0),
  percentage: z.coerce.number().min(0).max(100),
  result_status: z.enum(['Pass', 'Awaiting']),
  roll_number: z.string().min(1, 'Roll number is required'),
  extra_activities: z.string().optional(),
});

export const programSchema = z.object({
  faculty: z.string().min(1, 'Faculty is required'),
  program: z.string().min(1, 'Program is required'),
  study_mode: z.enum(['Morning', 'Evening']),
  admission_type: z.enum(['Regular', 'Self Finance']),
  selected_subjects: z.array(z.string()).min(1, 'Select at least one subject'),
  emergency_contact_name: z.string().min(2, 'Contact name is required'),
  emergency_contact_phone: z.string().min(10, 'Valid phone is required'),
});

export const documentsSchema = z.object({
  cnic_copy: z.string().min(1, 'Required'),
  matric_cert: z.string().min(1, 'Required'),
  inter_cert: z.string().min(1, 'Required'),
  domicile: z.string().min(1, 'Required'),
  photos: z.string().min(1, 'Required'),
  fee_receipt: z.string().min(1, 'Required'),
  character_cert: z.string().optional(),
});

export const declarationSchema = z.object({
  signature_name: z.string().min(2, 'Please type your full name as signature'),
  signature_date: z.string().min(1, 'Date is required'),
  declaration_agreed: z.boolean().refine(v => v === true, 'You must agree to the declaration'),
});

export const applicationSchema = z.object({
  ...personalInfoSchema.shape,
  ...academicInfoSchema.shape,
  ...programSchema.shape,
  ...documentsSchema.shape,
  ...declarationSchema.shape,
});

export type ApplicationData = z.infer<typeof applicationSchema>;
