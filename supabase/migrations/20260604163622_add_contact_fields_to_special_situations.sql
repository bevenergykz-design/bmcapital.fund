/*
  # Add contact fields to special_situations_applications

  ## Summary
  Adds applicant contact details to the special situations application form.
  These fields allow BM Capital Fund to reach out directly to applicants.

  ## New Columns (all on special_situations_applications)
  - `full_name` (text) - Applicant's full name
  - `phone` (text) - Applicant's phone number
  - `applicant_email` (text) - Applicant's email address

  ## Notes
  - All three fields are optional at the DB level (empty string default) to avoid
    breaking existing rows, but they are required by the application form UI.
  - No RLS changes needed — existing INSERT policy already covers new columns.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'special_situations_applications' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE special_situations_applications ADD COLUMN full_name text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'special_situations_applications' AND column_name = 'phone'
  ) THEN
    ALTER TABLE special_situations_applications ADD COLUMN phone text NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'special_situations_applications' AND column_name = 'applicant_email'
  ) THEN
    ALTER TABLE special_situations_applications ADD COLUMN applicant_email text NOT NULL DEFAULT '';
  END IF;
END $$;
