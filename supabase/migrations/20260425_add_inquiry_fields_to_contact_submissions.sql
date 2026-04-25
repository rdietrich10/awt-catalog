-- Add sex, date_of_birth, and address fields to contact_submissions
-- Run this in the Supabase SQL editor or via the Supabase CLI

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS sex TEXT CHECK (sex IN ('Male', 'Female', 'Other')),
  ADD COLUMN IF NOT EXISTS date_of_birth TEXT,
  ADD COLUMN IF NOT EXISTS address1 TEXT,
  ADD COLUMN IF NOT EXISTS address2 TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS zip TEXT;
