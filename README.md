# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Supabase setup

1. Open `.env.local` and set:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` (default: `admission-documents`)
	- `NEXT_PUBLIC_SUPABASE_APPLICATIONS_TABLE` (default: `applications`)
2. Create the storage bucket and applications table in your Supabase project.
