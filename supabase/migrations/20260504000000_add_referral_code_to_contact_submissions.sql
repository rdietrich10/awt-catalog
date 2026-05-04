ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS referral_code TEXT;
