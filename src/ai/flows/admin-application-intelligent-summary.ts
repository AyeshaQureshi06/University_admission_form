'use server';
/**
 * @fileOverview This file contains a Genkit flow for intelligently summarizing university applications.
 *
 * - adminApplicationIntelligentSummary - A function that generates a concise summary and highlights strengths of an applicant.
 * - AdminApplicationIntelligentSummaryInput - The input type for the adminApplicationIntelligentSummary function.
 * - AdminApplicationIntelligentSummaryOutput - The return type for the adminApplicationIntelligentSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminApplicationIntelligentSummaryInputSchema = z.object({
  first_name: z.string().describe('The first name of the applicant.'),
  last_name: z.string().describe('The last name of the applicant.'),
  qualification: z.string().describe('The highest previous qualification of the applicant.'),
  board_institute: z.string().describe('The board or institute from which the qualification was obtained.'),
  passing_year: z.number().describe('The year the qualification was passed.'),
  total_marks: z.number().optional().describe('The total marks for the qualification, if applicable.'),
  obtained_marks: z.number().describe('The marks obtained by the applicant in their qualification.'),
  percentage: z.number().optional().describe('The calculated percentage for the qualification.'),
  extra_activities: z.string().optional().describe('A description of the applicant\'s extra-curricular activities or achievements.'),
  faculty: z.string().describe('The faculty the applicant is applying to.'),
  program: z.string().describe('The program the applicant is applying for.'),
  photo_url: z
    .string()
    .optional()
    .describe(
      "An optional photo of the applicant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AdminApplicationIntelligentSummaryInput = z.infer<typeof AdminApplicationIntelligentSummaryInputSchema>;

const AdminApplicationIntelligentSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise professional summary of the applicant.'),
  key_strengths: z.array(z.string()).describe('A list of 3-5 bullet points highlighting the applicant\'s key strengths or exceptional qualities.'),
});
export type AdminApplicationIntelligentSummaryOutput = z.infer<typeof AdminApplicationIntelligentSummaryOutputSchema>;

export async function adminApplicationIntelligentSummary(input: AdminApplicationIntelligentSummaryInput): Promise<AdminApplicationIntelligentSummaryOutput> {
  return adminApplicationIntelligentSummaryFlow(input);
}

const adminApplicationIntelligentSummaryPrompt = ai.definePrompt({
  name: 'adminApplicationIntelligentSummaryPrompt',
  input: { schema: AdminApplicationIntelligentSummaryInputSchema },
  output: { schema: AdminApplicationIntelligentSummaryOutputSchema },
  prompt: `You are an expert university admissions officer responsible for reviewing applications.
Your task is to provide a concise summary of the applicant and identify their key strengths or exceptional qualities based on the provided information. Always focus on positive attributes and potential.

Applicant Name: {{{first_name}}} {{{last_name}}}
Applying for Program: {{{program}}} in {{{faculty}}}

Academic Background:
  Qualification: {{{qualification}}} from {{{board_institute}}}
  Passing Year: {{{passing_year}}}
  {{#if total_marks}}
  Marks: {{{obtained_marks}}} / {{{total_marks}}} (Percentage: {{{percentage}}}%)
  {{else}}
  Obtained Marks: {{{obtained_marks}}}
  {{/if}}

Extra-curricular Activities/Achievements:
  {{#if extra_activities}}
  {{{extra_activities}}}
  {{else}}
  No specific extra-curricular activities or achievements mentioned.
  {{/if}}

{{#if photo_url}}
Applicant Photo: {{media url=photo_url}}
{{/if}}

Based on the above, provide a brief, professional summary and identify key strengths in a bulleted list. The summary should be a single paragraph.
`,
});

const adminApplicationIntelligentSummaryFlow = ai.defineFlow(
  {
    name: 'adminApplicationIntelligentSummaryFlow',
    inputSchema: AdminApplicationIntelligentSummaryInputSchema,
    outputSchema: AdminApplicationIntelligentSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await adminApplicationIntelligentSummaryPrompt(input);
    return output!;
  }
);
